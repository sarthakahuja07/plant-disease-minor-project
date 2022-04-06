import { Box, ListItem, Typography } from '@mui/material'
import React from 'react'
import { ResultPaper } from '../styles'

const ResultComponent = () => {
    return (
        <>
            <ResultPaper >
                <Typography variant='h4' fontWeight='bold' >Results and Remedies</Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant='h6' fontWeight='bold' sx={{ textDecoration: 'underline', mt: 2 }} >Leaf Type</Typography>
                    <Typography variant='body1' sx={{ mt: 1 }} >
                        The leaf is from a Tomato Plant
                    </Typography>
                    <Typography variant='h6' fontWeight='bold' sx={{ textDecoration: 'underline', mt: 2 }}>Leaf Diseases</Typography>
                    <Typography variant='body1' sx={{ mt: 1 }} >
                        The Plant has <Typography component='span' variant='h6' fontWeight='bold' textTransform='capitalize' >tomato mosaic virus </Typography>with a probability of <Typography variant='body2' component='span' >(92%)</Typography>
                    </Typography>
                    <Typography variant='h6' fontWeight='bold' sx={{ textDecoration: 'underline', mt: 2 }}>Symptoms & Specification</Typography>
                    <Typography variant='body1' sx={{ mt: 1 }}>
                        The foliage of affected tomato plants shows mottling, with alternating yellowish and darker green areas, the latter often appearing thicker and raised giving a blister-like appearance. The leaves tend to be fern-like in appearance with pointed tips and younger leaves may be twisted. The fruit may be distorted, yellow blotches and necrotic spots may occur on both ripe and green fruit and there may be internal browning of the fruit wall.
                        The virus may be introduced on infected seed. Only a small number of seedlings need to be infected for the virus to spread rapidly. It can also be spread on contaminated tools and the clothing and hands of workers during routine activities.
                    </Typography>
                    <Typography variant='h6' fontWeight='bold' sx={{ textDecoration: 'underline', mt: 2 }}>Disease Prevention & Cures</Typography>
                    <Typography variant='body1' sx={{ mt: 1 }} >
                        <ListItem sx={{ display: 'list-item' }}>
                            Remove all infected plants and destroy them. Do NOT put them in the compost pile, as the virus may persist in infected plant matter. Burn infected plants or throw them out with the garbage.
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                            Monitor the rest of your plants closely, especially those that were located near infected plants.
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                            Control your weeds. Some types may serve as hosts for the disease, and when aphids and other insects feed on these plants, they will spread the viruses to your garden plants.
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                            To avoid seed-borne mosaic viruses, soak seeds of susceptible plants in a 10% bleach solution before planting.
                        </ListItem>
                    </Typography>
                </Box>
            </ResultPaper>
        </>
    )
}

export default ResultComponent
