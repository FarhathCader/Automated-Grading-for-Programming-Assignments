import "./App.css";
//import Contact from "./Components/Contact";
import Home from "./Pages/Home";
//import Footer from "./Components/Footer";
//import Front from "./Components/Front";
import Login from "./Components/Login";

import { Routes, Route } from "react-router-dom";
//import FrontSignup from "./Components/FrontSignup";
import MainSignup from "./Pages/Auth/MainSignup";
import ContactUs from "./Pages/ContactUs";
//import Sample from "./Pages/Sample";
//import Nav from "./Components/Nav";
import Register from "./Components/Register";

import Reset from "./Pages/Auth/Reset";
import Forgot from "./Pages/Auth/Forgot";
import LecturerDashBoard from "./Pages/Lecturer/LecturerDashBoard";
import StudentDashboard from "./Pages/Student/StudentDashboard";
import AdminDashBoard from "./Pages/Admin/AdminDashBoard";
import AvailableContest from "./Pages/Student/AvailableContest";
import CompletedContest from "./Pages/Student/CompletedContest";

import StudentProfile from "./Pages/Student/StudentProfile";
import Practice from "./Pages/Student/Practice";
//import SidebarLecturer from "./Sections/SidebarLecturer";
import LecturerProfile from "./Pages/Lecturer/LecturerProfile";
import QuestionBank from "./Pages/Lecturer/QuestionBank";
//import Sidebar from "./Sections/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import RequireAuth from "./Components/RequireAuth";
import { useEffect, useState } from "react";
import { authActions } from "./store";
import EditStudentProfile from "./Pages/Student/EditStudentProfile";
import ManageLecturers from "./Pages/Admin/ManageLecturers";
import Mycomponent from "./Components/Mycomponent";
import axios from "axios";
import useFetchUser from "./hooks/fetchUser";
axios.defaults.withCredentials = true;
import Contest from "./Pages/Lecturer/Contest";
import EditLectureProfile from "./Pages/Lecturer/EditLecturerProfile";
import ManageStudents from "./Pages/Admin/ManageStudents";
import AdminProfile from "./Pages/Admin/AdminProfile";

import AddContest from "./Pages/Lecturer/AddContest";
import ContestDetails from "./Pages/Lecturer/ContestDetails";
import AddProblem from "./Pages/Lecturer/AddProblem";
import CodingEditor from "./Components/CodingEditor";
import CodeEditor from "./Components/CodeEditor";



function App() {
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);



  // useEffect(() => {
  //   // Dispatch action to update auth state when component mounts
  //   // const storedAuth = localStorage.getItem('isLoggedin');
  //   // const storedUserType = localStorage.getItem('userType');
  //   // const storedUser = localStorage.getItem('user');

  //   const fetchUser = async () => {
  //     console.log("fetching user  ")
  //     try{
  //       const res =  await axios.get('http://localhost:4000/api/user/user',null,{withCredentials: true});
  //       const data =  await res.data;
  //       console.log("user is ",data.user)
  //       if(data.user){
  //         console.log("logging in")
  //         dispatch(authActions.login({ userType: `${data.user.usertype}`, user: data.user}));
  //       }
  //       }
  //       catch(err){
  //         // console.log("error is",err.response.data.error)
  //         console.log("logged out")
  //         dispatch(authActions.logout());
  //       }
  
  //   }

  //   fetchUser();
 
    
  // }, [dispatch]);

  useFetchUser();

  return (
    <Routes>
        <Route element={<RequireAuth allowedRoles={['student']} redirectTo="/" />}>
        <Route path="/dashboard_std" element={<StudentDashboard />} />
        <Route path="/available" element={<AvailableContest />} />
        <Route path="/completed" element={<CompletedContest />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/profile_std" element={<StudentProfile />} />
        <Route path="/profile_std/edit" element={<EditStudentProfile />} />


      </Route>

      <Route element={<RequireAuth allowedRoles={['lecturer']} redirectTo="/" />}>
        <Route path="/dashboard_lec" element={<LecturerDashBoard />} />
        <Route path="/qbank" element={<QuestionBank />} />
        <Route path="/profile_lec" element={<LecturerProfile />} />
        <Route path="/contest" element={<Contest/>}/>
        <Route path="/addcontest" element={<AddContest/>}/>
        <Route path="/editcontest/:id" element={<AddContest />} />
        <Route path="/contest/:id" element={<ContestDetails/>} />
        <Route path="/problem" element={<QuestionBank/>}/>
        <Route path="/addproblem" element={<AddProblem/>}/>
        <Route path="/editproblem/:id" element={<AddProblem />} />

      </Route>

      <Route element={<RequireAuth allowedRoles={['admin']} redirectTo="/" />}>
      <Route path="/admin" element={<AdminDashBoard />} />
      <Route path="/managelecturer" element={<ManageLecturers />} />
      <Route path="/managestudent" element={<ManageStudents />} />
      <Route path="/adminprofile" element={<AdminProfile />} />
      

      </Route>

      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<MainSignup />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/forgotpassword" element={<Forgot />} />

        <Route path="/user" element={<Mycomponent />} />

        </Route>
        

   
        
      </Routes>



  );
}

export default App;
