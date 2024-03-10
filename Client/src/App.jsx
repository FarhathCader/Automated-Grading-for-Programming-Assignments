import "./App.css";
import Contact from "./Components/Contact";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Front from "./Components/Front";
import Login from "./Components/Login";

import {BrowserRouter ,Routes, Route} from "react-router-dom";
import FrontSignup from "./Components/FrontSignup";
import MainSignup from "./Pages/MainSignup";
import ContactUs from "./Pages/ContactUs";
import Sample from "./Pages/Sample";
import Nav from "./Components/Nav";
import Register from "./Components/Register";
import Signup from "./Components/Signup";

import Res from "./Pages/Res";
import For from "./Pages/For";

import Reset from "./Pages/Reset";
import Forgot from "./Pages/Forgot";
import LecturerDashBoard from "./Pages/LecturerDashBoard";
import StudentDashboard from "./Pages/StudentDashboard";
import AdminDashBoard from "./Pages/AdminDashBoard";
import AvailableContest from "./Pages/AvailableContest";
import CompletedContest from "./Pages/CompletedContest";

//import AddSample from "./Pages/AddSample";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<MainSignup />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/student" element={<Register />} />
        <Route path="/lecturer" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/reset/:token" element={<Reset/>} />
        <Route path="/forgot" element={<For/>} />
        <Route path="/dashboard_lec" element={<LecturerDashBoard/>} />
        <Route path="/admin" element={<AdminDashBoard/>} />

        


        <Route path="/forgotpassword" element={<Forgot />} />

      </Routes>
    </BrowserRouter>
    
   
  );
}

export default App;
