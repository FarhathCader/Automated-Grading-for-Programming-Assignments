import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function LecturerDashBoard() {

  const shouldLog = useRef(true);
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const sendRequest = async()=>{
    const res = await axios.get('http://localhost:4000/api/user/user', {withCredentials: true})
    return res.data
  }
  
  useEffect(()=>{
    if(shouldLog.current){
      shouldLog.current = false;
    sendRequest().then(data=>{
      setUser(data.user)
    }).catch(err=>{
      toast.error(err.response.data.error)
      setTimeout(() => {
        navigate('/')
      }
      ,1000)

    })
  }
  
  },[])



  return (
    <div>
      Lecturer Dashboard

      {user && <h1>Welcome {user.username}</h1>}
      <ToastContainer/>
    </div>
  )
}
