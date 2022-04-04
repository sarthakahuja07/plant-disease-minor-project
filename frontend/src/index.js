import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from './redux/configureStore';
import { Provider } from 'react-redux';
import LoadingComponent from './components/Skeletons/LoadinComponent';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import ScrollToTop from './utils/ScrollToTop';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={LoadingComponent} persistor={persistor}>
            <BrowserRouter>
                <ScrollToTop />
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
