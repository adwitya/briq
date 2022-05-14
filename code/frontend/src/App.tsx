import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuthDetails} from './core/components/BRIQAuthorization/BRIQAuth'
import SignIn from './pages/auth/signin/signin'
import DashBoard from './pages/dashboard/dashboard'
import './App.css'

export const App = () => {
  const FrontPage = () => {
    return (
      <SignIn/>
    )
    // const {authDetails} = useAuthDetails();
    // if(authDetails.authenticated) {
    //   return (
    //     <DashBoard/>
    //   )
    // } else {
    //   return (
    //     <SignIn/>
    //   )
    // }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<FrontPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
