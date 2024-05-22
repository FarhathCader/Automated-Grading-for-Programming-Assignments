import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContestView = () => {
  const formatDuration = (minutes) => {
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const mins = minutes % 60;

    let durationString = "";

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

  const [contest, setContest] = useState({});
  const [problems, setProblems] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchContestById(id);
    }
  }, [id]);

  const fetchContestById = async (contestId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/contest/${id}`);
      setContest(response.data.contest);
      fetchProblems(response.data.contest.problems);
    } catch (error) {
      console.error("Error fetching contest details:", error);
    }
  };

  const fetchProblems = async (problemIds) => {
    try {
      const response = await axios.get("http://localhost:4000/api/problems");
      const problemsData = response.data.problems;
      const selectedProblems = problemsData.filter((problem) => problemIds.includes(problem._id));
      setProblems(selectedProblems);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 ">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6">{contest.name}</h2>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">Deadline:</p>
            <p className="text-gray-800">{new Date(contest.endDate).toLocaleString([], { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</p>
          </div>
          <div>
            <p className="text-gray-600">Duration:</p>
            <p className="text-gray-800">{formatDuration(contest.duration)}</p>
          </div>
        </div>
      
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {problems.map((problem, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-100 transition duration-300 cursor-pointer"
        onClick={() => navigate(`/contests/${id}/problems/${problem._id}`)}
        >
          <header className="mb-4">
            <h4 className="text-lg font-semibold">{problem.name}</h4>
          </header>
          <div className="text-gray-700 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{problem.difficulty}</span>
              <span className="text-sm text-gray-600">Category: {problem.category}</span>
              <span className="text-sm text-gray-600">Max Grade: {problem.grade}</span>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={() =>  navigate(`/contests/${id}/problems/${problem._id}`)}
            >Solve Problem</button>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default ContestView;
