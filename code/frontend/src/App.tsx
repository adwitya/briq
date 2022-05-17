import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuthDetails} from './core/components/BRIQAuthorization/BRIQAuth'
import DashBoard from './pages/dashboard/dashboard'
import BeforeLogin from './pages/auth/auth'
import './App.css'

export const App = () => {
  const FrontPage = () => { 
    const {authDetails} = useAuthDetails();
    if(authDetails.authenticated) {
      return (
        <DashBoard/>
      )
    } else {
      return (
        <BeforeLogin/>
      )
    }
  }

  return (
    <div className="App">
      HIKKKKKSA
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<FrontPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
