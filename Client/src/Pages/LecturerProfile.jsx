import React from "react";
import Header from "../Sections/Header";
import client from "../assets/Images/client.jpg";
import SidebarLecturer from "../Sections/SidebarLecturer";

const LecturerProfile = () => {
  const profileData = {
    name: "Dr.Keerthi Gunawickrama",
    email: "keerthi@eie.ruh.ac.lk",
  };
  return (
    <main className="w-full h-screen flex justify-between items-start">
      <SidebarLecturer />
      <section className="w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        <Header />
        <div className="w-3/5 p-6 bg-blue-200 rounded-xl shadow-lg flex flex-col items-center mt-20">
          <img
            src={client}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <div className="overflow-x-auto w-full">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-lg font-semibold text-blue-800">
                    Name
                  </td>
                  <td className="px-4 py-2 text-sm text-blue-600 whitespace-nowrap">
                    {profileData.name}
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2 text-lg font-semibold text-blue-800">
                    Email
                  </td>
                  <td className="px-4 py-2 text-sm text-blue-600 whitespace-nowrap">
                    {profileData.email}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Edit Profile
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              OK
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LecturerProfile;
