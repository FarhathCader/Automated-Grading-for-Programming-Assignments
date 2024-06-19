import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { backendUrl } from "../../../config";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";
import ViewProblem from './ViewProblem';
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

export default function SelectProblems(props) {
    const {onClose,addSelection} = props
    const [problemsList, setProblemList] = useState([]);
    const [selectedProblems, setSelectedProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showViewProblem, setShowViewProblem] = useState(false);
    const [activeProblemId, setActiveProblemId] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/problems`);
            const data = await res.json();
            setProblemList(data.problems);
        } catch (error) {
            toast.error("Error fetching problems: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (location.state && location.state.selectedProblems) {
            setSelectedProblems(location.state.selectedProblems);
        }
    }, [location.state]);

    const handleSelectProblem = (problem) => {
        // Check if the problem is already selected
        if (!selectedProblems.some(p => p._id === problem._id)) {
            const newSelectedProblems = [...selectedProblems, problem];
            setSelectedProblems(newSelectedProblems);
            navigate(location.pathname, { state: { selectedProblems: newSelectedProblems } });
        } else {
            toast.warning("This problem is already selected.");
        }
    };
    const handleRemoveProblem = (problem) => {
        const newSelectedProblems = selectedProblems.filter(p => p !== problem);
        setSelectedProblems(newSelectedProblems);
        navigate(location.pathname, { state: { selectedProblems: newSelectedProblems } });
    };



    const handleViewProblem = (problem)=>{

        setActiveProblemId(problem._id);
        setShowViewProblem(true)
    
      }
    
      const handleCloseViewProblem = () => {
        setShowViewProblem(false);
      };

    const handleCancel = () => {
        navigate(location.pathname, { state: { selectedProblems: [] } });
        onClose();
    };

    const handleSave = () => {
        if(selectedProblems.length === 0){
            toast.error("No Problems Has been selected")
            return
        }
        addSelection(selectedProblems)
        navigate(location.pathname, { state: { selectedProblems: [] } });
        onClose();
    };

    if(loading){
        return  <div className="w-full flex justify-center items-center h-screen">
        <ClipLoader
          color="red"
          loading={true}
          size={150}
          css={override}
        />
      </div>
    }

    
  if(showViewProblem){
    return <ViewProblem onClose={handleCloseViewProblem} id = {activeProblemId} />
  }

    return (
        <div className="container mx-auto p-4">
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
    
        {/* Save and Cancel buttons moved to the top */}
        <div className="flex justify-center mb-4 space-x-4">
            <button 
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded"
            >
                Cancel
            </button>
            <button 
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Save
            </button>
        </div>
    
        <div className="text-2xl font-bold mb-4">Problems</div>
        <div className="overflow-x-auto max-w-full max-h-96 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {problemsList.map((problem, index) => (
                    <div key={index} className="bg-white shadow-md rounded p-4 flex justify-between items-center">
                        <span className="text-lg">{problem.name}</span>
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => handleSelectProblem(problem)}
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                                Select
                            </button>
                            <FaEye 
                                className="text-blue-500 cursor-pointer"
                                onClick={() => handleViewProblem(problem)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
        <div className="text-2xl font-bold mt-8 mb-4">Selected Problems</div>
        <div className="overflow-x-auto max-w-full max-h-96 mb-4">
            {selectedProblems.length === 0 ? (
                <div className="text-center">No problems selected.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedProblems.map((problem, index) => (
                        <div key={index} className="bg-white shadow-md rounded p-4 flex justify-between items-center">
                            <span className="text-lg">{problem.name}</span>
                            <button 
                                onClick={() => handleRemoveProblem(problem)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    
        {/* Additional space to ensure Save and Cancel buttons are not overlapped */}
        <div className="mb-8"></div>
    
        {/* ToastContainer at the end */}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </div>
    );
}
