import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import notify from './utils/notify';

const PrivateRouter = () => {

  const currentUser = sessionStorage.getItem('username') || false; 
  if(!currentUser){
    notify('You need to login first', 'warn')
    return (<Navigate to="/" replace/>)
  }else{
    return(<Outlet/>)
  }
}

export default PrivateRouter