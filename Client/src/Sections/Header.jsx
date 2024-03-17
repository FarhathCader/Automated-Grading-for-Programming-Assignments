import React, { useEffect, useRef, useState } from "react";
import client from "../assets/Images/client.jpg";
import LogoImage from "../assets/Images/logo.jpg";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import classNames from "classnames"; 
axios.defaults.withCredentials = true;

const Header = ({ bgFuchsia }) => {
  const shouldLog = useRef(true);
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  const user  = useSelector(state => state.user);
  const dispatch = useDispatch() // Start with null to indicate loading




  // useEffect(() => {
  //   if (shouldLog.current) {
  //     shouldLog.current = false;
  //     const fetchData = async () => {
  //       const res = await axios
  //         .get("http://localhost:4000/api/user/user", { withCredentials: true })
  //         .catch((err) => {
  //           toast.error(err.response.data.error);
  //           console.log("error is here", err);
  //           // dispatch(authActions.logout())

  //           setTimeout(() => {
  //             navigate("/login");
  //           }, 1000);
  //         });
  //       const data = res && (await res.data);
  //       console.log(data)
  //       if (data) setUser(data.user);

  //       // setUser(data.user);
  //     };
  //     fetchData();

  //     const reloadPageAfterFiveMinutes = () => {
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000*60*60); // 5 minutes in milliseconds
  //     };
  
  //     reloadPageAfterFiveMinutes();
  //   }
  // }, []);



  return (
    <section
    className={classNames("w-full lg:h-20 h-fit flex justify-between items-center p-4 rounded-xl lg:gap-2 gap-4", {
      "bg-fuchsia-300": bgFuchsia, // Apply bg-fuchsia class if bgFuchsia prop is true
      "bg-blue-300": !bgFuchsia, // Apply bg-blue class if bgFuchsia prop is false
    })}
  >
      <div>
        <img
          className="w-12 h-12 flex items-center justify-center bg-cover bg-center bg-no-repeat"
          src={LogoImage}
          alt="logo"
        />
      </div>
      <div className="flex-grow flex justify-end items-center gap-4">
        <h1 className="text-lg font-semibold text-blue-900">{user ? user.username : ""}</h1>
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={client}
            alt="client-image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Header;
