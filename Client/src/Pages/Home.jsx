import React, { useEffect } from 'react'
import Navbar from "../Components/Navbar";
import Front from "../Components/Front";
import Footer from "../Components/Footer";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const {state} = useLocation();

  useEffect(()=>{
    if(state){
      if(state.cause === 'session expired'){
        toast.error('Session Expired')
        state.cause = ''
      }
    }
  },[state])

  return (
    <div>
      <Navbar/>
      <Front/>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

export default Home
