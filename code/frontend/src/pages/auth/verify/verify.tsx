import React, {useState, useEffect, Fragment} from 'react'
import { Navigate, useParams } from 'react-router-dom';
import {Api, useAuthDetails} from '../../../core/components/BRIQAuthorization/BRIQAuth'
import { parseJwt } from '../../../utils/util-method';

const Verify = () => {
    const {setAuthDetails} = useAuthDetails()!
    const {token} = useParams();
    const userToken = parseJwt(token);
    Api.defaults.headers.common['Authorization'] = userToken.token;
    window.localStorage.setItem('user', JSON.stringify(userToken))
    setAuthDetails(userToken);
    return <Navigate to='/' />
  }
  
  export default Verify