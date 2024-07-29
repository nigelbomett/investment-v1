import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  let isAuthenticated = false;

  try {
    if(token){
        const decoded:any = jwtDecode(token);
        isAuthenticated = decoded && decoded.exp > Date.now() / 1000;
    }
  } catch (error) {
    isAuthenticated = false;
  }
  return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>;
}

export default PrivateRoute