import { styled, alpha } from '@mui/material/styles';


export const Img = styled('img')(({ theme }) => ({
    width: '100%',

}));
export const CoverImage = styled('img')(({ theme }) => ({
    width: '100%',
    objectFit: 'cover',
}));