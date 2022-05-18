import React, {useState, useEffect, Fragment} from 'react'
import { Navigate } from 'react-router-dom';
import {Api, useAuthDetails} from '../../../core/components/BRIQAuthorization/BRIQAuth'

const Logout = () => {
    const {setAuthDetails} = useAuthDetails()!
    const defaultUserDetails = {
      name: "",
      email: "",
      token: "",
      profile_image: "",
      authenticated: false
    };
  
    Api.post('/auth/logout');
  
    const data = window.localStorage.getItem('user')
    if(data !== null) {
      const user = JSON.parse(data)
      if(typeof(user.token) != 'undefined') {
        setAuthDetails(defaultUserDetails);
        window.localStorage.removeItem('user');
        return <Navigate to='/signin' />
      }
    }
    
    return <Navigate to='/signin' />
  }
  
  export default Logout