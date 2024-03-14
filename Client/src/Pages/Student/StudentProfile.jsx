import React, { useEffect, useRef } from "react";
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";
import Logo from '../../assets/Images/client.jpg'
import EditStudentProfile from "../Student/EditStudentProfile";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer,toast } from 'react-toastify';
axios.defaults.withCredentials = true;

const StudentProfile = () => {
 

  const shouldLog = useRef(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [user, setUser] = useState(null); 
  const [student, setStudent] = useState(null); 
  const [editProfile, setEditProfile] = useState(false);


  const load = () => {
    useEffect(() => {
      if (shouldLog.current) {
        shouldLog.current = false;
        const fetchData = async () => {
          const res = await axios
            .get("http://localhost:4000/api/user/user", { withCredentials: true })
            .catch((err) => {
              toast.error(err.response.data.error);
              setTimeout(() => {
                navigate("/login");
              }, 1000);
            });
          const data = res && (await res.data);
          if (data) setUser(data.user);
  
          // setUser(data.user);
        };
        fetchData();
  
  
  
        setTimeout(() => setLoading(false), 1000);
      }
    }, [editProfile]);
  
    useEffect(() => {
      const fetchStudent = async () => {
        const res = user && await axios.get(`http://localhost:4000/api/student/${user._id}`);
        const data = res && (await res.data);
        if (data) setStudent(data);
        setTimeout(() => setLoading(false), 1000);
  
      };
      fetchStudent();
    }, [user,editProfile]);
  }

 load()


  const handleProfile = () => {
    setEditProfile(true);
    load();
  };

  const cancel = () => {
    setEditProfile(false);
    // load();
  };

  

  return (
    <main className="w-full bg-blue-200 h-screen flex justify-between items-start">
      <Sidebar />
      <div className="w-4/5 grow flex flex-col">
        <Header />
        {editProfile ? (
          <EditStudentProfile cancel = {cancel} student = {student} load = {load} />
        ) : (
          <div className="relative max-w-md mx-auto md:max-w-2xl mt-40 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <div className="px-6">
              <div className="flex grow flex-wrap justify-center">
                <div className="w-full flex justify-center">
                  <div className="relative">
                    <img
                      src={Logo}
                      className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                      alt="Student Profile"
                    />
                  </div>
                </div>
                <div className="w-full text-center mt-20">
                  <div className="flex justify-center lg:pt-4  pb-0">
                    <div className="w-full text-center mt-2">
                      <div className="flex justify-center lg:pt-4 pb-0">
                        <div className="w-full lg:w-1/2">
                          <div className="bg-slate-100 p-8 rounded-lg mb-20 shadow-gray-700">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                              Your Profile
                            </h2>
                            <div className="flex items-center mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mr-2"
                                htmlFor="name"
                              >
                                Name:
                              </label>
                             {student && <p className="text-gray-800 text-lg">
                                {student.username}
                              </p> } 
                            </div>
                            <div className="flex items-center mb-6">
                              <label
                                className="block text-gray-700 text-sm font-bold mr-2"
                                htmlFor="email"
                              >
                                Email:
                              </label>
                             {student &&  <p className="text-gray-800 text-lg">
                                {student.email}
                              </p>}
                            </div>
                            <div className="flex items-center mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mr-2"
                                htmlFor="regNumber"
                              >
                                Registration Number:
                              </label>
                             {student &&  <p className="text-gray-800 text-lg">
                                {student.regNo}
                              </p>}
                            </div>
                            <div className="text-center">
                              <button
                                onClick={handleProfile}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Edit Profile
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
          </div>
        )}
      </div>
      <ToastContainer />

    </main>
  );
};

export default StudentProfile;
