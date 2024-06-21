import React, { useEffect, useState } from 'react';
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { backendUrl } from '../../../config';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const CompletedContest = () => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // Number of contests per page
  const [totalPages, setTotalPages] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [showSearch, setShowSearch] = useState(false);
  

  useEffect(() => {
    if (!user._id) return;
    fetchEnrolledContests();
  }, [user, currentPage]);

  useEffect(() => {
    firstSearch();
  }, [currentPage, contests]);

  const firstSearch = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    setFilteredContests(contests.slice(startIndex, endIndex));
  };

  const fetchEnrolledContests = async () => {
    setLoading(true);
    try {
      if (!user._id) return;
      const response = await axios.get(`${backendUrl}/api/enrollment/contest/${user._id}/enrolled-contests`);
      const allContests = response.data.contests;
      setContests(allContests);
      setFilteredContests(allContests); 
      const totalContests = allContests.length;
      if(totalContests > 0) setShowSearch(true)
      const total = Math.ceil(totalContests / perPage)
      setTotalPages(total);
      if (total > 1) setShowBtn(true)
    } catch (error) {
      toast.error("Error fetching enrolled contests:", error);
      console.log(error)
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

  const handleContestDetailsClick = (contestId) => {
    navigate(`/contestview/${contestId}`);
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

  return (
    <main className="w-full h-screen flex justify-between items-start">
      {/* <Sidebar /> */}
      {loading ? (
        <div className="w-full flex justify-center items-center h-screen">
          <ClipLoader
            color="blue"
            loading={true}
            size={150}
            cssOverride={override}
          />
        </div>
      ) : (
        <section className="w-full lg:w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
         { showSearch && <div className="w-full mt-4 mb-4 border border-blue-300 rounded-lg relative">
            <FaSearch className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
            <input
              type="text"
              placeholder="Search Contest.."
              className="pl-10 pr-4 py-2 w-full border rounded-md"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>}
          {/* <Header bgColor="blue" /> */}
          {filteredContests && filteredContests.length > 0 ? (
            <div className="w-full p-6 bg-blue-400 rounded-xl shadow-lg flex flex-col items-center mt-20 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4 text-blue-950">Completed Contests</h2>

              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-200">
                      <th className="px-6 py-3 text-left text-blue-800">Name</th>
                      <th className="px-6 py-3 text-left text-blue-800">End Date</th>
                      <th className="px-6 py-3 text-left text-blue-800">Duration</th>
                      <th className="px-6 py-3 text-left text-blue-800">Problems</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContests.map((contest, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-blue-800 cursor-pointer hover:scale-102" : "bg-blue-700 cursor-pointer hover:scale-102"}
                        onClick={() => handleContestDetailsClick(contest._id)}
                      >
                        <td className="px-6 py-4 text-blue-200">{contest.name}</td>
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

            </div>
          ) : (
            <div className="w-full h-screen flex justify-center items-center">
              <div className="w-5/6 max-w-xl p-6 rounded-xl shadow-lg flex flex-col items-center">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">No Completed Contests Found</h1>
                <p className="text-lg text-blue-950 text-center">Participate in a contest to see it here!!</p>
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
  );
}

export default CompletedContest;
