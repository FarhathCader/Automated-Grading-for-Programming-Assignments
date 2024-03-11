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
 

  // const sednRequest = async () => {
  //   const res = await axios
  //     .get("http://localhost:4000/api/user/user", {
  //       withCredentials: true,
  //     })
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };

  useEffect(()=>{
    if (shouldLog.current) {
      shouldLog.current = false;
      const fetchData = async () => {
        const res = await axios.get('http://localhost:4000/api/user/user',{withCredentials:true})
        .catch(err=> {toast.error(err.response.data.error)
          setTimeout(() => {
            navigate('/login')
          }, 1000);
      
      })
        const data = res && await res.data;
        if(data)setUser(data.user);
        // setUser(data.user);
      }
      fetchData();
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
