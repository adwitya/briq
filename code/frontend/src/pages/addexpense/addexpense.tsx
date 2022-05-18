import { Send } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
}));

const AddExpense = () => {
    return (
        <>
            <ColorButton variant="contained" endIcon={<Send/>}>Add Expense</ColorButton>
        </>
    )
}

export default AddExpense