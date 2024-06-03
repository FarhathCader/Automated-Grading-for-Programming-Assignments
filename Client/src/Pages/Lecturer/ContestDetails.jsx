import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../../config";

const ContestDetails = () => {
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

  const [contest, setContest] = useState({}); // Initialize contest state with an empty object
  const [problems, setProblems] = useState([]); // Initialize problems state with an empty array
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchContestById(id);
    }
  }, [id]);

  const fetchContestById = async (contestId) => {
    try {
      const response = await axios.get(`${backendUrl}/api/contest/${id}`);
      setContest(response.data.contest);
      // Fetch problems using problem IDs
      fetchProblems(response.data.contest.problems);
    } catch (error) {
      console.error("Error fetching contest details:", error);
    }
  };

  const fetchProblems = async (problemIds) => {
    try {
      const response = await axios.get(`${backendUrl}/api/problems`);
      const problemsData = response.data.problems;
      // Filter problems based on problem IDs
      const selectedProblems = problemsData.filter((problem) => problemIds.includes(problem._id));
      setProblems(selectedProblems);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-6 bg-fuchsia-700 rounded-xl shadow-lg flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">{contest.name}</h2>
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center">
          <span className="text-fuchsia-200 mr-2">Deadline:</span>
          <span className="text-fuchsia-200">{new Date(contest.endDate).toLocaleString([], { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</span>
        </div>
        <div className="flex items-center">
          <span className="text-fuchsia-200 mr-2">Duration:</span>
          <span className="text-fuchsia-200">{formatDuration(contest.duration)}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Selected Problems:</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Problem Name</th>
              <th className="border border-gray-300 p-2">Difficulty</th>
              <th className="border border-gray-300 p-2">Grade</th>
              <th className="border border-gray-300 p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem._id} className="border border-gray-300">
                <td className="border border-gray-300 p-2">{problem.name}</td>
                <td className="border border-gray-300 p-2">{problem.difficulty}</td>
                <td className="border border-gray-300 p-2">{problem.grade}</td>
                <td className="border border-gray-300 p-2">{problem.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestDetails;
