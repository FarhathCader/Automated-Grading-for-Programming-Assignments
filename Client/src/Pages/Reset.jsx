import React from "react";
import { FaLock, FaTimes } from "react-icons/fa";

import { IoLockClosedSharp } from "react-icons/io5";
import reset from "../assets/Images/reset.jpg";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const  navigate = useNavigate();

  const handleBack = ()=>{
    navigate('/login');
  };

  return (
    <div
      className="bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] to-[#481EDC] to-90%
    flex items-center justify-center h-screen "
    >
      <div className="max-w-[960px] relative bg-black bg-opacity-50 grid grid-cols-1 md:grid-cols-2 items-center p-5 rounded-2xl gap-10 md:gap-20">
        <div>
          <img src={reset} alt="" />
        </div>
        <div className="max-w-80 grid gap-5">
          <button
             onClick={handleBack}
            className="text-gray-300 text-2xl absolute top-3 right-3 hover:bg-blue-400 hover:text-white hover:rounded-full hover:p-1"
          >
            <FaTimes />
          </button>

          <h1 className="text-5xl font-bold text-white">Reset Password</h1>
          <p className="text-white">
            {/* Enter your Email Address below and we will send you a link to reset password. */}
            Enter your new Password and confirm it below.
          </p>
          <form action="" className="space-y-6 text-white">
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white bg-opacity-40 rounded-full p-2 flex items-center justify-center text-blue-300">
                <FaLock />
              </div>
              <input
                type="password"
                placeholder="Enter your New Password"
                className="w-80 bg-white bg-opacity-30 py-2 px-12 rounded-full focus:bg-black focus:bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-sky-500  focus:drop-shadow-lg"
              />
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white bg-opacity-40 rounded-full p-2 flex items-center justify-center text-blue-300">
                <IoLockClosedSharp />
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-80 bg-white bg-opacity-30 py-2 px-12 rounded-full focus:bg-black focus:bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-sky-500  focus:drop-shadow-lg"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-2">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
