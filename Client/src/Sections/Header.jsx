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
import ClipLoader from "react-spinners/ClipLoader";
import {  CSSProperties } from "react";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

axios.defaults.withCredentials = true;

const Header = ({ bgColor }) => {
  const shouldLog = useRef(true);
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Start with null to indicate loading


  return (
    <section
      className={classNames(
        "w-full lg:h-20 h-fit flex justify-between items-center p-4 rounded-xl lg:gap-2 gap-4",
        {
          "bg-fuchsia-300": bgColor === "fuchsia", 
          "bg-blue-300": bgColor === "blue", 
          "bg-green-300": bgColor === "green", 
        }
      )}
    >
      <div>
        <img
          className="w-12 h-12 flex items-center justify-center bg-cover bg-center bg-no-repeat"
          src={LogoImage}
          alt="logo"
        />
      </div>
      <div className="flex-grow flex justify-end items-center gap-4">
        <h1 className="text-lg font-semibold text-blue-900">
          {user ? user.username : <ClipLoader color="blue" loading={true} size={150} css={override} />}
        </h1>
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
