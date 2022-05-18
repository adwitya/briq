import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Api, useAuthDetails} from './core/components/BRIQAuthorization/BRIQAuth'
import DashBoard from './pages/dashboard/dashboard'
import BeforeLogin from './pages/auth/auth'
import './App.css'
import Home from './pages/home'

export const App = () => {
  const FrontPage = () => { 
    const {authDetails} = useAuthDetails();
    if(authDetails.authenticated) {
      return (
        <Home/>
      )
    } else {
      return (
        <BeforeLogin/>
      )
    }
  }

  return (
    <div className="App">
        <Routes>
          <Route path='/*' element={<FrontPage/>} />
        </Routes>
    </div>
  );
}
