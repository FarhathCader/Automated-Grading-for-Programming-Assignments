import React from 'react';
import Sidebar from "../Sections/Sidebar";
import Header from "../Sections/Header";

const CompletedContest = () => {
    const contests = [
        { name: "Contest 1", date: "2024-01-20", time: "9:00 AM" , grade:"65" },
        { name: "Contest 2", date: "2024-02-23", time: "2:30 PM", grade:"85" },
        { name: "Contest 3", date: "2024-02-28", time: "8:00 AM", grade:"100" },
        { name: "Contest 4", date: "2024-03-05", time: "4:00 PM", grade:"70" },
      ];
  return (
    <main className="w-full h-screen flex justify-between items-start">
    <Sidebar />
    <section className="w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
      <Header />
      <div className="w-5/6 p-6 bg-blue-400 rounded-xl shadow-lg flex flex-col items-center mt-20">
        <h2 className="text-xl font-semibold mb-4 text-blue-950">
          Completed Contests
        </h2>
        <table className="w-full">
          <thead>
            <tr className="bg-blue-200">
              <th className="px-6 py-3 text-left text-blue-800">Name</th>
              <th className="px-6 py-3 text-left text-blue-800">Date</th>
              <th className="px-6 py-3 text-left text-blue-800">Time</th>
              <th className="px-6 py-3 text-left text-blue-800">Grade</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-blue-800" : "bg-blue-700"
                }
              >
                <td className="px-6 py-4 text-blue-200">{contest.name}</td>
                <td className="px-6 py-4 text-blue-200">{contest.date}</td>
                <td className="px-6 py-4 text-blue-200">{contest.time}</td>
                <td className="px-6 py-4 text-blue-200">{contest.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </main>
  );
}

export default CompletedContest;
