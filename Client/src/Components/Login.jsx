import React,{useState} from "react";
import signupImage from "../assets/Images/signup-background.svg";
import teamworkImage from "../assets/Images/teamwork.svg";
import { FaLock, FaTimes } from "react-icons/fa";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { useNavigate ,Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";


const Login = () => {
  const  navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch()


  // const handleLogin = async (e)=>{
  //   e.preventDefault();
  //   if (isRegistering) return; // Prevent multiple submissions
  //   setIsRegistering(true); 
  //   if(email === '' || password === ''){
  //     toast.error('All fields are required');
  //   }
  //   else{
  //     const response = await fetch('http://localhost:4000/api/user/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ email, password })
  //     });
  //     const json = await response.json();
  //     if (!response.ok) {
  //       toast.error(json.error);
  //     }
  //     if (response.ok) {
  //       // toast("Logged in Successfully",{type: "success"})
  //       toast.success("Login success");
  //       console.log("success")
  //       if(json.msg === 'student'){
  //         setTimeout(() => {
  //           navigate('/dashboard_std');
  //         },1000)
  //       }
  //       else if (json.msg === 'lecturer'){
  //         setTimeout(() => {
  //           navigate('/dashboard_lec');
  //         },1000)
  //       }
  //     else{
  //       setTimeout(() => {
  //         navigate('/admin');
  //       },1000)
      


  //     }
        
  //     }
     
  //   }
  //   setTimeout(() => {
  //     setIsRegistering(false);
  //     },1800)
  // }


  // const sendRequest = async () =>{
  //   const res = await axios.post('http://localhost:4000/api/user/login', { email, password }, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .catch(err=>{
  //     toast.error(err.response.data.error)
  //   })
  //   const data = await res.data;
  //   return data

  // }

const handleLogin = async (e) => {
  e.preventDefault();
  if (isRegistering) return; // Prevent multiple submissions
  setIsRegistering(true);
  if (email === '' || password === '') {
    toast.error('All fields are required');
  } else {
    try {
      const response = await axios.post('http://localhost:4000/api/user/login', { email, password });
      const json = response.data;
      console.log(json)
      if (!response.status === 200) {
        console.log(json)
        toast.error(json.error);
      } else {
        dispatch(authActions.login())
        
        toast.success("Login success");
        console.log("success");


        if (json.msg === 'student') {
          setTimeout(() => {
            navigate('/dashboard_std');
          }, 1000);
        } else if (json.msg === 'lecturer') {
          setTimeout(() => {
            navigate('/dashboard_lec');
          }, 1000);
        } else {
          setTimeout(() => {
            navigate('/admin');
          }, 1000);
        }
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
      setTimeout(() => {
        setIsRegistering(false);
      }, 1800);
    }
  
};


  const handleBack  = ()=>{
    navigate('/');
  };

  const gotoSignup = ()=>{
    navigate('/signup');
  };

  const gotoForgot = ()=>{
    navigate('/forgotpassword');
  };

  return (
    <div
      className="bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] to-[#481EDC] to-90%
    flex items-center justify-center h-screen "
    >
      <div className="max-w-[960px] relative bg-black bg-opacity-50 grid grid-cols-1 md:grid-cols-2 items-center p-5 rounded-2xl gap-10 md:gap-20">
        <div className="relative hidden md:block">
          <img src={signupImage} alt="" />
          <img src={teamworkImage} alt="" className="absolute top-36" />
        </div>
        <div className="max-w-80 grid gap-5">
        <button onClick={handleBack} className="text-gray-300 text-2xl absolute top-3 right-3 hover:bg-blue-400 hover:text-white hover:rounded-full hover:p-1 ">
            <FaTimes />
          </button>
          <h1 className="text-5xl font-bold text-white">Login</h1>
          <p className="text-white text-opacity-70">
            Crafting instructions for computers to execute tasks and solve
            problems efficiently
          </p>
          <form action="" className="space-y-6 text-white" onSubmit={handleLogin}>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white bg-opacity-40 rounded-full p-2 flex items-center justify-center text-blue-300">
                <FaEnvelopeOpen />
              </div>
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
                className="w-80 bg-white bg-opacity-30 py-2 px-12 rounded-full focus:bg-black focus:bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-sky-500  focus:drop-shadow-lg"
              />
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white bg-opacity-40 rounded-full p-2 flex items-center justify-center text-blue-300">
                <FaLock />
              </div>
              <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
                type="text"
                placeholder="Password"
                className="w-80 bg-white bg-opacity-30 py-2 px-12 rounded-full focus:bg-black focus:bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-sky-500  focus:drop-shadow-lg"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-2">
              Sign In
            </button>
          </form>
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
          transition: Bounce/>
          <div className="text-white text-opacity-70 border-t border-white border-opacity-40 pt-4 space-y-4 text-sm">
            <p>
              Don't have an account?{" "}
              <a onClick={gotoSignup} className="text-blue-600 font-semibold cursor-pointer">
                Sign up
              </a>
            </p>
            <p>

              {/* Forgot password?{" "}
              <Link  className="text-blue-600 font-semibold cursor-pointer" to = '/forgot'>
                Reset password
              </Link> */}

              Forgot my password?{" "}
              <a onClick={gotoForgot} className="text-blue-600 font-semibold cursor-pointer">
                Forgot password
              </a>

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
