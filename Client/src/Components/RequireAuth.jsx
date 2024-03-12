import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function RequireAuth() {


    let auth = useSelector(state => state.isLoggedin);
    console.log(auth)

  return (
 
      auth ? <Outlet/> : <Navigate to= '/login'/>
    
  )
}
