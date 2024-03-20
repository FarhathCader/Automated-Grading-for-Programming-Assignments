import React, { useState } from "react";
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";
import Logo from "../../assets/Images/client.jpg";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer,toast } from 'react-toastify';


import axios from "axios";
import useFetchUser from "../../hooks/fetchUser";


const EditStudentProfile = (props) => {

  const [username,setUsername] = useState(props.student.username);
  const [email,setEmail] = useState(props.student.email);
  const [registrationNumber,setRegistrationNumber] = useState(props.student.regNo);

  const save = async () => {

    try{
      const res  = await axios.put(`http://localhost:4000/api/student/${props.student._id}`,{
        username,
        email,
        regNo : registrationNumber
      });
  
      const data = await res.data;
  
      if(res.status === 200){
  
        setTimeout(() => {
          props.cancel();
          }
          , 1000);
          toast.success('Profile Updated Successfully');
          window.location.reload();
         

      }


    }
    catch(err){
      const error = await err.response.data.error;
      toast.error(error);
    }



  }

  


  const student = props.student;
  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl mt-20 min-w-0 break-words bg-blue-900 w-full mb-6 shadow-lg rounded-xl">
      <div className="px-6">
        <div className="flex-grow flex flex-col items-center justify-start">
          <div className="w-full flex justify-center mt-4">
            <div className="relative rounded-full overflow-hidden">
              <img
                src={Logo}
                className="shadow-xl rounded-full align-middle border-none object-cover w-32 h-32"
                alt="Student Edit Profile"
              />
            </div>
          </div>
          <div className="w-full text-center mt-20">
            <div className="flex justify-center lg:pt-4  pb-0">
              <div className="w-full text-center mt-2">
                <div className="flex justify-center lg:pt-4 pb-0">
                  <div className="w-full lg:w-2/3">
                    {" "}
                    {/* Increased width to 2/3 */}
                    <div className="bg-slate-100 p-8 rounded-lg mb-20 shadow-blue-700">
                      <h2 className="text-2xl font-bold text-blue-800 mb-6">
                        Your Profile
                      </h2>
                      <div className="flex items-center mb-4">
                        <label
                          className="block text-blue-700 text-sm font-bold mr-2 ml-10"
                          htmlFor="name"
                        >
                          Name:
                        </label>
                        <input
                          type="text"
                          className="border-b border-blue-500 rounded text-blue-800 text-lg focus:outline-none px-2 py-1"
                          value={username}
                          onChange={(e)=>setUsername(e.target.value)}
                          
                        />
                      </div>
                      <div className="flex items-center mb-4">
                        <label
                          className="block text-blue-700 text-sm font-bold mr-2 ml-10"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          type="email"
                          className="border-b border-blue-500 rounded text-blue-800 text-lg focus:outline-none px-2 py-1"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center mb-4">
                        <label
                          className="block text-blue-700 text-sm font-bold mr-2 ml-6"
                          htmlFor="registrationNumber"
                        >
                          REG No:
                        </label>
                        <input
                          type="text"
                          className="border-b border-blue-500 rounded text-blue-800 text-lg focus:outline-none px-2 py-1"
                          value={registrationNumber}
                          onChange={(e)=>setRegistrationNumber(e.target.value)}
                        />
                      </div>

                      <div className="flex justify-center text-center">
                        <button
                          onClick={props.cancel}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 mr-5"
                        >
                          Cancel
                        </button>
                        <button 
                        onClick={save}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer 
      position="top-right"
      autoClose={500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"/>
    </div>
  );
};

export default EditStudentProfile;
