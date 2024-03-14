
import SidebarLecturer from "../../Sections/SidebarLecturer";
import Header from "../../Sections/Header";

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true
import { ToastContainer,toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

export default function LecturerDashBoard() {

  const shouldLog = useRef(true);
  const navigate = useNavigate();
  const isLoggedin = useSelector(state => state.isLoggedin);
  const userType = useSelector(state => state.userType);
  console.log(isLoggedin, userType)

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

    if(userType === 'lecturer'){
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
  }else{
    if(userType === 'student')navigate('/dashboard_std')
    else navigate('/admin')
  }
  
  },[])

  return (
    <main className="w-full h-screen flex justify-between items-start">
      <SidebarLecturer />
      <section className="w-4/5 grow bg-white h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        <Header />
        <div className="w-100 p-6 bg-blue-100 rounded-xl shadow-lg flex flex-col items-center mt-20">
          <h1 className="text-3xl font-bold text-violet-700 mb-4">
            Welcome to your Dashboard!{" "}
          </h1>
          <div className="mb-6 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-lg mb-4">
              Explore the available contests or start practicing to sharpen your
              skills.
            </p>
            <div className="flex justify-center items-center gap-4">
              <Link to = '/qbank'>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                Questions Bank
              </button>
              </Link>
           
              <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none">
                Contests
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};


