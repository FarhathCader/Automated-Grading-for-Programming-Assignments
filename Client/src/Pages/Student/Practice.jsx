import React from "react";
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";

const Practice = () => {
    const contests = [
        { name: "Hello World", status: "Completed" },
        { name: "Print Stars", status: "Not Completed" },
        { name: "Fibonacci", status: "Try Again" },
        { name: "Counting Bits", status: "Completed" },
    ];
        
    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-500 hover:bg-green-600";
            case "Not Completed":
                return "bg-red-500 hover:bg-red-600";
            case "Try Again":
                return "bg-yellow-500 hover:bg-yellow-600";
            default:
                return "";
        }
    };

    return (
        <main className="w-full h-screen flex justify-between items-start">
            <Sidebar />
            <section className="w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
                <Header />
                <div className="w-5/6 p-6 bg-blue-400 rounded-xl shadow-lg flex flex-col items-center mt-20">
                    <h2 className="text-xl italic font-semibold mb-4 text-blue-950 bg-blue-200 p-4 rounded">
                        Practice Makes Perfect
                    </h2>
                    <table className="w-3/5">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="px-6 py-3 text-left text-blue-800">Question Name</th>
                                <th className="px-6 py-3 text-left text-blue-800">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.map((contest, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "bg-blue-800" : "bg-blue-700"}
                                >
                                    <td className="px-6 py-4 text-blue-200">{contest.name}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className={`text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                                getStatusColor(contest.status)
                                            }`}
                                        >
                                            {contest.status}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default Practice;
