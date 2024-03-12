import "./App.css";
import Contact from "./Components/Contact";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Front from "./Components/Front";
import Login from "./Components/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontSignup from "./Components/FrontSignup";
import MainSignup from "./Pages/MainSignup";
import ContactUs from "./Pages/ContactUs";
import Sample from "./Pages/Sample";
import Nav from "./Components/Nav";
import Register from "./Components/Register";



import Reset from "./Pages/Reset";
import Forgot from "./Pages/Forgot";
import LecturerDashBoard from "./Pages/LecturerDashBoard";
import StudentDashboard from "./Pages/StudentDashboard";
import AdminDashBoard from "./Pages/AdminDashBoard";
import AvailableContest from "./Pages/AvailableContest";
import CompletedContest from "./Pages/CompletedContest";

import StudentProfile from "./Pages/StudentProfile";
import Practice from "./Pages/Practice";
import SidebarLecturer from "./Sections/SidebarLecturer";
import LecturerProfile from "./Pages/LecturerProfile";
import QuestionBank from "./Pages/QuestionBank";
import Sidebar from "./Sections/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import RequireAuth from "./Components/RequireAuth";
import { useEffect } from "react";
import { authActions } from "./store";





function App() {

  const isLoggedin = useSelector(state => state.isLoggedin)
  const dispatch = useDispatch();
  // console.log(isLoggedin)

  // useEffect(() => {
  //   // Dispatch action to update auth state when component mounts
  //   const storedAuth = localStorage.getItem('isLoggedin');
  //   if (storedAuth !== null) {
  //     dispatch(authActions[storedAuth === 'true' ? 'login' : 'logout']());
  //   }
  // }, [dispatch]);

  useEffect(() => {
    // Dispatch action to update auth state when component mounts
    const storedAuth = localStorage.getItem('isLoggedin');
    const storedUserType = localStorage.getItem('userType');
    if (storedAuth !== null) {
      if (storedUserType !== null) {
        dispatch(authActions.login({ userType: storedUserType }));
      } else {
        dispatch(authActions[storedAuth === 'true' ? 'login' : 'logout']());
      }
    }
  }, [dispatch]);
  // console.log(isLoggedin)
  return (
      <Routes>
        <Route element = {<RequireAuth/>}>      
        <Route path="/dashboard_lec" element={<LecturerDashBoard />}  />
        <Route path="/admin" element={<AdminDashBoard />}  />
        <Route path="/dashboard_std" element={<StudentDashboard/>} />
        <Route path="/available" element={<AvailableContest/>} />
        <Route path="/completed" element={<CompletedContest/>} />
        <Route path="/practice" element={<Practice/>} />  
        </Route>
        
        <Route>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<MainSignup />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/forgotpassword" element={<Forgot />} />

        </Route>

   
        
      </Routes>
  );
}

export default App;
