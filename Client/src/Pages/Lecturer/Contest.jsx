import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import SidebarLecturer from "../../Sections/SidebarLecturer";
import Header from "../../Sections/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";
import GeneratePdf from "./GeneratePdf";
import { backendUrl } from "../../../config";
import { useSelector } from "react-redux";
import axios from "axios";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Contest = () => {
  const [contests, setContests] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [contestToDelete, setContestToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [contestsPerPage] = useState(5); // Set the number of problems per page
  const [totalContests, setTotalContests] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [totalPages,setTotalPages] = useState(0)

  useEffect(()=>{
    const total = Math.ceil(totalContests / contestsPerPage)
    if(total === 0)return
    setTotalPages(total);
    if(  total > 1)setShowBtn(true)
  },[totalContests,showBtn])

  useEffect(() => {
    console.log("current page", currentPage)
    if(showCompleted){
      fetchCompletedContests(currentPage)
    }else{
      fetchAvailableContests(currentPage)
    }
  }, [user,currentPage,showCompleted]);


  // const fetchContests = async () => {
  //   try {
  //     setLoading(true)
  //     if(user._id === undefined)return
  //     const response = await fetch(`${backendUrl}/api/contest/all/${user._id}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch contests");
  //     }
  //     const data = await response.json();
  //     setContests(data.contests);
  //     setAvailableContests(data.availableContests);
  //     setCompletedContests(data.completedContests);
  //   } catch (error) {
  //     console.error("Error fetching contests:", error);
  //   } finally {
  //     if(user._id !== undefined)
  //     setLoading(false);
  //   }
  // };

  const fetchCompletedContests = async (page) => {
    setLoading(true)
    try {
      if(user._id === undefined)return
      const response = await axios.get(`${backendUrl}/api/contest/completed/${user._id}`,
        {
          params: {
            page: page,
            limit: contestsPerPage,
          },
        }
      );
      setContests(response.data.completedContests);
      console.log("complete",response.data.completedContests)
      setTotalContests(response.data.total);
    } catch (error) {
      console.error("Error fetching contests:", error);
    } finally {
      if(user._id !== undefined)
      setLoading(false);
    }
  };


  const fetchAvailableContests = async (page) => {
    setLoading(true)
    try {
      if(user._id === undefined)return
      const response = await axios.get(`${backendUrl}/api/contest/available-contests/${user._id}`
        ,
        {
          params: {
            page: page,
            limit: contestsPerPage,
          },
        }
      );
      setContests(response.data.availableContests);
      console.log("available",response.data.availableContests)
      setTotalContests(response.data.total);
    } catch (error) {
      console.error("Error fetching contests:", error);
    } finally {
      if(user._id !== undefined)
      setLoading(false);
    }
  };

  const formatDuration = (minutes) => {
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const mins = minutes % 60;

    let durationString = '';

    if (days > 0) {
      durationString += `${days}d `;
    }

    if (hours > 0 || days > 0) {
      durationString += `${hours}h `;
    }

    if (mins > 0 || (hours === 0 && days === 0)) {
      durationString += `${mins}m`;
    }

    return durationString.trim();
  };

  const deleteContest = async (contestId) => {
    try {
      const response = await fetch(`${backendUrl}/api/contest/${contestId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete contest");
      }
      // Remove the deleted contest from the state
      setContests((prevContests) =>
        prevContests.filter((contest) => contest._id !== contestId)
      );
    } catch (error) {
      console.error("Error deleting contest:", error);
    }
  };

 

  const handleDeleteConfirmation = (contestId) => {
    setContestToDelete(contestId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (contestToDelete) {
      deleteContest(contestToDelete);
      setContestToDelete(null);
      setShowConfirmation(false);
    }
  };

 



  const handleCancelAction = () => {
    setContestToDelete(null);
    setShowConfirmation(false);
  };

  const handleAddContestClick = () => {
    navigate("/addcontest");
  };

  const handleEditContestClick = (contestId) => {
    navigate(`/editcontest/${contestId}`);
  };

  const handleContestDetailsClick = (contestId) => {
    navigate(`/contest/${contestId}`);
  };

  const handleShowCompletedClick = () => {
    setShowCompleted((prevShowCompleted) => !prevShowCompleted);
  };


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

return (
    <main className="w-full h-screen flex justify-between items-start">
      {/* <SidebarLecturer /> */}
      {
        loading ? (
          <div className="w-full flex justify-center items-center h-screen">
            <ClipLoader
              color="red"
              loading={true}
              size={150}
              css={override}
            />
          </div>
        ) : (
          <section className="w-4/5 h-screen bg-white flex-grow flex flex-col justify-start items-center p-4">
            {/* <Header bgColor="fuchsia" /> */}
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
                  <button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 flex items-center"
                    onClick={handleAddContestClick}>
                    <FaPlus className="mr-2" /> Add Contest
                  </button>
                </div>
              </div>

              </div>

              <button
                className="mt-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
                onClick={handleShowCompletedClick}
              >
                {showCompleted ? "Show Active Contests" : "Show Completed Contests"}
              </button>
             

         {   contests && contests.length > 0 ?
            <div className="w-full max-w-screen-lg mx-auto p-6 bg-fuchsia-300 rounded-xl shadow-lg flex flex-col items-center mt-5">

           <table className="w-full">
                <thead>
                  <tr className="bg-fuchsia-200">
                    <th className="px-6 py-3 text-left text-fuchsia-800">Name</th>
                    <th className="px-6 py-3 text-left text-fuchsia-800">
                      Deadline
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
                      <td className="px-6 py-4 text-fuchsia-200 cursor-pointer hover:text-fuchsia-300"
                        onClick={() => handleContestDetailsClick(contest._id)}>
                        {contest.name}
                      </td>
                      <td className="px-6 py-4 text-fuchsia-200">
                        {new Date(contest.endDate).toLocaleString([], { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                      </td>
                      <td className="px-6 py-4 text-fuchsia-200">
                        {formatDuration(contest.duration)}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-4">
                        {showCompleted ? (
                          <GeneratePdf contest={contest} />
                        ) : (
                          <>
                            <FaEdit className="text-green-500 hover:text-green-600 cursor-pointer text-xl"
                              onClick={() => handleEditContestClick(contest._id)}
                            />
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                              View Progress
                            </button>
                          </>
                        )}
                        <FaTrash className="text-red-500 hover:text-red-600 cursor-pointer text-xl"
                          onClick={() => handleDeleteConfirmation(contest._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
             {showBtn && <div className="w-full flex justify-center gap-6 items-center mt-4">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 bg-fuchsia-500 text-white font-semibold rounded-lg hover:bg-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span className="text-fuchsia-800 font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-fuchsia-500 text-white font-semibold rounded-lg hover:bg-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>}
              </div>
              :
              <div className="w-full max-w-screen-lg mx-auto p-6 bg-fuchsia-300 rounded-xl shadow-lg flex flex-col items-center mt-5">
              <div className="w-full flex justify-center items-center mt-5">
          <div className="w-full max-w-xl p-6 bg-fuchsia-100 rounded-lg shadow-md flex flex-col items-center">
            <h1 className="text-3xl font-bold text-fuchsia-800 mb-4">No {!showCompleted ? 'active' : 'completed'} Contests</h1>
            <p className="text-lg text-fuchsia-700 text-center">
              There are no {!showCompleted ? 'active' : 'completed'} contests. Start by adding a contest.
            </p>
          </div>
        </div>
        </div>
              }

        
         
              {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-4 rounded shadow">
                    <p className="mb-4">Are you sure you want to delete this contest? You cannot undo this action.</p>
                    <div className="flex justify-end">
                      <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded" onClick={ handleConfirmDelete}>
                        Delete
                      </button>
                      <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={handleCancelAction}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            
          </section>
        )
      }
    </main>
  );
};

export default Contest;
