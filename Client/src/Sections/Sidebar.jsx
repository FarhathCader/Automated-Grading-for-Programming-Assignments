// import React, { useEffect } from "react";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { MdDashboard, MdPerson, MdSchool, MdLogout } from "react-icons/md";
// import { RiTaskFill } from "react-icons/ri";
// import { BsPersonWorkspace } from "react-icons/bs";
// import { FaArrowRight } from "react-icons/fa";

// const variants = {
//   expanded: { width: "20%" },
//   collapsed: { width: "5%" },
// };

// const navItems = [
//   {
//     name: "Student Dashboard",
//     icon: MdDashboard,
//   },
//   {
//     name: "Available Contest",
//     icon: MdSchool,
//   },
//   {
//     name: "Completed Contest",
//     icon: RiTaskFill,
//   },
//   {
//     name: "Practice",
//     icon: BsPersonWorkspace,
//   },
//   {
//     name: "Profile",
//     icon: MdPerson,
//   },
// ];

// const Sidebar = () => {
//   const [activeNavIndex, setActiveNavIndex] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(true);

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       if (width < 768) {
//         setIsExpanded(false);
//       } else {
//         setIsExpanded(true);
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <motion.section
//       animate={isExpanded ? "expanded" : "collapsed"}
//       variants={variants}
//       className={
//         "w-1/5 bg-gray-900 h-screen flex flex-col justify-between items-center gap-10 relative " +
//         (isExpanded ? "py-8 px-6" : "px-8 py-6")
//       }
//     >
//       <div className="flex flex-col justify-center items-center gap-8">
//         {isExpanded ? (
//           <div id="logo-box">
//             <h1 className="text-blue-400 font-bold text-4xl ">
//               ZEE <span className="italic text-blue-200">CODE</span>
//             </h1>
//           </div>
//         ) : (
//           <div className="flex justify-center items-center">
//             <h1 className="text-blue-400 font-bold text-3xl">Z</h1>
//             <span className="italic text-blue-200 text-3xl">C</span>
//           </div>
//         )}
//         <div
//           id="navlinks-box"
//           className="flex flex-col justify-center items-start gap-5 w-full mt-5"
//         >
//           {navItems.map((item, index) => (
//             <div
//               key={item.name}
//               id="link-box"
//               className={
//                 "flex justify-start items-center gap-4 w-full cursor-pointer rounded-xl " +
//                 (activeNavIndex === index
//                   ? "bg-blue-300 text-blue-900"
//                   : "text-white") +
//                 (isExpanded ? " px-6 py-2" : " p-2")
//               }
//               onClick={() => setActiveNavIndex(index)}
              
//             >
//               <div className="bg-blue-100 text-blue-900 p-2 rounded-full ">
//                 <item.icon className="md:w-6 w-4 h-4 md:h-6" />
//               </div>
//               <span className={"text-lg " + (isExpanded ? "flex" : "hidden")}>
//                 {item?.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div
//         id="expanded-icon"
//         className="bg-blue-300 text-blue-900 p-2 rounded-full cursor-pointer absolute -right-4 bottom-20 md:bottom-40 md:flex hidden"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         <FaArrowRight />
//       </div>
//       <div
//         id="logout-box"
//         className="w-full flex flex-col justify-start items-center gap-4 cursor-pointer"
//       >
//         <div className="bg-blue-300 w-full h-[0.5px]"></div>
//         <div className="flex justify-center items-center gap-2 ">
//           <MdLogout className="w-6 h-6 text-white hover:text-blue-400" />
//           <span
//             className={"text-white text-lg hover:text-blue-400 " + (isExpanded ? "flex" : "hidden")}
//           >
//             Logout
//           </span>
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default Sidebar;


import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from React Router
import { MdDashboard, MdPerson, MdSchool, MdLogout } from "react-icons/md";
import { RiTaskFill } from "react-icons/ri";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
axios.defaults.withCredentials = true;

const variants = {
  expanded: { width: "20%" },
  collapsed: { width: "5%" },
};

const navItems = [
  {
    name: "Student Dashboard",
    icon: MdDashboard,
    link: "/dashboard_std",
  },
  {
    name: "Available Contest",
    icon: MdSchool,
    link: "/available",
  },
  {
    name: "Completed Contest",
    icon: RiTaskFill,
    link: "/completed",
  },
  {
    name: "Practice",
    icon: BsPersonWorkspace,
    link: "/practice",
  },
  {
    name: "Profile",
    icon: MdPerson,
    link: "/profile",
  },
];

const Sidebar = () => {
  const navigate = useNavigate(); // Get the navigate function
  const location = useLocation(); // Get the current location
  const [isExpanded, setIsExpanded] = useState(true);

  const isLoggedin = useSelector(state => state.isLoggedin)
  console.log(isLoggedin)
  const dispatch = useDispatch();

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

  const handleLogout = async () => {
    // Handle logout
    const response = await axios.post('http://localhost:4000/api/user/logout',null,{withCredentials: true})
    const data = await response.data;
    if(response.status === 200){
      toast.success(data.msg)
      setTimeout( ()=>
        navigate('/')
      ,1000)

    }
    else{
      toast.error(data.response.data.error)
    }
    dispatch(authActions.logout())

  }

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
            <Link
              key={item.name}
              to={item.link}
              id="link-box"
              className={
                "flex justify-start items-center gap-4 w-full cursor-pointer rounded-xl " +
                (location.pathname === item.link
                  ? "bg-blue-300 text-blue-900"
                  : "text-white") +
                (isExpanded ? " px-6 py-2" : " p-2")
              }
            >
              <div className="bg-blue-100 text-blue-900 p-2 rounded-full ">
                <item.icon className="md:w-6 w-4 h-4 md:h-6" />
              </div>
              <span className={"text-lg " + (isExpanded ? "flex" : "hidden")}>
                {item?.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div
        id="expanded-icon"
        className="bg-blue-300 text-blue-900 p-2 rounded-full cursor-pointer absolute -right-4 bottom-20 md:bottom-40 md:flex hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FaArrowRight />
      </div>
      <div
        id="logout-box"
        className="w-full flex flex-col justify-start items-center gap-4 cursor-pointer"
        onClick={handleLogout}
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
        <ToastContainer/>
      </div>
    </motion.section>
  );
};

export default Sidebar;
