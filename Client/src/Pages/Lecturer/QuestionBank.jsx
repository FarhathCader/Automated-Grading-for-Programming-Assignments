import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import SidebarLecturer from "../../Sections/SidebarLecturer";
import Header from "../../Sections/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";
import { backendUrl } from "../../../config";
import { useSelector } from "react-redux";
import ViewProblem from "./ViewProblem";
import NotFoundPage from "../../Components/NotFoundPage";
import { set } from "lodash";
import { FaA, FaArrowLeft } from "react-icons/fa6";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const QuestionBank = () => {

  const [problems, setProblems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  const [activeID, setActiveID] = useState("");
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user)
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [problemsPerPage] = useState(3); // Set the number of problems per page
  const [totalProblems, setTotalProblems] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [totalPages, setTotalPages] = useState(0)
  const [notFound, setNotFound] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showProblem, setShowProblem] = useState(true)
  const [name, setName] = useState('')


  useEffect(() => {
    const total = Math.ceil(totalProblems / problemsPerPage)
    console.log("total", totalProblems, problemsPerPage, "total pages", total)

    if (total === 0) return
    setTotalPages(total);
    if (total > 1) {
      setShowBtn(true)
    }
    else {
      setShowBtn(false)
    }
    if (currentPage > total) {
      setCurrentPage(1)
    }
  }, [totalProblems, showBtn])

  useEffect(() => {

    if (showProblem) {
      fetchQuestions(currentPage)
      return
    }
    if (showSearch) {
      fetchSearchedQuestions(currentPage)
      return
    }
  }, [showSearch, currentPage, showProblem]);

  useEffect(() => {
    console.log("show", showSearch)
    if (name !== "") return
    setShowProblem(true)
    setShowSearch(false)
  }, [name])

  const fetchSearchedQuestions = async (page) => {
    setLoading(true);
    if (name === "") return
    try {
      const response = await axios.get(`${backendUrl}/api/problems/search`, {
        params: {
          name,
          page: page,
          limit: problemsPerPage,
        }
      });
      setProblems(response.data.problems);
      setTotalProblems(response.data.total);
      setSearchParams({ page: page });
    } catch (error) {
      console.log("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };






  useEffect(() => {
    localStorage.clear();
  }, [])


  const fetchQuestions = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/problems`,
        {
          params: {
            page: page,
            limit: problemsPerPage,
          },
        }
      );
      setProblems(response.data.problems);
      setTotalProblems(response.data.total);
      setSearchParams({ page: page });
    } catch (error) {
      console.log("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const editProblem = (problem, e) => {

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

  const addProblem = () => {
    navigate('/addproblem')
  }



  const handleNext = () => {
    if (currentPage !== totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1)

    }
  }

  const handleViewProblem = (problem) => {
    setShow(true)
    setActiveID(problem._id)
  }

  const cancelView = () => {
    setShow(false)
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleClick = () => {
    if (name === "") return
    setShowSearch(true)
    fetchSearchedQuestions(currentPage)
    setShowProblem(false)
  }

  if (show) {

    return <ViewProblem onClose={cancelView} id={activeID} />

  }



  return (
    <main className="w-full h-screen flex flex-col md:flex-row justify-between items-start">
      {/* SidebarLecturer component */}
      {/* <SidebarLecturer /> */}

      {!loading ? (
        <section className="w-full md:w-4/5 h-screen bg-white flex-grow flex flex-col justify-start items-center p-4">
          {/* <Header bgColor="fuchsia" /> */}
          <div className="w-full max-w-screen-lg mx-auto p-4 md:p-6 bg-fuchsia-300 rounded-xl shadow-lg flex flex-col items-center mt-10 md:mt-20 mb-5">
            <div className="flex flex-col md:flex-row items-center justify-between w-full mb-4">
              <div className="relative flex-grow w-full md:w-auto mb-4 md:mb-0 mr-0 md:mr-4">
                <input
                  type="text"
                  placeholder="Search Question.."
                  className="pl-10 pr-4 py-2 w-full border rounded-md"
                  value={name}
                  onChange={handleChange}
                  disabled={loading}
                />
                <FaSearch className="absolute top-3 left-3 text-gray-400" />
              </div>
              <div>
                <button
                  className="w-full md:w-auto bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 flex items-center"
                  onClick={handleClick}
                >
                  <FaSearch className="mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mb-5">
            <button
              className="w-full md:w-auto bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 flex items-center"
              onClick={addProblem}
            >
              <FaPlus className="mr-2" />
              Add Question
            </button>
          </div>
          {problems && problems.length > 0 ? (<div className="w-full max-w-screen-lg mx-auto p-4 md:p-6 bg-fuchsia-300 rounded-xl shadow-lg flex flex-col items-center mt-5">
  <div className="overflow-x-auto w-full">
    <table className="w-full">
      <thead>
        <tr className="bg-fuchsia-200">
          <th className="px-2 md:px-6 py-3 text-left text-fuchsia-800">Name</th>
          <th className="px-2 md:px-6 py-3 text-left text-fuchsia-800 hidden md:table-cell">Category</th>
          <th className="px-2 md:px-6 py-3 text-left text-fuchsia-800 hidden md:table-cell">Difficulty</th>
          <th className="px-2 md:px-6 py-3 text-left text-fuchsia-800 hidden md:table-cell">Added By</th>
          <th className="px-2 md:px-6 py-3 text-left text-fuchsia-800">Actions</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((question, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-fuchsia-800" : "bg-fuchsia-700"}>
            <td className="px-2 md:px-6 py-4 text-fuchsia-200">{question.name}</td>
            <td className="px-2 md:px-6 py-4 text-fuchsia-200 hidden md:table-cell">{question.category}</td>
            <td className="px-2 md:px-6 py-4 text-fuchsia-200 hidden md:table-cell">{question.difficulty}</td>
            <td className="px-2 md:px-6 py-4 text-fuchsia-200 hidden md:table-cell">{question.addedBy}</td>
           
              {question.createdBy === user._id ? (
                        <td className="px-2 md:px-6 py-4 flex">
                        <FaEdit
                          className="mr-2 text-green-500 hover:text-green-600 cursor-pointer"
                          onClick={() => editProblem(question)}
                        />
                        <FaTrash
                          className="mr-2 text-red-500 hover:text-red-600 cursor-pointer"
                          onClick={() => deleteProblem(question)}
                        />
                        <FaEye
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                          onClick={() => handleViewProblem(question)}
                        />
                      </td>
              ):(<td>
                   <FaEye
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                          onClick={() => handleViewProblem(question)}
                        />
              </td>)}
       
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {showBtn && (
    <div className="w-full flex flex-col md:flex-row justify-center gap-2 md:gap-6 items-center mt-4">
      <button
        onClick={handlePrev}
        className="px-3 py-2 md:px-4 md:py-2 bg-fuchsia-500 text-white font-semibold rounded-lg hover:bg-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="text-fuchsia-800 font-semibold text-sm md:text-base">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        className="px-3 py-2 md:px-4 md:py-2 bg-fuchsia-500 text-white font-semibold rounded-lg hover:bg-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )}
</div>
): (
            <div className="w-full flex justify-center items-center mt-5">
              <div className="w-full max-w-xl p-4 md:p-6 bg-fuchsia-100 rounded-lg shadow-md flex flex-col items-center">
                <h1 className="text-3xl font-bold text-fuchsia-800 mb-4">No Questions Found</h1>
                <p className="text-lg text-fuchsia-700 text-center">
                  There are no questions in the Question Bank as your request. Start by adding questions to build your collection.
                </p>
              </div>
            </div>
          )}
        </section>
      ) : (
        <div className="w-full flex justify-center items-center h-screen">
          <ClipLoader color="red" loading={true} size={150} css={override} />
        </div>
      )}

      {/* Delete confirmation modal */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow">
            <p className="mb-4">Are you sure you want to delete this problem?</p>
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