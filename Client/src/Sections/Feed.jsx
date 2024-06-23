import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../config";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const Feed = () => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [activeContest, setActiveContest] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [showContestDetails, setShowContestDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingContests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/contest/upcoming`);
        setUpcomingContests(response.data.upcomingContests);
      } catch (error) {
        console.log("Error fetching upcoming contests:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchUpcomingContests();
  }, []);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (activeContest) {
        const contestStartDate = new Date(activeContest.startDate);
        const currentTime = new Date();
        const timeDiff = contestStartDate - currentTime;

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          hours += days * 24;

          const timeRemainingStr = `${hours}h ${minutes}m ${seconds}s`;
          setTimeRemaining(timeRemainingStr);
        } else {
          setTimeRemaining("Contest has started");
        }
      }
    };

    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [activeContest]);

  const handleClick = (contest) => {
    setActiveContest(contest);
    setShowContestDetails(true);
  };

  const handleCloseDetails = () => {
    setShowContestDetails(false);
    setActiveContest(null); // Reset active contest when closing details
  };

  if (loading) {
    return (
      <section className="w-full min-h-screen flex justify-center items-center bg-gray-100">
         <div className="w-full flex justify-center items-center h-screen">
        <ClipLoader
          color="blue"
          loading={true}
          size={150}
          css={override}
        />
      </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-4/5 bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-violet-700 mb-4 text-center">Dashboard</h1>
        <div className="mb-6 flex flex-col items-center justify-center text-gray-600">
          <p className="text-lg mb-4 text-center">
            Explore available contests or start practicing to sharpen your skills.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Link to="/available">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                Available Contests
              </button>
            </Link>
            <Link to="/practice">
              <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none">
                Start Practice
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upcoming Contests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingContests.map((contest) => (
              <div key={contest._id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{contest.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Starts: {new Date(contest.startDate).toLocaleString()}
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={() => handleClick(contest)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showContestDetails && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-96 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold mb-4 text-center">{activeContest.name}</h1>
            <p className="text-lg mb-4 text-center">Total Problems: {activeContest.problems.length}</p>
            <p className="text-lg mb-6 text-center">Starts in: {timeRemaining}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={handleCloseDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Feed;
