import React, { useEffect, useState } from "react";
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Practice = () => {
 
    
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      // Fetch questions from API
      fetchQuestions();
      console.log(problems)
    }, []);
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/problems");
        setProblems(response.data.problems);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };



    return (
        <main className="w-full h-screen flex justify-between items-start">
            <Sidebar />
            <section className="w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
                <Header bgColor="blue" />
                <div className="w-5/6 p-6 bg-blue-400 rounded-xl shadow-lg flex flex-col items-center mt-20">
                    <h2 className="text-xl italic font-semibold mb-4 text-blue-950 bg-blue-200 p-4 rounded">
                        Practice Makes Perfect
                    </h2>
                  { problems && <table className="w-3/5">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="px-6 py-3 text-left text-blue-800">Question Name</th>
                                <th className="px-6 py-3 text-left text-blue-800">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {problems.map((problem, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "bg-blue-800" : "bg-blue-700"}
                                >
                                    <td className="px-6 py-4 text-blue-200">{problem.name}</td>
                                    <td className="px-6 py-4 text-blue-200">{problem.difficulty}</td>
                              
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                </div>
            </section>
        </main>
    );
};

export default Practice;
