import React from 'react'
import {Route, Routes } from 'react-router-dom'
import SignIn from './signin/signin'
import SignUp from './signup/signup'
import Verify from './verify/verify'

const BeforeLogin = () => {
    return (
        <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/verify' element={<Verify/>} />
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
    )
}

export default BeforeLogin