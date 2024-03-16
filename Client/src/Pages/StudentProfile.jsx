import React, { useEffect, useRef } from "react";
import Sidebar from "../Sections/Sidebar";
import Header from "../Sections/Header";
import client from "../assets/Images/client.jpg";
import EditStudentProfile from "../Pages/EditStudentProfile";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const StudentProfile = () => {
  const student = {
    name: "John Doe",
    email: "johndoe@example.com",
    registrationNumber: "123456789",
  };

  const shouldLog = useRef(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [user, setUser] = useState(null); 
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      const fetchData = async () => {
        const res = await axios
          .get("http://localhost:4000/api/user/user", { withCredentials: true })
          .catch((err) => {
            toast.error(err.response.data.error);
            console.log("error", err);
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

  const [editProfile, setEditProfile] = useState(false);

  const handleProfile = () => {
    setEditProfile(true);
  };

  const cancel = () => {
    setEditProfile(false);
  };

  return (
    <main className="w-full  h-screen flex justify-between items-start">
      
      <Sidebar />
      <div className="w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        <Header />
        {editProfile ? (
          <EditStudentProfile cancel = {cancel} />
        ) : (
          <div className="relative max-w-md mx-auto md:max-w-2xl mt-40 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <div className="px-6">
              <div className="flex-grow flex flex-col items-center justify-start">
                <div className="w-full flex justify-center mt-4">
                  <div className="relative rounded-full overflow-hidden">
                    <img
                      src={client}
                      className="shadow-xl rounded-full align-middle border-none object-cover w-32 h-32"
                      alt="Student Profile"
                    />
                  </div>
                </div>
                <div className="w-full text-center mt-20">
                  <div className="flex justify-center lg:pt-4  pb-0">
                    <div className="w-full text-center mt-2">
                      <div className="flex justify-center lg:pt-4 pb-0">
                        <div className="w-full lg:w-1/2">
                          <div className="bg-slate-100 p-8 rounded-lg mb-20 shadow-gray-700">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                              Your Profile
                            </h2>
                            <div className="flex items-center mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mr-2"
                                htmlFor="name"
                              >
                                Name:
                              </label>
                             {user && <p className="text-gray-800 text-lg">
                                {user.username}
                              </p> } 
                            </div>
                            <div className="flex items-center mb-6">
                              <label
                                className="block text-gray-700 text-sm font-bold mr-2"
                                htmlFor="email"
                              >
                                Email:
                              </label>
                             {user &&  <p className="text-gray-800 text-lg">
                                {user.email}
                              </p>}
                            </div>
                            <div className="flex items-center mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mr-2"
                                htmlFor="regNumber"
                              >
                                Registration Number:
                              </label>
                             {user &&  <p className="text-gray-800 text-lg">
                                {/* {user.regNo} */}
                              </p>}
                            </div>
                            <div className="text-center">
                              <button
                                onClick={handleProfile}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Edit Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default StudentProfile;
