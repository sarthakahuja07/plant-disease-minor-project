import React from 'react'
import { uploadThunk } from '../redux/fileSlice'
import { animateScroll as scroll } from "react-scroll";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, ImageList, ImageListItem } from '@mui/material';
import { useDispatch } from 'react-redux'

const ImageListComponent = () => {

    const dispatch = useDispatch()

    const xs = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const md = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const lg = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const xl = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    const getColumns = () => {
        if (xl) {
            return 4
        }
        else if (lg) {
            return 4
        }
        else if (md) {
            return 3
        }
        return 2
    }

    const handleSelect = (e) => {
        dispatch(uploadThunk(e.target.currentSrc))
        scroll.scrollToTop()
    }

    const itemData = [
        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage2.JPG',
            title: 'sample 2',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage3.JPG',
            title: 'sample 3',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage4.JPG',
            title: 'sample 4',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage5.JPG',
            title: 'sample 5',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage6.JPG',
            title: 'sample 6',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage7.JPG',
            title: 'sample 7',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage8.JPG',
            title: 'sample 8',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage9.JPG',
            title: 'sample 9',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage10.JPG',
            title: 'sample 10',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage11.JPG',
            title: 'sample 11',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage12.JPG',
            title: 'sample 12',
        },

        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage13.JPG',
            title: 'sample 13',
        },
        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage14.JPG',
            title: 'sample 14',
        },
        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage15.JPG',
            title: 'sample 15',
        },
        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage16.JPG',
            title: 'sample 16',
        },
        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage17.JPG',
            title: 'sample 17',
        },
        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage18.JPG',
            title: 'sample 18',
        },
        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage19.JPG',
            title: 'sample 19',
        },
        {
            img: process.env.PUBLIC_URL + '/assets/sample/sampleImage20.JPG',
            title: 'sample 20',
        },

    ];

    return (
        <Box sx={{ width: '100%', my: 5 }}>
            <ImageList variant="masonry" cols={getColumns()} gap={4}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            onClick={(e) => handleSelect(e)}
                            src={`${item.img}`}
                            alt={item.title}
                            loading="lazy"
                            style={{ cursor: 'pointer' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )
}

export default ImageListComponent
