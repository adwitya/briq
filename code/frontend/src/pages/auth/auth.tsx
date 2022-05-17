import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './signin/signin'
import SignUp from './signup/signup'

const BeforeLogin = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn/>} />
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default BeforeLogin