import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SidebarLecturer from "../../Sections/SidebarLecturer";
import Header from "../../Sections/Header";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import {  CSSProperties } from "react";
import { ToastContainer,toast } from 'react-toastify';
import { authActions } from "../../store";
import { backendUrl } from "../../../config";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const LecturerDashBoard = () => {
  const shouldLog = useRef(true);
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const userType = useSelector((state) => state.userType);
  const [isApproved, setIsApproved] = useState();
  const [lecturer, setLecturer] = useState(null);
  const [loading, setLoading] = useState(true);
  const user  = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/logout`, null, { withCredentials: true });
      const data = response.data;
      if (response.status === 200) {
        toast.success(data.msg);
        dispatch(authActions.logout());
      } else {
        toast.error(data.response.data.error);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout.");
      dispatch(authActions.logout())

    }
  };

  useEffect(() => {
    fetchLecturer();
  }, [user]);

  const fetchLecturer = async () => {

    setLoading(true);
    try {

      if(user._id === undefined) return;
      const res = user && await axios.get(`${backendUrl}/api/lecturer/${user._id}`);
      const data = res && (await res.data);
      if (data) {
        setLecturer(data);
        setIsApproved(data.isApproved);
      }
    } catch (err) {
      console.log("error", err.message);
    }finally{
      setLoading(false);
    }
  };



  return (
    <main className="w-full h-screen flex justify-between items-start">
     {isApproved ?  <SidebarLecturer  /> : null}
     { 
     !loading ? 
    ( <section className="w-4/5 grow bg-white h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        <Header bgColor="fuchsia" />
       
      
        <div className="w-100 p-6 bg-fuchsia-100 rounded-xl shadow-lg flex flex-col items-center mt-20">
          <h1 className="text-3xl font-bold text-fuchsia-700 mb-4">
            Welcome to your Dashboard!
          </h1>
         
         {
          isApproved ? 
        ( <div className="mb-6 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-lg mb-4">
              Explore the available contests or start practicing to sharpen your skills.
            </p>
            <div className="flex justify-center items-center gap-4">
              <Link to="/qbank">
                <button className="bg-fuchsia-500 text-white px-6 py-2 rounded-md hover:bg-fuchsia-600 focus:outline-none">
                  Questions Bank
                </button>
              </Link>
              <Link to="/contest">
                <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none">
                  Contests
                </button>
              </Link>
            </div>
          </div>):
           (
            <div className="flex flex-col items-center">
            <div className="bg-yellow-200 text-yellow-800 p-4 mb-4 rounded-md">
              Your account is awaiting approval from the admin. Please wait until you are approved to access your dashboard.
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none"
            >
              Logout
            </button>
          </div>
          )
          }
        </div>
        
      
      </section>)
      :
      (
      
        <div className="w-full flex justify-center items-center h-screen">
              <ClipLoader
                color="red"
                loading={true}
                size={150}
                css={override}
              />
            </div>
      
      )
    }
     <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
    </main>
  );
};

export default LecturerDashBoard;
