import React, {useState, useEffect, Fragment} from 'react'
import {Api, useAuthDetails} from '../../core/components/BRIQAuthorization/BRIQAuth'
import Box from '@mui/material/Box';
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
import { BRIQChart } from '../../core/components/BRIQChart/BRIQChart';
import { Fab, FormControl, InputLabel, Select } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';
import RecentTxn from './recenttxn/recenttxn';
import Borrow from './borrow/borrow';
import Lend from './lend/lend';


const Dashboard = () => {
    return (
        <Fragment>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={2}>
                    {/* Balance */}
                    <Grid item xs={12} md={8}>
                        <Paper
                            sx={{
                            p: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            background:'transparent',
                            border:'none',
                            boxShadow: 'none'
                            }}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={4}>
                                    <Paper
                                        sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent:'center',
                                        justifyItems: 'center',
                                        height: 240,
                                        }}
                                    >
                                        <Typography variant='h6' component="div">
                                            Total Balance
                                        </Typography>

                                        <Typography variant='h3' component="div">
                                            $ 190.00
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper
                                        sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent:'center',
                                        justifyItems: 'center',
                                        height: 240,
                                        }}
                                    >
                                        <Typography variant='h6' component="div">
                                            Borrowed
                                        </Typography>

                                        <Typography variant='h3' component="div">
                                            $ 190.00
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper
                                        sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent:'center',
                                        justifyItems: 'center',
                                        height: 240,
                                        }}
                                    >
                                        <Typography variant='h6' component="div">
                                            Lend
                                        </Typography>

                                        <Typography variant='h3' component="div">
                                            $ 190.00
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    {/* Chart */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                            }}
                        >
                            <BRIQChart/>
                        </Paper>
                    </Grid>
                    {/* Owe and Owed */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12}
                                    sx={{
                                        p:2,
                                        background:'#333333',
                                        borderRadius:1
                                    }}
                                >
                                    <Grid container>
                                        <Grid item xs={12} md={6} justifyContent="space-between">
                                            <Typography>BORROWED</Typography>
                                            <Fab size='small' color='primary'>
                                                <FilterAlt/>
                                            </Fab>
                                        </Grid>
                                        <Divider orientation="vertical" flexItem sx={{marginRight:"-1px"}} />
                                        <Grid item xs={12} md={6} justifyContent="space-between">
                                            <Typography>LEND</Typography>
                                            <Fab size='small' color='primary'>
                                                <FilterAlt/>
                                            </Fab>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                        <Borrow borrowList={[{}]}/>
                                </Grid>
                                <Divider orientation="vertical" flexItem sx={{marginRight:"-1px"}} />
                                <Grid item xs={12} md={6}>
                                        <Lend lendList={[{}]}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    {/* Recent Transactions */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
                            <RecentTxn recentList={[{}]}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default Dashboard