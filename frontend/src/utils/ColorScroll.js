import React from 'react'
import useScrollTrigger from '@mui/material/useScrollTrigger';

function ColorScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 536 ,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 5 : 0,
        color: trigger ? 'primary' : 'transparent',
    });
}


export default ColorScroll
