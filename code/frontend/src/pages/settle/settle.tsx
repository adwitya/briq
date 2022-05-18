import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styled } from '@mui/material/styles';
import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import { purple, orange } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
}));
const Settle = () => {
    return (
        <>
            <ColorButton sx={{ml:1}} variant="contained" endIcon={<HandshakeTwoToneIcon/>}>Settle Up</ColorButton>
        </>
    )
}

export default Settle