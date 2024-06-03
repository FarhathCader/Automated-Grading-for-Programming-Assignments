import React, { useEffect, useState } from "react";
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import {  CSSProperties } from "react";
import { backendUrl } from "../../../config";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Practice = () => {
 
    
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      // Fetch questions from API
      fetchQuestions();
    }, []);
    const fetchQuestions = async () => {
        setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/problems`);
        const practiceProblems = response.data.problems.filter(problem => problem.category.toLowerCase() === 'practice');
        setProblems(practiceProblems);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
        finally{
            setLoading(false);
        }
    };



    return (
        <main className="w-full h-screen flex justify-between items-start">
            <Sidebar />
          {
            loading ?
            (
      
                <div className="w-full flex justify-center items-center h-screen">
                      <ClipLoader
                        color="blue"
                        loading={true}
                        size={150}
                        css={override}
                      />
                    </div>
              
              ): 
          ( <section className="w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
                <Header bgColor="blue" />
                <div className="w-5/6 p-6 bg-blue-400 rounded-xl shadow-lg flex flex-col items-center mt-20">
                    <h2 className="text-xl italic font-semibold mb-4 text-blue-950 bg-blue-200 p-4 rounded">
                        Practice Makes Perfect
                    </h2>
                  { problems && <table className="w-3/5">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="px-6 py-3 text-left text-blue-800">Problem Name</th>
                                <th className="px-6 py-3 text-left text-blue-800">Difficulty</th>
                                <th className="px-6 py-3 text-left text-blue-800">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {problems.map((problem, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "bg-blue-800 cursor-pointer hover:scale-105" : "bg-blue-700 cursor-pointer hover:scale-105"}
                                    onClick={() => navigate(`/problems/${problem._id}`)}
                                >
                                    <td className="px-6 py-4 text-blue-200">{problem.name}</td>
                                    <td className="px-6 py-4 text-blue-200">{problem.difficulty}</td>
                                    <td className="px-6 py-4 text-blue-200">{problem.grade}</td>
                              
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                </div>
            </section>)}
        </main>
    );
};

export default Practice;
