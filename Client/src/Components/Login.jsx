import React from "react";
import signupImage from "../assets/Images/signup-background.svg";
import teamworkImage from "../assets/Images/teamwork.svg";
import { FaLock, FaTimes } from "react-icons/fa";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const  navigate = useNavigate();

  const handleBack  = ()=>{
    navigate('/');
  };

  const gotoSignup = ()=>{
    navigate('/signup');
  }

  return (
    <div
      className="bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] to-[#481EDC] to-90%
    flex items-center justify-center h-screen "
    >
      <div className="max-w-[960px] relative bg-black bg-opacity-50 grid grid-cols-2 items-center p-5 rounded-2xl gap-20">
        <div className="relative">
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
          <form action="" className="space-y-6 text-white">
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white bg-opacity-40 rounded-full p-2 flex items-center justify-center text-blue-300">
                <FaEnvelopeOpen />
              </div>
              <input
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
                type="text"
                placeholder="Password"
                className="w-80 bg-white bg-opacity-30 py-2 px-12 rounded-full focus:bg-black focus:bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-sky-500  focus:drop-shadow-lg"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-2">
              Sign In
            </button>
          </form>
          <div className="text-white text-opacity-70 border-t border-white border-opacity-40 pt-4 space-y-4 text-sm">
            <p>
              Don't have an account?{" "}
              <a onClick={gotoSignup} className="text-blue-600 font-semibold cursor-pointer">
                Sign up
              </a>
            </p>
            <p>
              Forgot password?{" "}
              <a  className="text-blue-600 font-semibold cursor-pointer">
                Reset password
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
