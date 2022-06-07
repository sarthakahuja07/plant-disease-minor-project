

import werkzeug
from flask_restful import Resource, Api, reqparse
from PIL import Image as I
from flask import Flask, render_template, request
from regex import P
import torch
from flask_cors import CORS
import cv2
import numpy as np
import urllib.request

#from response_dto.prediction_response_dto import PredictionResponseDto
#from deep_learning_model.predictions.classify_image import ImageClassifier
from pydantic import BaseModel
#from typing import List


import os                       # for working with files

import torch                    # Pytorch module
# import matplotlib.pyplot as plt # for plotting informations on graph and images using tensors
import torch.nn as nn           # for creating  neural networks
from torch.utils.data import DataLoader  # for dataloaders
# from PIL import Image           # for checking images
import torch.nn.functional as F  # for functions for calculating loss
# for transforming images into tensors
import torchvision.transforms as transforms
from torchvision.utils import make_grid       # for data checking
# for working with classes and images
from torchvision.datasets import ImageFolder


class PredictionResponseDto(BaseModel):
    filename: str
    contentype: str
    likely_class: str


data_dir = "New Plant Diseases Dataset(Augmented)"
train_dir = data_dir + "/train"
valid_dir = data_dir + "/valid"
diseases = os.listdir(train_dir)
plants = []
NumberOfDiseases = 0
for plant in diseases:
    if plant.split('___')[0] not in plants:
        plants.append(plant.split('___')[0])
    if plant.split('___')[1] != 'healthy':
        NumberOfDiseases += 1
# datasets for validation and training
train = ImageFolder(train_dir, transform=transforms.ToTensor())
valid = ImageFolder(valid_dir, transform=transforms.ToTensor())


batch_size = 32

# for moving data into GPU (if available)


def get_default_device():
    """Pick GPU if available, else CPU"""
    if torch.cuda.is_available:
        return torch.device("cuda")
    else:
        return torch.device("cpu")

# for moving data to device (CPU or GPU)


def to_device(data, device):
    """Move tensor(s) to chosen device"""
    if isinstance(data, (list, tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)

# for loading in the device (GPU if available else CPU)


class DeviceDataLoader():
    """Wrap a dataloader to move data to a device"""

    def __init__(self, dl, device):
        self.dl = dl
        self.device = device

    def __iter__(self):
        """Yield a batch of data after moving it to device"""
        for b in self.dl:
            yield to_device(b, self.device)

    def __len__(self):
        """Number of batches"""
        return len(self.dl)


device = get_default_device()
device
train_dl = DataLoader(train, batch_size, shuffle=True,
                      num_workers=2, pin_memory=True)
valid_dl = DataLoader(valid, batch_size, num_workers=2, pin_memory=True)


train_dl = DeviceDataLoader(train_dl, device)
valid_dl = DeviceDataLoader(valid_dl, device)


class SimpleResidualBlock(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=3,
                               kernel_size=3, stride=1, padding=1)
        self.relu1 = nn.ReLU()
        self.conv2 = nn.Conv2d(in_channels=3, out_channels=3,
                               kernel_size=3, stride=1, padding=1)
        self.relu2 = nn.ReLU()

    def forward(self, x):
        out = self.conv1(x)
        out = self.relu1(out)
        out = self.conv2(out)
        # ReLU can be applied before or after adding the input
        return self.relu2(out) + x


def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))


# base class for the model
class ImageClassificationBase(nn.Module):

    def training_step(self, batch):
        images, labels = batch
        out = self(images)                  # Generate predictions
        loss = F.cross_entropy(out, labels)  # Calculate loss
        return loss

    def validation_step(self, batch):
        images, labels = batch
        out = self(images)                   # Generate prediction
        loss = F.cross_entropy(out, labels)  # Calculate loss
        acc = accuracy(out, labels)          # Calculate accuracy
        return {"val_loss": loss.detach(), "val_accuracy": acc}

    def validation_epoch_end(self, outputs):
        batch_losses = [x["val_loss"] for x in outputs]
        batch_accuracy = [x["val_accuracy"] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()       # Combine loss
        epoch_accuracy = torch.stack(batch_accuracy).mean()
        # Combine accuracies
        return {"val_loss": epoch_loss, "val_accuracy": epoch_accuracy}

    def epoch_end(self, epoch, result):
        print("Epoch [{}], last_lr: {:.5f}, train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
            epoch, result['lrs'][-1], result['train_loss'], result['val_loss'], result['val_accuracy']))


def ConvBlock(in_channels, out_channels, pool=False):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
              nn.BatchNorm2d(out_channels),
              nn.ReLU(inplace=True)]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)


random_seed = 7
torch.manual_seed(random_seed)
# resnet architecture


class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_diseases):
        super().__init__()

        self.conv1 = ConvBlock(in_channels, 64)
        self.conv2 = ConvBlock(64, 128, pool=True)  # out_dim : 128 x 64 x 64
        self.res1 = nn.Sequential(ConvBlock(128, 128), ConvBlock(128, 128))

        self.conv3 = ConvBlock(128, 256, pool=True)  # out_dim : 256 x 16 x 16
        self.conv4 = ConvBlock(256, 512, pool=True)  # out_dim : 512 x 4 x 44
        self.res2 = nn.Sequential(ConvBlock(512, 512), ConvBlock(512, 512))

        self.classifier = nn.Sequential(nn.MaxPool2d(4),
                                        nn.Flatten(),
                                        nn.Linear(512, num_diseases))

    def forward(self, xb):  # xb is the loaded batch
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out


model = to_device(ResNet9(3, len(train.classes)), 'cpu')
model


def predict_image(img, model):
    """Converts image to array and return the predicted class
        with highest probability"""
    # Convert to a batch of 1
    xb = to_device(img.unsqueeze(0), 'cpu')
    # Get predictions from model
    yb = model(xb)
    # Pick index with highest probability
    _, preds = torch.max(yb, dim=1)
    # Retrieve the class label

    return train.classes[preds[0].item()]


p = 4
model.load_state_dict(torch.load(
    "plant-disease-model (1).pth", map_location=torch.device('cpu')))
print(p)

convert_tensor = transforms.ToTensor()
img = I.open("1c10ab31-02b9-4008-b66f-9b44d8a9d323___FREC_Scab 3084_270deg.JPG")
p = predict_image(convert_tensor(img), model)
print(p)
app = Flask(__name__)
CORS(app)

# routes
import os
from flask import render_template, request, redirect, url_for

@app.route("/")
def helloWorld():
  return "Hello, cross-origin-world!"

@app.route("/about")
def about_page():
    return "About You..!!!"


@app.route("/submit", methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':

        jsonData = request.get_json()
        # print(jsonData['files'])
        a = jsonData['files']
        arr = a.split('"')
        print(arr[1])
        urllib.request.urlretrieve(arr[1], "inputImage.jpg")



        img = cv2.imread('inputImage.jpg')
        _, img_encoded = cv2.imencode('.jpg', img)
        img_string = img_encoded.tostring()
        
        nparr = np.fromstring(img_string, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        p = predict_image(convert_tensor(img), model)
        
        print(p)
        
# how to send a response

        return p


if __name__ == '__main__':
    #app.debug = True
    app.run(debug=True)
