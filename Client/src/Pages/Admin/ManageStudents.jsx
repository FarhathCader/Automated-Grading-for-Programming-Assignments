import React from "react";
import Header from "../../Sections/Header";
import SidebarAdmin from "../../Sections/SidebarAdmin";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const ManageStudents = () => {
  const students = [
    {
      name: "M.M. Musharraf",
      registration_no: "EG/2020/4080",
      department: "Computer Engineering",
    },
    {
      name: "M.F.R. Ahamed",
      registration_no: "EG/2020/3807",
      department: "Computer Engineering",
    },
    {
      name: "M. Mushrif Rila",
      registration_no: "EG/2020/4081",
      department: "Electrical & Information Engineering",
    },
    {
      name: "A.C.M. Farhad",
      registration_no: "EG/2020/3923",
      department: "Computer Engineering",
    },
    {
      name: "M.A.M.S. Akram",
      registration_no: "EG/2020/3810",
      department: "Civil Engineering",
    },
  ];
  return (
    <main className="w-full h-screen flex justify-between items-start">
      <SidebarAdmin />
      <section className="w-4/5 grow bg-green-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        <Header bgColor="green" />
        <div className="w-full max-w-screen-lg mx-auto flex items-center mt-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:border-green-500"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>
        <div className="w-full p-6 bg-green-100 rounded-xl shadow-lg flex flex-col items-center mt-8">
          <div className="overflow-x-auto w-full">
            <table className="w-full">
              <thead>
                <tr className="bg-green-200">
                  <th className="px-6 py-3 text-left text-green-800">Name</th>
                  <th className="px-6 py-3 text-left text-green-800">
                   Registration Number
                  </th>
                  <th className="px-6 py-3 text-left text-green-800">
                  Department
                  </th>
                  <th className="px-6 py-3 text-left text-green-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-green-800" : "bg-green-700"}
                  >
                    <td className="px-6 py-4 text-green-200">{student.name}</td>
                    <td className="px-6 py-4 text-green-200">
                      {student.registration_no}
                    </td>
                    <td className="px-6 py-4 text-green-200">
                      {student.department}
                    </td>
                    
                    <td className="px-6 py-4 flex">
                      <FaEdit className="mr-4 text-blue-500 hover:text-blue-600 cursor-pointer" />{" "}
                      {/* Adjusted margin-right to add more space */}
                      <FaTrash className="text-red-500 hover:text-red-600 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManageStudents;
