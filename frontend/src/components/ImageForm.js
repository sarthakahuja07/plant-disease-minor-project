import React, { useState } from 'react'
import { Box, Typography, Button, CardMedia } from '@mui/material'
import { uploadStart, uploadThunk } from '../redux/fileSlice'
import { useSelector, useDispatch } from 'react-redux'
import LoadingComponent from '../components/Skeletons/LoadinComponent'
import { CoverImage } from '../styles'
import { scroller ,animateScroll as scroll } from 'react-scroll'

const ImageForm = ({ setIsResultGenerated }) => {
    const dispatch = useDispatch()
    const { file, loading } = useSelector(state => state.fileState)

    const handleUploadClick = (event) => {

        dispatch(uploadStart())

        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            dispatch(uploadThunk(reader.result))
        }
    };

    const generateResult = () => {
        scroll.scrollTo(560);
        setIsResultGenerated(true)
    }


    return (
        <>
            <Box sx={{
                width: ['80%', '600px'],
                height: '400px',
                padding: [0, 2], background: 'linear-gradient(125.56deg, rgba(255, 255, 255, 0.35) 16.45%, rgba(255, 255, 255, 0.1) 70.19%)', borderRadius: 3, backdropFilter: 'blur(10px)', boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)',
                backgroundImage: 'linear-gradient(125.56deg, rgba(24, 26, 27, 0.45) 16.45%, rgba(24, 26, 27, 0.3) 70.19%)',
                border: '1px solid rgba(255, 255, 255, 0.125)'
            }}>

                <Box sx={{
                    '& .MuiTextField-root': { m: 1 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%'
                }}>

                    {
                        !file && !loading &&
                        (

                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography sx={{ width: ['100%', '50%'] }} textTransform='uppercase' variant="h3" textAlign='center' color="common.white" mb={2}>Upload Leaf Image</Typography>
                            </Box>
                        )
                    }

                    {
                        !file && !loading && (
                            <Button
                                variant="contained"
                                component="label"
                                color='secondary'
                                sx={{ width: '50%', minWidth: '150px', height: '60px', fontWeight: 'bold', alignSelf: 'center', textAlign: 'center' }}
                            >
                                Choose Image
                                <input
                                    accept="image/*"
                                    id="imageInput"
                                    type="file"
                                    onChange={handleUploadClick}
                                    hidden
                                />
                            </Button>
                        )
                    }

                    {
                        loading ?
                            (
                                <LoadingComponent />
                            )
                            : file ?
                                (
                                    <CardMedia sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        width: ['90%', '400px'],
                                        maxHeight: '270px',
                                    }} >
                                        <CoverImage
                                            width="100%"
                                            src={file}
                                        />
                                    </CardMedia>
                                )
                                : null
                    }

                    {file &&
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                component="label"
                                color='secondary'
                                sx={{ width: ['40%', '200px'], mx: 'auto', height: '60px', textAlign: 'center' }}
                            >
                                Choose Image
                                <input
                                    accept="image/*"
                                    id="imageInput"
                                    type="file"
                                    onChange={handleUploadClick}
                                    hidden
                                />
                            </Button>

                            <Typography variant='body1' sx={{ color: 'white.main' }}>
                                <strong>OR</strong>
                            </Typography>

                            <Button type="submit" variant="contained" color="primary" onClick={generateResult} sx={{ textAlign: 'center', width: ['40%', '200px'], mx: 'auto', py: 2, height: '60px' }}>
                                See Results
                            </Button>

                        </Box>

                    }
                </Box>
            </Box>
        </>
    )
}

export default ImageForm
