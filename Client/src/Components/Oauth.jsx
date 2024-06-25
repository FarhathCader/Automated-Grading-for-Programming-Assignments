import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';

export default function Oauth(props) {

    const navigate = useNavigate();

    const handleGoogleClick = async ()=>{
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      try{

        const resultFromGoogle = await signInWithPopup(getAuth(app), provider)
        console.log(resultFromGoogle.user);
        navigate('/googleauth',{state : {username : resultFromGoogle.user.displayName , email : resultFromGoogle.user.email, usertype: props.usertype}})

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
