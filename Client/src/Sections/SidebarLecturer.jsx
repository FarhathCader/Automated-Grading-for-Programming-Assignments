import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { MdDashboard, MdSchool, MdLogout } from "react-icons/md";
import { RiTaskFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa6";


const variants = {
    expanded: { width: "20%" },
    collapsed: { width: "5%" },
  };
  
  const navItems = [
    {
      name: "Lecturer Dashboard",
      icon: MdDashboard,
    },
    {
      name: "Contest",
      icon: MdSchool,
    },
    {
      name: "Questions Bank",
      icon: RiQuestionAnswerFill,
    },
    {
      name: "Profile",
      icon: FaUserGraduate,
    },
  ];

const SidebarLecturer = () => {
    const [activeNavIndex, setActiveNavIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);
  
    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width < 768) {
          setIsExpanded(false);
        } else {
          setIsExpanded(true);
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
   
  return (
    <motion.section
    animate={isExpanded ? "expanded" : "collapsed"}
    variants={variants}
    className={
      "w-1/5 bg-gray-900 h-screen flex flex-col justify-between items-center gap-10 relative " +
      (isExpanded ? "py-8 px-6" : "px-8 py-6")
    }
  >
    <div className="flex flex-col justify-center items-center gap-8">
      {isExpanded ? (
        <div id="logo-box">
          <h1 className="text-blue-400 font-bold text-4xl ">
            ZEE <span className="italic text-blue-200">CODE</span>
          </h1>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-blue-400 font-bold text-3xl">Z</h1>
          <span className="italic text-blue-200 text-3xl">C</span>
        </div>
      )}
      <div
        id="navlinks-box"
        className="flex flex-col justify-center items-start gap-5 w-full mt-5"
      >
        {navItems.map((item, index) => (
          <div
            key={item.name}
            id="link-box"
            className={
              "flex justify-start items-center gap-4 w-full cursor-pointer rounded-xl " +
              (activeNavIndex === index
                ? "bg-blue-300 text-blue-900"
                : "text-white") +
              (isExpanded ? " px-6 py-2" : " p-2")
            }
            onClick={() => setActiveNavIndex(index)}
            
          >
            <div className="bg-blue-100 text-blue-900 p-2 rounded-full ">
              <item.icon className="md:w-6 w-4 h-4 md:h-6" />
            </div>
            <span className={"text-lg " + (isExpanded ? "flex" : "hidden")}>
              {item?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
    <div
      id="expanded-icon"
      className="bg-blue-300 text-blue-900 p-2 rounded-full cursor-pointer absolute -right-4 bottom-20 md:bottom-40 md:flex hidden hover:bg-blue-200"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <FaArrowRight />
    </div>
    <div
      id="logout-box"
      className="w-full flex flex-col justify-start items-center gap-4 cursor-pointer"
    >
      <div className="bg-blue-300 w-full h-[0.5px]"></div>
      <div className="flex justify-center items-center gap-2 ">
        <MdLogout className="w-6 h-6 text-white hover:text-blue-400" />
        <span
          className={"text-white text-lg hover:text-blue-400 " + (isExpanded ? "flex" : "hidden")}
        >
          Logout
        </span>
      </div>
    </div>
  </motion.section>
  );
}

export default SidebarLecturer
