import React, { useEffect } from "react";
import Header from "../../Sections/Header";
import SidebarAdmin from "../../Sections/SidebarAdmin";
import { FaSearch, FaEdit, FaTrash, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";
import { backendUrl } from "../../../config";
import io from 'socket.io-client';
import { toast } from "react-toastify";
import axios from "axios";


const socket = io(backendUrl);

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const ManageStudents = () => {

  const [students, setStudents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState('createdAt'); // Sorting field
  const [sortOrder, setSortOrder] = useState('desc'); // Sorting order

  useEffect(() => {
    fetchStudents(sortField, sortOrder);
  }, [sortField, sortOrder]);

  useEffect(() => {
    fetchStudents();
    socket.on('studentcreated', () => {
      fetchStudents();
    });
    socket.on('studentupdated', () => {
      fetchStudents();
    });
    return () => {
      socket.off('studentcreated');
      socket.off('studentupdated');
    };
  }, []);

  const fetchStudents = async (sortField, sortOrder) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/student`,
        {
          params: {
            // page: page,
            // limit: problemsPerPage,
            sortField,
            sortOrder
          },
        }
      );
      if (response.status === 200) {
        setStudents(response.data);
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }
  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/student/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      // Remove the deleted lecturer from the state
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setStudentToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      deleteStudent(studentToDelete);
      setStudentToDelete(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setStudentToDelete(null);
    setShowConfirmation(false);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  }


  return (
    <main className="w-full h-screen flex justify-between items-start bg-green-100">
      <SidebarAdmin />
      {
        loading ? (

          <div className="w-full flex justify-center items-center h-screen">
            <ClipLoader
              color="green"
              loading={true}
              size={150}
              css={override}
            />
          </div>

        ) :
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
                      <th className="px-2 md:px-6 py-3 text-left text-green-800">
                        <div className="flex items-center gap-2">
                          <p className="hover:cursor-pointer"
                            onClick={() => handleSort('createdAt')}
                          >
                            Date
                          </p>
                          <div className="text-sm">
                            <FaSortUp
                              className={sortField === 'createdAt' && sortOrder === 'asc' ? 'text-green-500' : 'text-gray-500'}
                            />
                            <FaSortDown
                              className={sortField === 'createdAt' && sortOrder === 'desc' ? 'text-green-500' : 'text-gray-500'}
                            />
                          </div>
                        </div>


                      </th>
                      <th className="px-2 md:px-6 py-3 text-left text-green-800">
                        <div className="flex items-center gap-2">
                          <p className="hover:cursor-pointer"
                            onClick={() => handleSort('username')}
                          >
                            Name
                          </p>
                          <div className="text-sm">
                            <FaSortUp
                              className={sortField === 'username' && sortOrder === 'asc' ? 'text-green-500' : 'text-gray-500'}
                            />
                            <FaSortDown
                              className={sortField === 'username' && sortOrder === 'desc' ? 'text-green-500' : 'text-gray-500'}
                            />
                          </div>
                        </div>


                      </th>
                      <th className="px-2 md:px-6 py-3 text-left text-green-800">
                        <div className="flex items-center gap-2">
                          <p className="hover:cursor-pointer"
                            onClick={() => handleSort('regNo')}
                          >
                            Reg No
                          </p>
                          <div className="text-sm">
                            <FaSortUp
                              className={sortField === 'regNo' && sortOrder === 'asc' ? 'text-green-500' : 'text-gray-500'}
                            />
                            <FaSortDown
                              className={sortField === 'regNo' && sortOrder === 'desc' ? 'text-green-500' : 'text-gray-500'}
                            />
                          </div>
                        </div>


                      </th>

                      <th className="px-2 md:px-6 py-3 text-left text-green-800">
                        <div className="flex items-center gap-2">
                          <p className="hover:cursor-pointer"
                            onClick={() => handleSort('email')}
                          >
                            Email
                          </p>
                          <div className="text-sm">
                            <FaSortUp
                              className={sortField === 'email' && sortOrder === 'asc' ? 'text-green-500' : 'text-gray-500'}
                            />
                            <FaSortDown
                              className={sortField === 'email' && sortOrder === 'desc' ? 'text-green-500' : 'text-gray-500'}
                            />
                          </div>
                        </div>


                      </th>

                      <th className="px-6 py-3 text-left text-green-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students && students.map((student, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-green-800" : "bg-green-700"}
                      >
                        <td className="px-6 py-4 text-green-200">
                          {`${new Date(student.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })} ${new Date(student.createdAt).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                          })}`}
                        </td>
                        <td className="px-6 py-4 text-green-200">{student.username}</td>
                        <td className="px-6 py-4 text-green-200">
                          {student.regNo}
                        </td>
                        <td className="px-6 py-4 text-green-200">{student.email}</td>


                        <td className="px-10 py-4 flex ">
                          <FaTrash
                            className="text-red-500 hover:text-red-600 cursor-pointer"
                            onClick={() => handleDeleteConfirmation(student._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow">
            <p className="mb-4">Are you sure you want to delete this student?</p>
            <div className="flex justify-end">
              <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded" onClick={handleConfirmDelete}>Delete</button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ManageStudents;
