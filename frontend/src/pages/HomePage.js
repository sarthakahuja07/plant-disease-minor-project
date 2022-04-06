import { Box, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import ImageForm from '../components/ImageForm'
import ImageListComponent from '../components/ImageListComponent'
import ResultComponent from '../components/ResultComponent'
import { useSelector } from 'react-redux'
import { Element } from 'react-scroll'

const HomePage = () => {
    const { isAuthenticated } = useSelector(state => state.authState)
    const { file } = useSelector(state => state.fileState)
    const [isResultGenerated, setIsResultGenerated] = useState(false);
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
                <ImageForm setIsResultGenerated={setIsResultGenerated} />
            </Box>

            {
                isAuthenticated && isResultGenerated && file &&
                (
                    <Box sx={{ mt: 4 }}>

                        <Container>
                            <ResultComponent />
                        </Container>
                    </Box>
                )
            }

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
