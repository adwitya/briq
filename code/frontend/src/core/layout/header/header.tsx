import React, {useState, useEffect, Fragment} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './header.css'
import Stack from '@mui/material/Stack';
import {Api} from '../../components/BRIQAuthorization/BRIQAuth';

const Header = () => {
    useEffect(() => {
        Api.get('auth/google');
    },[])

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar color='transparent' position="static">
                    <Toolbar>
                        <Typography 
                            variant="h6" component="a" href="/">
                            <img width={200} src={require('../../../assets/icons/logo_bright.png')} />
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        
                        </Typography>

                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" color="inherit">Sign In</Button>
                            <Button variant="contained" color="secondary">Sign Up</Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <button id="rzp-button1" className="btn btn-outline-dark btn-lg"><i className="fas fa-money-bill"></i> Own Checkout</button>

            </Box>
        </>
    )
}

export default Header