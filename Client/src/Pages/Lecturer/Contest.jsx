import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import SidebarLecturer from "../../Sections/SidebarLecturer";
import Header from "../../Sections/Header";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";
import GeneratePdf from "./GeneratePdf";

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
  const [contestToEnd, setContestToEnd] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/contest");
      if (!response.ok) {
        throw new Error("Failed to fetch contests");
      }
      const data = await response.json();
      setContests(data.contests);
    } catch (error) {
      console.error("Error fetching contests:", error);
    } finally {
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
      const response = await fetch(`http://localhost:4000/api/contest/${contestId}`, {
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

  const endContest = async (contestId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/contest/${contestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endDate: new Date().toISOString() }),
      });
      if (!response.ok) {
        throw new Error("Failed to end contest");
      }
      // Update the contest's end date in the state
      setContests((prevContests) =>
        prevContests.map((contest) =>
          contest._id === contestId ? { ...contest, endDate: new Date().toISOString() } : contest
        )
      );
    } catch (error) {
      console.error("Error ending contest:", error);
    }
    finally {
      window.location.reload();
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

  const handleEndConfirmation = (contestId) => {
    setContestToEnd(contestId);
    setShowConfirmation(true);
  };

  const handleConfirmEnd = () => {
    if (contestToEnd) {
      endContest(contestToEnd);
      setContestToEnd(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelAction = () => {
    setContestToDelete(null);
    setContestToEnd(null);
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

  const currentTimestamp = new Date().getTime();

  const filteredContests = showCompleted
    ? contests.filter((contest) => new Date(contest.endDate).getTime() < currentTimestamp)
    : contests.filter((contest) => new Date(contest.endDate).getTime() >= currentTimestamp);

  return (
    <main className="w-full h-screen flex justify-between items-start">
      <SidebarLecturer />
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
          <section className="w-4/5 bg-white flex-grow flex flex-col justify-start items-center p-4">
            <Header bgColor="fuchsia" />
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
                  {filteredContests.map((contest, index) => (
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
                              onClick={() => handleEndConfirmation(contest._id)}
                            >
                              End Contest
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
              <button
                className="mt-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
                onClick={handleShowCompletedClick}
              >
                {showCompleted ? "Show Active Contests" : "Show Completed Contests"}
              </button>
              {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-4 rounded shadow">
                    <p className="mb-4">Are you sure you want to {contestToDelete ? 'delete' : 'end'} this contest? You cannot undo this action.</p>
                    <div className="flex justify-end">
                      <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded" onClick={contestToDelete ? handleConfirmDelete : handleConfirmEnd}>
                        {contestToDelete ? 'Delete' : 'End'} 
                      </button>
                      <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={handleCancelAction}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )
      }
    </main>
  );
};

export default Contest;
