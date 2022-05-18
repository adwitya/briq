import React, {useState, useEffect, Fragment} from 'react'
import { Route, Routes } from 'react-router-dom'
import BRIQNotFound from '../core/components/BRIQNotFound/BRIQNotFound'
import {Api, useAuthDetails} from './../core/components/BRIQAuthorization/BRIQAuth'
import Logout from './auth/signout/signout'
import Dashboard from './dashboard/dashboard'

const Home = () => {
    return (
        <div className="container">
            <Routes>
                <Route path='/' element={<Dashboard/>}></Route>
                <Route path='/signout' element={<Logout/>}></Route>
                <Route path='*' element={<BRIQNotFound/>}></Route>
            </Routes>
        </div>
    )
}

export default Home