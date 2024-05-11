import SidebarLecturer from "../../Sections/SidebarLecturer";
import Header from "../../Sections/Header";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function LecturerDashBoard() {
  const shouldLog = useRef(true);
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const userType = useSelector((state) => state.userType);
  console.log(isLoggedin, userType);


 


  return (
    <main className="w-full h-screen flex justify-between items-start">
      <SidebarLecturer />
      <section className="w-4/5 grow bg-white h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        <Header bgColor="fuchsia" />
        <div className="w-100 p-6 bg-fuchsia-100 rounded-xl shadow-lg flex flex-col items-center mt-20">
          <h1 className="text-3xl font-bold text-fuchsia-700 mb-4">
            Welcome to your Dashboard!{" "}
          </h1>
          <div className="mb-6 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-lg mb-4">
              Explore the available contests or start practicing to sharpen your
              skills.
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
          </div>
        </div>
      </section>
    </main>
  );
}
