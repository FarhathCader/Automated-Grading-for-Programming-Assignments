import React, { useEffect, useState } from "react";
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {  CSSProperties } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { backendUrl } from "../../../config";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const AvailableContest = () => {
  
  // Dummy contest data

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enterContest, setEnterContest] = useState(false);
  const [activeContest, setActiveContest] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [student, setStudent] = useState(null);

  const user = useSelector(state => state.user);

  useEffect(() => {
    fetchStudent();
  }, [user]);

  const fetchStudent = async () => {
    setLoading(true);
    try {
      if (user._id === undefined) return;
      const res = user && await axios.get(`${backendUrl}/api/student/${user._id}`);
      const data = res && (await res.data);
      if (data) setStudent(data);
    } catch (err) {
      console.log("error", err.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if(activeContest)  // Calculate the time remaining until the contest starts
  {  const calculateTimeRemaining = () => {
      const contestStartDate = new Date(activeContest.endDate);
      const currentTime = new Date();
      const timeDiff = contestStartDate - currentTime;

      // Convert time difference to days, hours, minutes, and seconds
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      hours += days * 24;


      // Construct the time remaining string
      const timeRemainingStr = `${hours}h ${minutes}m ${seconds}s`;

      // Update state with the time remaining string
      setTimeRemaining(timeRemainingStr);
    };

    // Call the calculateTimeRemaining function initially and every second
    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);}
  }, [activeContest]);

  const handleContestDetailsClick = async (contestId) => {
   try{
    const response  = await axios.post(`${backendUrl}/api/enrollment/`, {studentId: student._id, contestId});
    console.log("response", response.data);
   }
   catch(error){
     toast.error("Error creating enrollment:");
   }
   finally{
    navigate(`/contestview/${contestId}`);
   }

    
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!student) return;
    fetchAvailableContests();
  }, [student]);  
  
  const fetchAvailableContests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/contest/available/${student._id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch contests");
      }
      const data = await response.json();
      setContests(data.availableContests_);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching contests:", error);
    }
    finally{
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
  

  return (
 enterContest ? (
  <div className="w-full h-screen flex justify-center items-center bg-gray-100">
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

    ) :
 ( 
  <main className="w-full h-screen flex justify-between items-start">
      <Sidebar />
     {
        loading?
        (
      
          <div className="w-full flex justify-center items-center h-screen">
                <ClipLoader
                  color="blue"
                  loading={true}
                  size={150}
                  css={override}
                />
              </div>
        
        ) : 

      (<section className="w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
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
                  // onClick={()=>handleContestDetailsClick(contest._id)}
                  onClick={()=> handleClick(contest)}
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
      </section>)}
    </main>)
  );
};

export default AvailableContest;
