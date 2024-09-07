
import { Navigate, Outlet } from 'react-router-dom';

export default function privateroutes() {
    const token=localStorage.getItem('token');
    let verifyUser=false;
    if(token){
        verifyUser=true;
    }
  return (
    verifyUser?<Outlet/> : <Navigate to={'/'}/>
  )
}

