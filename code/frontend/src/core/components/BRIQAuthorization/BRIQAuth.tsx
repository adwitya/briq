import React, { useEffect } from 'react';
import { Navigate, useNavigate} from 'react-router-dom';
import { BRIQ_APP_HOST_IP } from "../../../constant/briq-const";
import axios from 'axios'

const Api = axios.create({
    baseURL: BRIQ_APP_HOST_IP + "/api"
})
const data = window.localStorage.getItem('user')
if(data !== null) {
    const user = JSON.parse(data)
    if(typeof(user.token) != 'undefined') {
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
    }
}

const defaultUserDetails = {
  name: "",
  email: "",
  token: "",
  role: "",
  permissions: {},
  authenticated: false
};

type AuthContextType = {
  authDetails: any;
  setAuthDetails: (value: any) => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};


const isLoggedIn = () => {
  const userDetails = localStorage.getItem('user') as string;
  const user = JSON.parse(userDetails);
  const location = window.location.pathname.includes('signin') ||
    window.location.pathname == "/"
    ;
  return user?.authenticated || location;
}


const isLoginPageAccess = () => {
  const userDetails = localStorage.getItem('user') as string;
  const user = JSON.parse(userDetails);
  const location = window.location.pathname == '/signin';
  return (user && user.authenticated && location)
}

export const AuthProvider = ({ children }: Props) => {
  const [authDetails, setAuthDetails] = React.useState(defaultUserDetails);
  const [loading, setLoading] = React.useState(true);
  const [redirect, setRedirect] = React.useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
        navigate('/login');
    }
  }, []);


  useEffect(() => {
    const data = window.localStorage.getItem('user')
    if (data !== null) {

      const user = JSON.parse(data)
      if (typeof (user.token) != 'undefined') {
        Api.get('/authorize')
          .then((res: { data: any }) => {
            const user = {
              name: res.data.name,
              email: res.data.email,
              token: res.data.token,
              role: res.data.role,
              permissions: res.data.permissions,
              authenticated: true
            }
            setAuthDetails(user)
            setLoading(false);
          })
          .catch((error: any) => {
            window.localStorage.removeItem('user')
            const user = {
              name: "",
              email: "",
              token: "",
              role: "",
              permissions: {},
              authenticated: false
            }
            setAuthDetails(user)
            setLoading(false)
            window.location.href = '/signin'
            // setRedirect(true)
          })
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (redirect) return <Navigate to='/signin' />

  if (!isLoggedIn()) {
    const redirectURL = window.location.pathname + window.location.search;
    localStorage.setItem('redirectURL', redirectURL.toString());
    return <Navigate to='/signin' />
  } else if (isLoginPageAccess()) {
    return <Navigate to='/' />
  }
  else if (loading) return null;
  else {
    return (
      <AuthContext.Provider value={{ authDetails, setAuthDetails }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export const useAuthDetails = () => React.useContext(AuthContext);