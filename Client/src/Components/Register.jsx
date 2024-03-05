import React from "react";
import signupImage from "../assets/Images/signup-background.svg";
import teamworkImage from "../assets/Images/teamwork.svg";
import { FaLock, FaUser } from "react-icons/fa";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { MdAppRegistration } from "react-icons/md";
import { IoLockClosedSharp } from "react-icons/io5";

const Register = () => {
  return (
    <div
      className="bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] to-[#481EDC] to-90%
    flex items-center justify-center h-screen "
    >
      <div className="max-w-[960px]  bg-black bg-opacity-50 grid grid-cols-2 items-center p-5 rounded-2xl gap-20">
        <div className="relative">
          <img src={signupImage} alt="" />
          <img src={teamworkImage} alt="" className="absolute top-36" />
        </div>
        <div className="max-w-80 grid gap-5">
       
          <h1 className="text-5xl font-bold text-white">Register</h1>
          <p className="text-white text-opacity-70">
            Create your account. It's free and only takes a minute.
          </p>
          <form action="" className="space-y-6 text-white">
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white bg-opacity-40 rounded-full p-2 flex items-center justify-center text-blue-300">
                <FaUser />
              </div>
              <input
                type="text"
                placeholder="Username"
                className="w-80 bg-white bg-opacity-30 py-2 px-12 rounded-full focus:bg-black focus:bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-sky-500  focus:drop-shadow-lg"
              />
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white bg-opacity-40 rounded-full p-2 flex items-center justify-center text-blue-300">
                <MdAppRegistration />
              </div>
              <input
                type="text"
                placeholder="Registration Number"
                className="w-80 bg-white bg-opacity-30 py-2 px-12 rounded-full focus:bg-black focus:bg-opacity-50 focus:outline-none focus:ring-1 focus:ring-sky-500  focus:drop-shadow-lg"
              />
            </div>
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
                type="password"
                placeholder="Password"
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
              Register Now
            </button>
          </form>
          <div className="text-white text-opacity-70 border-t border-white border-opacity-40 pt-4 space-y-4 text-sm">
            <p>
              If you already have an account?{" "}
              <a className="text-blue-600 font-semibold cursor-pointer">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
