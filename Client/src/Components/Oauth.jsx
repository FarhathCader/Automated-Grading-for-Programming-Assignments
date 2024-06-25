import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { backendUrl } from '../../config';

export default function Oauth(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isLogin} = props;

    const handleGoogleClick = async ()=>{
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      try{

        const resultFromGoogle = await signInWithPopup(getAuth(app), provider)
        console.log(resultFromGoogle.user);
        if(isLogin){
          const response = await axios.post(`${backendUrl}/api/user/googlelogin`, {email : resultFromGoogle.user.email},
            {withCredentials: true, credentials: 'include'}
          )
          const data = response.data;
          dispatch(authActions.login({ userType: `${data.msg}`,user : data.user}));
          if(data.msg === 'student'){
            setTimeout(() => {
              navigate('/dashboard_std');
            }, 1000);
          }else if(data.msg === 'lecturer'){
            setTimeout(() => {
              navigate('/dashboard_lec');
            }, 1000);
          }else{
            setTimeout(() => {
              navigate('/admin');
            }, 1000);
          }
        }
        else{
        navigate('/googleauth',{state : {username : resultFromGoogle.user.displayName , email : resultFromGoogle.user.email, usertype: props.usertype}})
        }
      }catch(err){
        console.log(err)
      }
    }


  return (
    <div>

        <button onClick={handleGoogleClick}>
            Sign in with Google
        </button>
      
    </div>
  )
}
