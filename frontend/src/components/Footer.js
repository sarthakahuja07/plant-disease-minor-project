import { Box, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', width: '100%', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Box>
                <Typography color='white.main' variant='body1' sx={{ display: 'flex', justifyContent: 'center' }}>
                    View Project On
                    <Link sx={{ ml: 1 }} color='white.main' href='https://github.com/sarthakahuja07/plant-disease-minor-project' target='_blank'>
                        <GitHubIcon fontSize='medium' />
                    </Link>
                </Typography>
                <Typography color='white.main' variant='body1'>
                    Made with
                    <Typography color='white.main' component='span' variant='h6'>
                        ❤️
                    </Typography>by&nbsp;
                    <Link color='white.main' href='https://github.com/sarthakahuja07' target='_blank'>
                        Sarthak
                    </Link> &&nbsp;
                    <Link color='white.main' href='https://github.com/sarthakahuja07' target='_blank'>
                        Shivansh
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default Footer
