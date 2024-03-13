import React, { useEffect, useRef, useState } from "react";
import client from "../assets/Images/client.jpg";
import LogoImage from "../assets/Images/logo.jpg";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.withCredentials = true;

const Header = () => {
  const shouldLog = useRef(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [user, setUser] = useState(null); // Start with null to indicate loading

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:4000/api/user/user", {
            withCredentials: true,
          });
          const data = res.data;
          setUser(data.user);
        } catch (err) {
          toast.error(err.response.data.error);
          console.log("error", err);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [navigate]);

  // Display loading indicator if loading
  if (loading) {
    return (
      <div className="w-full bg-blue-300 h-20 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-blue-300 lg:h-20 h-fit flex justify-between items-center p-4 rounded-xl lg:gap-2 gap-4">
      <div>
        <img
          className="w-12 h-12 flex items-center justify-center bg-cover bg-center bg-no-repeat"
          src={LogoImage}
          alt="logo"
        />
      </div>
      <div className="flex-grow flex justify-end items-center gap-4">
        <h1 className="text-lg font-semibold text-blue-900">{user ? user.username : "Rifab Ahamed"}</h1>
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
