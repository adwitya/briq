import React, {useState, useEffect, Fragment} from 'react'
import { Route, Routes } from 'react-router-dom'
import BRIQNotFound from '../core/components/BRIQNotFound/BRIQNotFound'
import {Api, useAuthDetails} from './../core/components/BRIQAuthorization/BRIQAuth'
import Logout from './auth/signout/signout'
import Dashboard from './dashboard/dashboard'
import Invite from './invite/invite'
import Groups from './groups/groups'
import Settings from './settings/settings'

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems } from './leftmenu/leftmenu';
import AddExpense from './addexpense/addexpense'
import Settle from './settle/settle'

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);


const Home = () => {

    const [open, setOpen] = useState(false);
    const dark = 'dark';
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const darkTheme = createTheme({
        palette: {
          mode: dark,
        },
    });

    return (
    
    <Fragment>
        <ThemeProvider theme={darkTheme}> 
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />   
                <AppBar position="absolute" open={open}>
                    <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                    >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                        marginRight: '18px',
                        ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{flexGrow: 1, flexDirection:'row', flexWrap:'wrap', textAlign:'left'}}>
                        <Grid
                            container
                            justifyContent='left'
                        >
                            <Typography variant="h6" sx={{display:'flex', alignSelf:'center'}} component="a" href="/">
                                <img width={55} height={55} src={require('../assets/icons/logo.png')} />
                            </Typography>
                            <Box
                                textAlign="left"
                                display={{xs:"none",md:"block"}}
                                sx={{padding:"6px 0px 0 10px"}}
                            >
                                <Typography variant="body1" component="a" href="/" 
                                sx={{
                                    fontFamily: 'Helvetica',
                                    textDecoration: 'none',
                                    color: 'green',
                                    fontSize: '1.3em',
                                    lineHeight: '1.2em'
                                }}
                                gutterBottom>
                                    <span style={{color:"#0794E3"}}>LEND</span> <br/>
                                    <span style={{color:"#5FE3C4", borderTop:"1px solid #5FE3C4"}}>BORROW</span>
                                </Typography>
                            </Box>
                        </Grid>
                    </Box>
                    <Box>
                        <AddExpense/>
                        <Settle/>
                    </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                    >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <MainListItems/>
                    </List>
                </Drawer>

                <Box
                    component="main"
                    sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    }}
                >
                    <Routes>
                        <Route path='/' element={<Dashboard/>}></Route>
                        <Route path='/groups' element={<Groups/>}></Route>
                        <Route path='/settings' element={<Settings/>}></Route>
                        <Route path='/invite' element={<Invite/>}></Route>
                        <Route path='/signout' element={<Logout/>}></Route>
                        <Route path='*' element={<BRIQNotFound/>}></Route>
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    </Fragment>
    )
}

export default Home