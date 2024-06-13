import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import SidebarLecturer from "../../Sections/SidebarLecturer";
import Header from "../../Sections/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {  CSSProperties } from "react";
import { backendUrl } from "../../../config";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const QuestionBank = () => {
  
  const [problems, setProblems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch questions from API
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/problems`);
      setProblems(response.data.problems);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }finally{
      setLoading(false);
    }
  };

const editProblem = (problem,e)=>{ 

  navigate(`/editproblem/${problem._id}`)
}

const deleteProblem = async (problem, e) => {
  setShowConfirmation(true);
  setProblemToDelete(problem);
};

const handleCancelDelete = () => {
  setProblemToDelete(null);
  setShowConfirmation(false);
};

const handleConfirmDelete = async () => {
  if (problemToDelete) {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/problems/${problemToDelete._id}`
      );
      console.log(response.data.msg);
      fetchQuestions();
    } catch (err) {
      alert(err);
    }
    setProblemToDelete(null);
    setShowConfirmation(false);
  }
};

const addProblem = ()=>{  
  navigate('/addproblem')
}

  return (
    <main className="w-full h-screen flex justify-between items-start">
      {/* <SidebarLecturer /> */}
      {
        !loading ? (
          <section className="w-4/5 h-screen bg-white flex-grow flex flex-col justify-start items-center p-4">
          {/* <Header bgColor="fuchsia" /> */}
          <div className="w-full max-w-screen-lg mx-auto p-6 bg-fuchsia-300 rounded-xl shadow-lg flex flex-col items-center mt-20">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="relative flex-grow mr-4">
                <input
                  type="text"
                  placeholder="Search Question.."
                  className="pl-10 pr-4 py-2 w-full border rounded-md"
                />
                <FaSearch className="absolute top-3 left-3 text-gray-400" />
              </div>
              <div>
                <button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 flex items-center"
                onClick={addProblem}
                >
                  <FaPlus className="mr-2" 
                  /> Add Question
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-fuchsia-200">
                  <th className="px-6 py-3 text-left text-fuchsia-800">Name</th>
                  <th className="px-6 py-3 text-left text-fuchsia-800">Category</th>
                  <th className="px-6 py-3 text-left text-fuchsia-800">Difficulty</th>
                  <th className="px-6 py-3 text-left text-fuchsia-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((question, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-fuchsia-800" : "bg-fuchsia-700"}
                  >
                    <td className="px-6 py-4 text-fuchsia-200"
                   
                    >{question.name}</td>
                    <td className="px-6 py-4 text-fuchsia-200">{question.category}</td>
                    <td className="px-6 py-4 text-fuchsia-200">{question.difficulty}</td>
                    <td className="px-6 py-4 flex">
                      <FaEdit className="mr-2 text-green-500 hover:text-green-600 cursor-pointer" 
                      onClick={(e)=> editProblem(question,e)}
                      />
                      <FaTrash className="text-red-500 hover:text-red-600 cursor-pointer"
                      onClick={(e)=> deleteProblem(question,e)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        ):
        
          (
      
            <div className="w-full flex justify-center items-center h-screen">
                  <ClipLoader
                    color="red"
                    loading={true}
                    size={150}
                    css={override}
                  />
                </div>
          
          )
        }
        

       
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow">
            <p className="mb-4">
              Are you sure you want to delete this problem?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default QuestionBank;