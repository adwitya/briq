import React, { useEffect } from 'react';
import { Navigate, useNavigate, useLocation} from 'react-router-dom';
import { BRIQ_APP_HOST_IP } from "../../../constant/briq-const";
import axios from 'axios'

export const Api = axios.create({
    baseURL: BRIQ_APP_HOST_IP + "/"
})
const data_axios = window.localStorage.getItem('user')
if(data_axios !== null) {
    const user = JSON.parse(data_axios)
    if(typeof(user.token) != 'undefined') {
        Api.defaults.headers.common['Authorization'] = user.token;
    }
}

const defaultUserDetails = {
  name: "",
  email: "",
  token: "",
  profile_image: "",
  authenticated: false
};

type AuthContextType = {
  authDetails: any;
  setAuthDetails: (value: any) => void;
};

const AuthContext = React.createContext<AuthContextType | any>(
  undefined
);

type Props = {
  children: React.ReactNode;
};


const isLoggedIn = () => {
  const userDetails = localStorage.getItem('user') as string;
  const user = JSON.parse(userDetails);
  const location = window.location.pathname.includes('signin') || 
    window.location.pathname.includes('signup') ||
    window.location.pathname.includes('verify') ||
    window.location.pathname == "/"
    ;
  return user?.authenticated || location;
}


const isLoginPageAccess = () => {
  const userDetails = localStorage.getItem('user') as string;
  const user = JSON.parse(userDetails);
  const location = window.location.pathname == '/signin' || window.location.pathname.includes('signup') || window.location.pathname.includes('verify');
  return (user && user.authenticated && location)
}

export const AuthProvider = ({ children }: Props) => {
  const [authDetails, setAuthDetails] = React.useState(defaultUserDetails);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
      if (!isLoggedIn()) {
        navigate('/login');
      }
  }, [location]);
  
  useEffect(() => {
    const data = window.localStorage.getItem('user')
    if (!isLoggedIn()) {
        navigate('/signin');
    }
    if (data !== null) {
      const user = JSON.parse(data)
      if (typeof (user.token) != 'undefined') {
        Api.get('/briq/authorize')
          .then((res: { data: any }) => {
            const user = {
              name: res.data.name,
              email: res.data.email,
              token: res.data.token,
              profile_image: res.data.profile_image,
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
              profile_image: "",
              authenticated: false
            }
            setAuthDetails(user)
            setLoading(false)
            window.location.href = '/signin'
          })
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (!isLoggedIn()) {
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