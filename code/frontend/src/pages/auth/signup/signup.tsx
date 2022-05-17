import React, {useState, useEffect, Fragment} from 'react'
import '../auth.css'
import { styled, withStyles } from '@mui/material/styles';
import { Box, Grid, Paper, Typography, Stack, Avatar, Divider, Button, TextField,
        FormControl, Input, InputLabel, InputAdornment, IconButton , OutlinedInput} from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BRIQ_APP_HOST_IP } from "../../../constant/briq-const";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: '#333333',
    backgroundColor: '#5FE3C4',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#0794E3',
    },
}));

const SignUp = () => {

    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Fragment>
            <Box className='auth_wrapper'>
                <Paper
                    sx={{
                        p: 2,
                        margin: '0 10vw',
                        maxWidth: '25vw',
                        minWidth: 400,
                        boxShadow: 1,
                        borderRadius: 3,
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                    <Grid container>
                        <Grid 
                            container 
                            justifyContent="center"
                        >
                            <Typography variant="h6" component="a" href="/">
                                <Img width={70} src={require('../../../assets/icons/logo.png')} />
                            </Typography>
                            <Typography variant="body1" component="a" href="/" 
                            sx={{
                                fontFamily: 'Helvetica',
                                textDecoration: 'none',
                                textAlign: 'left',
                                padding: '10px 10px 0',
                                color: 'green',
                                fontSize: '1.5em',
                                lineHeight: '1.2em',
                            }}
                            gutterBottom>
                                <span style={{color:"#0794E3"}}>LEND</span> <br/>
                                <span style={{color:"#5FE3C4", borderTop:"1px solid #5FE3C4"}}>BORROW</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{mt:5}}>
                            <Typography 
                                variant="h2" 
                                sx={{
                                    color: 'rgb(63, 81, 181)',
                                    fontSize: '1.5em',
                                    fontWeight: 'bold',
                                    fontFamily: "Roboto, sans-serif"
                                }}
                                gutterBottom>
                                Hi, Welcome Back
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{m:2}}>
                            <Typography 
                                variant="body1" 
                                sx={{
                                    color: '#aaa',
                                    fontFamily: "Roboto, sans-serif"
                                }}
                                gutterBottom>
                                Enter your credentials to continue
                            </Typography>
                            <Button 
                                sx={{width:1}} 
                                variant="outlined" 
                                onClick={()=>{window.location.href=BRIQ_APP_HOST_IP+"/auth/google"}}
                                startIcon={<Avatar src={require('../../../assets/images/google-logo.png')} />}>
                                    Sign in with Google
                            </Button>
                        </Grid>
                        
                        <Grid item xs={12} sx={{m:2}}>
                            <Divider>
                                <Button variant='outlined' disabled>
                                    OR
                                </Button>
                            </Divider>
                        </Grid>
                    </Grid>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { mt:2, width: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography 
                            variant="body1" 
                            sx={{
                                color: '#333',
                                fontFamily: "Roboto, sans-serif",
                                fontWeight:"bold"
                            }}
                            gutterBottom>
                            Sign in with Email Address 
                        </Typography>
                        <TextField type='email' placeholder='youremail@address.com' id="outlined-basic" label="Email" variant="outlined" />

                        <FormControl variant="outlined">
                            <InputLabel htmlFor="briq-password">Password</InputLabel>
                            <OutlinedInput
                                id="briq-password" 
                                name="briq-password" 
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                        
                        <ColorButton variant="contained">Sign In</ColorButton>
                    </Box>
                    <Grid item xs={12} sx={{mt:2, mb:2}}>
                        <Divider sx={{mb:2}}></Divider>
                        <Typography variant="body1" component="a" href="/" 
                        sx={{
                            textDecoration: 'none',
                        }}
                        gutterBottom>
                            Don't have an account?
                        </Typography>
                    </Grid>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default SignUp