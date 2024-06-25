import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { app } from "../firebase";
import { FaGoogle } from "react-icons/fa";

export default function Oauth(props) {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultFromGoogle = await signInWithPopup(getAuth(app), provider);
      console.log(resultFromGoogle.user);
      navigate("/googleauth", {
        state: {
          username: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          usertype: props.usertype,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleClick}
        className="flex items-center justify-center w-80 bg-red-600 text-white font-semibold rounded-full py-2 px-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <FaGoogle className="mr-2" /> Sign in with Google
      </button>
    </div>
  );
}
