// import React from 'react'
// import { Outlet, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';


// export default function RequireAuth() {


//     let auth = useSelector(state => state.isLoggedin);
//     console.log(auth)

//   return (
 
//       auth ? <Outlet/> : <Navigate to= '/login'/>
    
//   )
// }

// RequireAuth.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ allowedRoles, redirectTo }) => {
  const isAuthenticated = useSelector(state => state.isLoggedin);
  const userType = useSelector(state => state.userType);
  console.log(isAuthenticated, userType);
  console.log(allowedRoles,redirectTo);



  // Check if user is authenticated and has the allowed role
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    // Redirect to a different page if user role is not allowed
    return <Navigate to= {`${redirectTo}`} />;
  }

  // Render the outlet (child routes)
  return <Outlet />;
};

export default RequireAuth;
