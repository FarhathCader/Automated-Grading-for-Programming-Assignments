import React, { useEffect, useState } from "react";
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";
import { useNavigate } from "react-router-dom";

const AvailableContest = () => {
  // Dummy contest data

  const [contests, setContests] = useState([]);

  const handleContestDetailsClick = (contestId) => {
    navigate(`/contestview/${contestId}`);
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchAvailableContests();
  }, []);  
  
  const fetchAvailableContests = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/contest");
      if (!response.ok) {
        throw new Error("Failed to fetch contests");
      }
      const data = await response.json();
      const availableContests = data.contests.filter(contest => {
        const currentDate = new Date();
        const startDate = new Date(contest.startDate);
        const endDate = new Date(contest.endDate);
        return currentDate >= startDate && currentDate <= endDate;
      });
      setContests(availableContests);
    } catch (error) {
      console.error("Error fetching contests:", error);
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

  return (
    <main className="w-full h-screen flex justify-between items-start">
      <Sidebar />
      <section className="w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        <Header bgColor="blue" />
        <div className="w-5/6 p-6 bg-blue-400 rounded-xl shadow-lg flex flex-col items-center mt-20">
          <h2 className="text-xl font-semibold mb-4 text-blue-950">
            Available Contests
          </h2>
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
                  className={
                    index % 2 === 0 ? "bg-blue-800 cursor-pointer hover:scale-102" : "bg-blue-700 cursor-pointer hover:scale-102"
                  }
                  onClick={()=>handleContestDetailsClick(contest._id)}
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
      </section>
    </main>
  );
};

export default AvailableContest;
