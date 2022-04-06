import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import authReducer from './authSlice';
import fileReducer from './fileSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";


const combinedReducer = combineReducers({
    authState: authReducer,
    fileState: fileReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return combinedReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authState']
}


const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: process.env.NODE_ENV === 'development' ? [thunk, logger] : [thunk],
})


export let persistor = persistStore(store);
