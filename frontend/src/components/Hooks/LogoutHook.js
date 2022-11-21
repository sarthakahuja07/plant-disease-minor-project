import { Button } from '@mui/material';
import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../../redux/authSlice';

function LogoutHook() {
    const dispatch = useDispatch()
    const clientID = '1036339638912-719v4ustu8pa2ks393e15nja6i8rhba7.apps.googleusercontent.com'

    const onLogoutSuccess = (res) => {
        dispatch(logoutThunk());
    };
    const onFailure = () => {
        console.log('logout failed');
    };
    const { signOut } = useGoogleLogout({
        clientId: clientID,
        onLogoutSuccess,
        onFailure
    });

    // My custom button
    return (
        <Button onClick={signOut} variant="contained" color="secondary">
            <img src={`${process.env.PUBLIC_URL}/assets/googleLogo.svg`}></img>
            &nbsp;Logout
        </Button>
    );
}
export default LogoutHook;
