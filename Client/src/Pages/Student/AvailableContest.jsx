import React from "react";
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";

const AvailableContest = () => {
  // Dummy contest data
  const contests = [
    { name: "Contest 1", date: "2024-04-15", time: "10:00 AM" },
    { name: "Contest 2", date: "2024-04-20", time: "2:00 PM" },
    { name: "Contest 3", date: "2024-04-25", time: "3:30 PM" },
    { name: "Contest 4", date: "2024-04-27", time: "4:30 PM" },
  ];

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
                <th className="px-6 py-3 text-left text-blue-800">Date</th>
                <th className="px-6 py-3 text-left text-blue-800">Time</th>
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
