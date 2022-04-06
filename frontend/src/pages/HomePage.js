import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import ImageForm from '../components/ImageForm'
import ImageListComponent from '../components/ImageListComponent'

const HomePage = () => {

    return (
        <>
            <Box sx={{
                height: '600px', backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/coverImage.jpg'})`, backgroundSize: 'cover',
                backgroundPosition: 'center', display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                },
            }}>
                <ImageForm />
            </Box>

            <Box sx={{ mt: 4 }}>
                <Container>
                    <Typography variant='h4' fontWeight='bold'>Sample Images</Typography>
                    <ImageListComponent />
                </Container>
            </Box>


        </>
    )
}

export default HomePage
