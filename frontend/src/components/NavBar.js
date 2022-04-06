import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, CssBaseline, Button } from '@mui/material';
import ColorScroll from '../utils/ColorScroll';

const NavBar = (props) => {
    const isAuth = true

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
                                {isAuth ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://source.unsplash.com/random"
                                            sx={{ mr: 2 }}
                                        />
                                        <Button variant="contained" color="secondary">
                                            Logout
                                        </Button>
                                    </Box>
                                ) : (
                                    <Button variant="contained" color="secondary">
                                        Login
                                    </Button>
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
