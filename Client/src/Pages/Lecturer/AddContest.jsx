import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddContest = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [durationDays, setDurationDays] = useState(0);
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [problemsList, setProblemList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading,setLoading] = useState(false)
  const [disabled_btn,setDisabled_btn] = useState(false)

  const fetchData = async()=> {
    setLoading(true)
    try {
        const res = await fetch("http://localhost:4000/api/problems");
        const data = await res.json();
        setProblemList(data.problems);
      } catch (error) {
        toast.error("Error fetching problems:", error);
      }
      finally{
        setLoading(false)
      }
  }
  const fetchContestById = async (contestId) => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:4000/api/contest/${contestId}`);
      const contest = response.data.contest;
      const { name, startDate, endDate, duration, problems } = contest;
      setName(name);
      setStartDate(formatDate(startDate)); // Format the date
      setEndDate(formatDate(endDate)); // Format the date
      setDurationDays(Math.floor(duration / (24 * 60)));
      setDurationHours(Math.floor((duration % (24 * 60)) / 60));
      setDurationMinutes(duration % 60);
      setSelectedProblems(problems);
      console.log("selected problems is ",problems)
    } catch (error) {
      toast.error("Error fetching contest details:", error);
    }
    finally{
      setLoading(false)
    }
  };
  
    useEffect( () => {
        fetchData();
        if (id) {
            fetchContestById(id);
          }
    },[id])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

  const handleProblemSelection = (problemId) => {
    const isSelected = selectedProblems.includes(problemId);
    if (isSelected) {
      setSelectedProblems(selectedProblems.filter(id => id !== problemId));
    } else {
      setSelectedProblems([...selectedProblems, problemId]);
    }
  };
  const handleSubmit = async(e) => {
    
    e.preventDefault();
    setDisabled_btn(true)
    // Validation can be added here if needed
    if (!name || !startDate || !endDate || (!durationDays && !durationHours && !durationMinutes)) {
      toast.error("Please fill in all fields");
      setTimeout(() => {
        setDisabled_btn(false)},1000)
      return;
    }

    const totalDurationMinutes = (parseInt(durationDays) * 24 * 60) + (parseInt(durationHours) * 60) + parseInt(durationMinutes);

     // Ensure end date is after start date
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end <= start) {
    toast.error("End date must be after start date. Please reselect the dates.");
    setTimeout(() => {
      setDisabled_btn(false)},1000)
    return;
  }

  // Calculate the difference between start and end dates in minutes
  const durationDifference = Math.floor((end - start) / 60000);

  // Ensure duration is less than or equal to the difference between end date and start date
  if (totalDurationMinutes > durationDifference) {
    toast.error("The specified duration is longer than the time between the start and end dates. Please adjust the duration.");
    setTimeout(() => {
      setDisabled_btn(false)},1000)
    return;
  }
    // Create new contest object
    const newContest = {
      name,
      startDate,
      endDate,
      duration: totalDurationMinutes,
      problems: selectedProblems 
    };

    try {
        if (id) {
          await axios.put(`http://localhost:4000/api/contest/${id}`, newContest);
        } else {
          await axios.post("http://localhost:4000/api/contest", newContest);
        }
        toast.success("Contest saved successfully");
        navigate("/contest");
      } catch (error) {
        console.error("Error saving contest:", error);
        toast.error("Failed to save contest");
      }

      finally{
        setDisabled_btn(false)
      }

    

    setName("");
    setStartDate("");
    setEndDate("");
    setDurationDays(0);
    setDurationHours(0);
    setDurationMinutes(0);

    navigate("/contest")
  };

  const handleMinutesChange = (e) => {
    const minutes = e.target.value;
  if (minutes === "" || (!isNaN(minutes) && parseInt(minutes) >= 0)) {
    if (minutes === "" || parseInt(minutes) < 60) {
      setDurationMinutes(minutes);
    } else {
      const hours = parseInt(durationHours) +  Math.floor(parseInt(minutes) / 60);
      const remainingMinutes = parseInt(minutes) % 60;
      setDurationHours(hours.toString());
      const days = parseInt(durationDays) + Math.floor(parseInt(hours) / 24);
      const remainingHours = parseInt(hours) % 24;
        setDurationDays(days.toString());
        setDurationHours(remainingHours.toString());
      setDurationMinutes(remainingMinutes.toString());
    }
  }
  };

  const handleHoursChange = (e) => {
    const hours = e.target.value;
    if (hours === "" || (!isNaN(hours) && parseInt(hours) >= 0)) {
      if (hours === "" || parseInt(hours) < 24) {
        setDurationHours(hours);
      } else {
        const days = parseInt(durationDays) + Math.floor(parseInt(hours) / 24);
        const remainingHours = parseInt(hours) % 24;
        setDurationDays(days.toString());
        setDurationHours(remainingHours.toString());
      }
    }
  };

  return (
    <main className="w-full h-screen flex justify-between items-start">
      <ToastContainer  autoClose='400' />
      <section className="w-4/5 bg-white flex-grow flex flex-col justify-start items-center p-4">
        <div className="w-full max-w-screen-lg mx-auto p-6 bg-fuchsia-300 rounded-xl shadow-lg flex flex-col items-center mt-20">
          <h2 className="text-2xl font-bold mb-4">Add Contest</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-fuchsia-800 mb-1">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter contest name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="block text-fuchsia-800 mb-1">Start Date:</label>
              <input
                type="datetime-local"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="block text-fuchsia-800 mb-1">End Date:</label>
              <input
                type="datetime-local"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
            </div>
            <div className="mb-4 flex justify-between">
  <div>
    <label htmlFor="durationDays" className="block text-fuchsia-800 mb-1">Days:</label>
    <input
      type="number"
      id="durationDays"
      value={durationDays}
      onChange={(e) => setDurationDays(e.target.value)}
      placeholder="Days"
      className="w-20 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
    />
  </div>
  <div>
    <label htmlFor="durationHours" className="block text-fuchsia-800 mb-1">Hours:</label>
    <input
      type="number"
      id="durationHours"
      value={durationHours}
      onChange={handleHoursChange}
      placeholder="Hours"
      className="w-20 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
    />
  </div>
  <div>
    <label htmlFor="durationMinutes" className="block text-fuchsia-800 mb-1">Minutes:</label>
    <input
      type="number"
      id="durationMinutes"
      value={durationMinutes}
      onChange={handleMinutesChange}
      placeholder="Minutes"
      className="w-20 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
    />
  </div>
</div>
<div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Select Problems:</h3>
              {problemsList.map(problem => (
                <div key={problem._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`problem-${problem._id}`}
                    checked={selectedProblems.includes(problem._id)}
                    onChange={() => handleProblemSelection(problem._id)}
                    className="mr-2"
                  />
                  <label htmlFor={`problem-${problem._id}`}>{problem.name}</label>
                </div>
              ))}
            </div>
            <button 
            disabled = {disabled_btn}
            type="submit" className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 flex items-center"
            >
               <FaPlus className="mr-2" /> {id ? "Save Changes" : "Add Contest"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddContest;
