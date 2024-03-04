import "./App.css";
import Contact from "./Components/Contact";
import Home from "./Pages/Home";
//import Footer from "./Components/Footer";
//import Front from "./Components/Front";
//import Login from "./Components/Login";
//import Register from "./Components/Register";
import Signup from "./Components/Signup";
import {BrowserRouter ,Routes, Route} from "react-router-dom";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contactus" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
