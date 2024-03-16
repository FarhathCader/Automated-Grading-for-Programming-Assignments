import React, { useEffect, useRef, useState } from "react";
import client from "../assets/Images/client.jpg";
import LogoImage from "../assets/Images/logo.jpg";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
axios.defaults.withCredentials = true;

const Header = () => {
  const shouldLog = useRef(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [user, setUser] = useState(null);
  const dispatch = useDispatch() // Start with null to indicate loading


  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/user/user", {
        withCredentials: true,
      });
      return res.data; // Return user data from response
    } catch (err) {
      // toast.error(err.response.data.error);
      console.log("error", err);
      setTimeout(() => {
        navigate("/");
      }, 1000); // Throw error message and redirect to homepage
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };


  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      const fetchData = async () => {
        const res = await axios
          .get("http://localhost:4000/api/user/user", { withCredentials: true })
          .catch((err) => {
            toast.error(err.response.data.error);
            console.log("error is here", err);
            dispatch(authActions.logout())

            setTimeout(() => {
              navigate("/login");
            }, 1000);
          });
        const data = res && (await res.data);
        if (data) setUser(data.user);

        // setUser(data.user);
      };
      fetchData();
      setTimeout(() => setLoading(false), 1000);
    }
  }, []);

  // Display loading indicator if loading
  // if (loading) {
  //   return (
  //     <div className="w-full bg-blue-300 h-20 flex justify-center items-center">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

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
