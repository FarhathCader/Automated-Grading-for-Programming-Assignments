import React from "react";
import Header from "../../Sections/Header";
import SidebarAdmin from "../../Sections/SidebarAdmin";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa"; // Import the search, edit, and delete icons

const ManageLecturers = () => {
  // Dummy data for the table
  const lecturers = [
    { name: "Dr. Keerthi Gunawickrama", department: "Electrical & Information Engineering", position: "Senior Lecturer", status: "Active" },
    { name: "Dr. Rajitha Udawalpola", department: "Electrical & Information Engineering", position: "Head, Senior Lecturer", status: "Inactive" },
    { name: "Dr. Kushan Sudheera", department: "Electrical & Information Engineering", position: "Senior Lecturer", status: "Active" },
  ];

  return (
    <main className="w-full h-screen flex justify-between items-start">
      <SidebarAdmin />
      <section className="w-4/5 grow bg-white h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        <Header />
        <div className="w-full max-w-screen-lg mx-auto flex items-center mt-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full border rounded-md"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>
        <div className="w-full p-6 bg-blue-100 rounded-xl shadow-lg flex flex-col items-center mt-8">
          <div className="overflow-x-auto w-full">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-200">
                  <th className="px-6 py-3 text-left text-blue-800">Name</th>
                  <th className="px-6 py-3 text-left text-blue-800">Department</th>
                  <th className="px-6 py-3 text-left text-blue-800">Position</th>
                  <th className="px-6 py-3 text-left text-blue-800">Status</th>
                  <th className="px-6 py-3 text-left text-blue-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lecturers.map((lecturer, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-blue-800" : "bg-blue-700"}
                  >
                    <td className="px-6 py-4 text-blue-200">{lecturer.name}</td>
                    <td className="px-6 py-4 text-blue-200">{lecturer.department}</td>
                    <td className="px-6 py-4 text-blue-200">{lecturer.position}</td>
                    <td className="px-6 py-4 text-blue-200">{lecturer.status}</td>
                    <td className="px-6 py-4 flex">
                      <FaEdit className="mr-4 text-green-500 hover:text-green-600 cursor-pointer" /> {/* Adjusted margin-right to add more space */}
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

export default ManageLecturers;