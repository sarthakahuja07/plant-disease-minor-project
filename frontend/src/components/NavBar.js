import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, CssBaseline, Button } from '@mui/material';
import ColorScroll from '../utils/ColorScroll';
import LoginHook from './Hooks/LoginHook';
import LogoutHook from './Hooks/LogoutHook';
import { useSelector, useDispatch } from 'react-redux';


const NavBar = (props) => {
    const { isAuthenticated, user, loading } = useSelector(state => state.authState)
    const dispatch = useDispatch()

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <React.Fragment>
                    <CssBaseline />
                    <ColorScroll {...props}>
                        <AppBar position="fixed" enableColorOnDark sx={{ backdropFilter: 'blur(5px)' }}>
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white.main' }}>
                                    Plant Disease Detector
                                </Typography>
                                {isAuthenticated ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={user.imageUrl}
                                            sx={{ mr: 2 }}
                                        />
                                        <LogoutHook />
                                    </Box>
                                ) : (
                                    <>
                                        <LoginHook />
                                    </>
                                )}
                            </Toolbar>
                        </AppBar>
                    </ColorScroll>
                </React.Fragment>
            </Box>
        </>
    )
}

export default NavBar
