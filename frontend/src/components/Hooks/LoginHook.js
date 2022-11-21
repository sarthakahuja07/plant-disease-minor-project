import { Button } from '@mui/material';
import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../utils/refreshToken';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/authSlice';

function LoginHook() {
    const dispatch = useDispatch()

    const clientID = '1036339638912-719v4ustu8pa2ks393e15nja6i8rhba7.apps.googleusercontent.com'

    const onSuccess = (res) => {
        dispatch(loginThunk({ success: true, ...res.profileObj }));
        refreshTokenSetup(res);
    };
    const onFailure = (res) => {
        dispatch(loginThunk({ success: false, ...res }));
    };
    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId: clientID,
        isSignedIn: true,
        accessType: 'offline',
    });
    // My custom button
    return (
        <Button onClick={signIn} variant="contained" color="secondary">
            <img src={`${process.env.PUBLIC_URL}/assets/googleLogo.svg`}></img>
            &nbsp;Login
        </Button>
    );
}
export default LoginHook;
