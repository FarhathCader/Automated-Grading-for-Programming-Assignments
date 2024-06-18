import React, { useEffect, useState } from 'react';
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { backendUrl } from '../../../config';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const CompletedContest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user._id) return;
    fetchEnrolledContests();
  }, [user]);

  const fetchEnrolledContests = async () => {
    setLoading(true);
    try {
      if (!user._id) return;
      const response = await fetch(`${backendUrl}/api/enrollment/contest/${user._id}/enrolled-contests`);
      if (!response.ok) {
        throw new Error("Failed to fetch enrolled contests");
      }
      const data = await response.json();
      setContests(data.contests);
    } catch (error) {
      console.error("Error fetching enrolled contests:", error);
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
          {/* <Header bgColor="blue" /> */}
          {contests && contests.length > 0 ? (
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
                    {contests.map((contest, index) => (
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
              </div>

              </div>
            ) : (
              <div className="w-full h-screen flex justify-center items-center">
              <div className="w-5/6 max-w-xl p-6 rounded-xl shadow-lg flex flex-col items-center">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">No Completed Contests</h1>
                <p className="text-lg text-blue-950 text-center">You have no completed contests. Participate in a contest to see it here!!</p>
              </div>
            </div>
    


            )}
        </section>
      )}
    </main>
  );
}

export default CompletedContest;
