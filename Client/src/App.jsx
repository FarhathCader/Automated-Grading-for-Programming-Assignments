import "./App.css";
import Contact from "./Components/Contact";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Front from "./Components/Front";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Signup from "./Components/Signup";
import {BrowserRouter ,Routes, Route} from "react-router-dom";
import FrontSignup from "./Components/FrontSignup";
import MainSignup from "./Pages/MainSignup";
import ContactUs from "./Pages/ContactUs";
import Sample from "./Pages/Sample";
import Nav from "./Components/Nav";
import AddSample from "./Pages/AddSample";

function App() {
  return (
    
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<AddSample/>} />
        <Route path="/signup" element={<MainSignup />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
    
   
  );
}

export default App;
