import { Send } from "@mui/icons-material";
import { Box, Button, ButtonProps, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useForm } from 'react-hook-form'
import React, { useEffect, useLayoutEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { BRIQ_APP_HOST_IP } from "../../constant/briq-const";
import {Api, useAuthDetails} from '../../core/components/BRIQAuthorization/BRIQAuth'

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
}));

type Inputs = {
    briqTxnWith: string,
    briqTxnType: string,
    briqTxnAmount: string,
    briqDate: Date,
    briqReason: string
}

const AddExpense = () => {
    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const [userList, setUserList] = useState<[]>([]);
    const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
  

    //Fetch All Users 
    useLayoutEffect(()=>{
        if(open)
        Api.get('/briq/allUsers').then((res: { data: any }) => {
            setUserList(res.data);
        }).catch((err)=>{

        })
    },[open])

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleChangeDate = (newValue: Date | null) => {
        setDateValue(newValue);
    };

    const onSubmit = (data: any) => {
        Api.post('/briq/addTxn', data).then((res: { data: any }) => {
            setOpen(false)
        }).catch((err)=>{

        })
    }
    return (
        <>
            <ColorButton variant="contained" endIcon={<Send/>} onClick={handleClickOpen}>Add Expense</ColorButton>
            <Dialog sx={{borderRadius:10}} open={open} onClose={handleClose}>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { mt:2, width: 1 },
                }}
                noValidate
                autoComplete="off" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle>Add Expense</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can add your Expense here
                    </DialogContentText>
                    <TextField 
                        fullWidth
                        sx={{mt:2}}
                        type='text' 
                        placeholder='Amount' 
                        id="briqTxnAmount" 
                        label="Amount" 
                        required
                        variant="outlined"
                        {...register('briqTxnAmount')} 
                    />

                    <FormControl sx={{mt:2}} fullWidth>
                        <InputLabel htmlFor="briq-txnwith">Transaction With</InputLabel>
                        <Select
                            labelId="briq-txnwith"
                            id="briqTxnWith"
                            label="Transaction With"
                            {...register('briqTxnWith')}
                        >
                            {
                                userList.map((item:any)=>{
                                    return (
                                        <MenuItem value={item._id}>{item.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{mt:2}} fullWidth>
                        <InputLabel htmlFor="briq-txntype">Type</InputLabel>
                        <Select
                            labelId="briq-txntype"
                            id="briqTxnType"
                            label="Type"
                            {...register('briqTxnType')}
                        >
                            <MenuItem value="borrow">Borrow</MenuItem>
                            <MenuItem value="lend">Lend</MenuItem>
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={dateValue}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField fullWidth sx={{mt:2}} required {...register('briqDate')} {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField 
                        fullWidth
                        sx={{mt:2}}
                        type='text' 
                        required
                        placeholder='Reason' 
                        id="briqReason" 
                        label="Reason" 
                        variant="outlined"
                        {...register('briqReason')} 
                    />

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <ColorButton type="submit" variant="contained" endIcon={<Send/>} >Add</ColorButton>
                </DialogActions>
            </Box>
            </Dialog>
        </>
    )
}

export default AddExpense