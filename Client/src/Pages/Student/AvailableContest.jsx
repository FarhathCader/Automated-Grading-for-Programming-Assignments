import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../Components/BackButton";
import { FaSearch } from "react-icons/fa";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const AvailableContest = () => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]); // State for filtered contests
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // Number of contests per page
  const [totalPages, setTotalPages] = useState(0);
  const [enterContest, setEnterContest] = useState(false);
  const [activeContest, setActiveContest] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [student, setStudent] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sortField, setSortField] = useState(name); // State for sorting field
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetchStudent();
  }, [user]);

  const fetchStudent = async () => {
    try {
      if (user._id === undefined) return;
      const res = await axios.get(`${backendUrl}/api/student/${user._id}`);
      const data = res.data;
      if (data) setStudent(data);
    } catch (err) {
      toast.error("Error fetching student data:", err);
    }
  };

  useEffect(() => {
    if (activeContest) {
      const calculateTimeRemaining = () => {
        const contestEndDate = new Date(activeContest.endDate);
        const currentTime = new Date();
        const timeDiff = contestEndDate - currentTime;

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        hours += days * 24;

        const timeRemainingStr = `${hours}h ${minutes}m ${seconds}s`;
        setTimeRemaining(timeRemainingStr);
      };

      calculateTimeRemaining();
      const interval = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(interval);
    }
  }, [activeContest]);

  useEffect(() => {
    if (!student) return;
    fetchAvailableContests();
  }, [student, currentPage]);

  const fetchAvailableContests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/contest/available/${student._id}`);
      if (!response.data.availableContests_) {
        throw new Error("Failed to fetch contests");
      }
      const allContests = response.data.availableContests_;
      setContests(allContests);
      setFilteredContests(allContests); // Initialize filtered contests
      const totalContests = allContests.length;
      if (totalContests > 0) setShowSearch(true);
      const total = Math.ceil(totalContests / perPage);
      setTotalPages(total);
      if (total > 1) setShowBtn(true);
    } catch (error) {
      console.error("Error fetching contests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    firstSearch();
  }, [currentPage, contests]);

  const firstSearch = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    setFilteredContests(contests.slice(startIndex, endIndex));
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

  const handleContestDetailsClick = async (contestId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/enrollment/`, { studentId: student._id, contestId });
    } catch (error) {
      toast.error("Error creating enrollment:");
    } finally {
      navigate(`/contestview/${contestId}`);
    }
  }

  const handleClick = async (contest) => {
    try {
      const response = await axios.get(`${backendUrl}/api/enrollment/${student._id}/${contest._id}`);
      if (response.data.enrollment) {
        navigate(`/contestview/${contest._id}`);
        return;
      }
      setEnterContest(true);
      setActiveContest(contest);
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value !== "") setShowBtn(false);
    else {
      setShowBtn(true);
      firstSearch();
      return;
    }

    const searchResults = contests.filter(contest =>
      contest.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredContests(searchResults);
  };

  const handleSort = (field) => {
    let direction = "asc";
    if (field === sortField && sortDirection === "asc") {
      direction = "desc";
    }
    setSortField(field);
    setSortDirection(direction);

    const sortedContests = [...filteredContests].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (direction === "asc") {
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
      } else {
        if (aValue > bValue) return -1;
        if (aValue < bValue) return 1;
        return 0;
      }
    });

    setFilteredContests(sortedContests);
  };

  return (
    enterContest ? (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
        <BackButton />
        <div className="w-96 p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-4 text-center">{activeContest.name}</h1>
          <p className="text-lg mb-6 text-center">Contest ends in: {timeRemaining}</p>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => handleContestDetailsClick(activeContest._id)}
          >
            Enter Contest
          </button>
        </div>
      </div>
    ) : (
      <main className="w-full h-screen flex justify-between items-start">
        {loading ? (
          <div className="w-full flex justify-center items-center h-screen">
            <ClipLoader
              color="blue"
              loading={true}
              size={150}
              css={override}
            />
          </div>
        ) : (
          <section className="w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
            {showSearch && <div className="w-full mt-4 mb-4 border border-blue-300 rounded-lg relative">
              <FaSearch className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
              <input
                type="text"
                placeholder="Search Contest.."
                className="pl-10 pr-4 py-2 w-full border rounded-md"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            }
            {filteredContests && filteredContests.length > 0 ? (
              <div className="w-5/6 p-6 bg-blue-400 rounded-xl shadow-lg flex flex-col items-center mt-20">
                <h2 className="text-xl font-semibold mb-4 text-blue-950">
                  Available Contests
                </h2>
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-200">
                      <th className="px-6 py-3 text-left text-blue-800">
                      <div className="flex items-center gap-2">
                        <p className="hover:cursor-pointer"
                          onClick={() => handleSort('name')}
                        >
                          Name
                        </p>
                        <div className="text-sm">
                          <FaSortUp
                            className={sortField === 'name' && sortDirection === 'asc' ? 'text-blue-500' : 'text-gray-500'}
                          />
                          <FaSortDown
                            className={sortField === 'name' && sortDirection === 'desc' ? 'text-blue-500' : 'text-gray-500'}
                          />
                        </div>
                      </div>
                      </th>
                      <th className="px-6 py-3 text-left text-blue-800">
                      <div className="flex items-center gap-2">
                        <p className="hover:cursor-pointer"
                          onClick={() => handleSort('startDate')}
                        >
                          Start Date
                        </p>
                        <div className="text-sm">
                          <FaSortUp
                            className={sortField === 'startDate' && sortDirection === 'asc' ? 'text-blue-500' : 'text-gray-500'}
                          />
                          <FaSortDown
                            className={sortField === 'startDate' && sortDirection === 'desc' ? 'text-blue-500' : 'text-gray-500'}
                          />
                        </div>
                      </div>
                      </th>
                      <th className="px-6 py-3 text-left text-blue-800">
                      <div className="flex items-center gap-2">
                        <p className="hover:cursor-pointer"
                          onClick={() => handleSort('endDate')}
                        >
                          End Date
                        </p>
                        <div className="text-sm">
                          <FaSortUp
                            className={sortField === 'endDate' && sortDirection === 'asc' ? 'text-blue-500' : 'text-gray-500'}
                          />
                          <FaSortDown
                            className={sortField === 'endDate' && sortDirection === 'desc' ? 'text-blue-500' : 'text-gray-500'}
                          />
                        </div>
                      </div>
                      </th>
                      <th className="px-6 py-3 text-left text-blue-800">
                      <div className="flex items-center gap-2">
                        <p className="hover:cursor-pointer"
                          onClick={() => handleSort('duration')}
                        >
                          Duration
                        </p>
                        <div className="text-sm">
                          <FaSortUp
                            className={sortField === 'duration' && sortDirection === 'asc' ? 'text-blue-500' : 'text-gray-500'}
                          />
                          <FaSortDown
                            className={sortField === 'duration' && sortDirection === 'desc' ? 'text-blue-500' : 'text-gray-500'}
                          />
                        </div>
                      </div>
                      </th>
                      <th className="px-6 py-3 text-left text-blue-800">
                      <div className="flex items-center gap-2">
                        <p className="hover:cursor-pointer"
                          onClick={() => handleSort('problems')}
                        >
                          Total Problems
                        </p>
                        <div className="text-sm">
                          <FaSortUp
                            className={sortField === 'problems' && sortDirection === 'asc' ? 'text-blue-500' : 'text-gray-500'}
                          />
                          <FaSortDown
                            className={sortField === 'problems' && sortDirection === 'desc' ? 'text-blue-500' : 'text-gray-500'}
                          />
                        </div>
                      </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContests.map((contest, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-blue-800 cursor-pointer hover:scale-102" : "bg-blue-700 cursor-pointer hover:scale-102"}
                        onClick={() => handleClick(contest)}
                      >
                        <td className="px-6 py-4 text-blue-200">{contest.name}</td>
                        <td className="px-6 py-4 text-blue-200">
                          {new Date(contest.startDate).toLocaleString([], { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                        </td>
                        <td className="px-6 py-4 text-blue-200">
                          {new Date(contest.endDate).toLocaleString([], { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                        </td>
                        <td className="px-6 py-4 text-blue-200">
                          {formatDuration(contest.duration)}
                        </td>
                        <td className="px-6 py-4 text-blue-200">{contest.problems.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {showBtn && <div className="flex justify-center items-center mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <span className="mx-4 text-blue-800">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>}
              </div>
            ) : (
              <div className="w-full h-screen flex justify-center items-center">
                <div className="w-5/6 max-w-xl p-6 rounded-xl shadow-lg flex flex-col items-center">
                  <h1 className="text-4xl font-bold text-blue-900 mb-4">No available Contests</h1>
                  <p className="text-lg text-blue-950">There are no available contests right now. Come back later!</p>
                </div>
              </div>
            )}
          </section>
        )}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </main>
    )
  );
};

export default AvailableContest;
