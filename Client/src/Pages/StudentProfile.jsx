import React from "react";
import Sidebar from "../Sections/Sidebar";
import Header from "../Sections/Header";
import Logo from "../assets/Images/client.jpg";
import EditStudentProfile from "../Pages/EditStudentProfile";
import { useState } from "react";

const StudentProfile = () => {
  const student = {
    name: "John Doe",
    email: "johndoe@example.com",
    registrationNumber: "123456789",
  };

  const [editProfile, setEditProfile] = useState(false);

  const handleProfile = () => {
    setEditProfile(true);
  };

  const cancel = () => {
    setEditProfile(false);
  };

  return (
    <main className="w-full bg-blue-200 h-screen flex justify-between items-start">
      <Sidebar />
      <div className="w-4/5 grow flex flex-col">
        <Header />
        {editProfile ? (
          <EditStudentProfile cancel = {cancel} />
        ) : (
          <div className="relative max-w-md mx-auto md:max-w-2xl mt-40 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <div className="px-6">
              <div className="flex grow flex-wrap justify-center">
                <div className="w-full flex justify-center">
                  <div className="relative">
                    <img
                      src={Logo}
                      className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
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
                              <p className="text-gray-800 text-lg">
                                {student.name}
                              </p>
                            </div>
                            <div className="flex items-center mb-6">
                              <label
                                className="block text-gray-700 text-sm font-bold mr-2"
                                htmlFor="email"
                              >
                                Email:
                              </label>
                              <p className="text-gray-800 text-lg">
                                {student.email}
                              </p>
                            </div>
                            <div className="flex items-center mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mr-2"
                                htmlFor="regNumber"
                              >
                                Registration Number:
                              </label>
                              <p className="text-gray-800 text-lg">
                                {student.registrationNumber}
                              </p>
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
