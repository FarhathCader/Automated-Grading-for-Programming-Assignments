import React from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import SidebarLecturer from "../../Sections/SidebarLecturer";
import Header from "../../Sections/Header";

const Contest = () => {
  const contests = [
    { name: "Contest 1", date: "12/02/2024 | 09.30 AM - 10.30 AM", duration: "1hr" },
    { name: "Contest 2", date: "21/02/2024 | 08.30 AM - 10.30 AM", duration: "2hr" },
    { name: "Contest 3", date: "26/02/2024 | 11.00 AM - 11.30 AM", duration: "30mins" },
  ];
  return (
    <main className="w-full h-screen flex justify-between items-start">
      <SidebarLecturer />
      <section className="w-4/5 bg-white flex-grow flex flex-col justify-start items-center p-4">
        <Header bgFuchsia={true} />
        <div className="w-full max-w-screen-lg mx-auto p-6 bg-fuchsia-300 rounded-xl shadow-lg flex flex-col items-center mt-20">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search Contest.."
                className="pl-10 pr-4 py-2 w-full border rounded-md"
              />
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
            </div>
            <div>
              <button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 flex items-center">
                <FaPlus className="mr-2" /> Add Contest
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-fuchsia-200">
                <th className="px-6 py-3 text-left text-fuchsia-800">Name</th>
                <th className="px-6 py-3 text-left text-fuchsia-800">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-fuchsia-800">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-fuchsia-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-fuchsia-800" : "bg-fuchsia-700"
                  }
                >
                  <td className="px-6 py-4 text-fuchsia-200">
                    {contest.name}
                  </td>
                  <td className="px-6 py-4 text-fuchsia-200">
                    {contest.date}
                  </td>
                  <td className="px-6 py-4 text-fuchsia-200">
                    {contest.duration}
                  </td>
                  <td className="px-6 py-4 flex">
                    <FaEdit className="mr-2 text-green-500 hover:text-green-600 cursor-pointer" />
                    <FaTrash className="text-red-500 hover:text-red-600 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Contest;
