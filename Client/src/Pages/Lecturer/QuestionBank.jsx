// import React from "react";
// import { FaSearch, FaPlus } from "react-icons/fa"; 
// import SidebarLecturer from "../Sections/SidebarLecturer";
// import Header from "../Sections/Header";

// const QuestionBank = () => {
//   return (
//     <main className="w-full h-screen flex flex-col">
//       <Header />
//       <div className="flex-grow flex">
//         <SidebarLecturer />
//         <section className="w-full bg-blue-100 flex-grow flex flex-col justify-start items-center p-4">
//           <div className="w-full max-w-screen-lg mx-auto p-6 bg-blue-300 rounded-xl shadow-lg flex flex-col items-center mt-20">
//             <div className="flex items-center justify-between w-full mb-4"> {/* Modified */}
//               <div className="relative flex-grow"> {/* Removed w-96 and added flex-grow */}
//                 <input
//                   type="text"
//                   placeholder="Search Question.."
//                   className="pl-10 pr-4 py-2 w-full border rounded-md"
//                 />
//                 <FaSearch className="absolute top-3 left-3 text-gray-400" /> 
//               </div>
//               <div>
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center">
//                   <FaPlus className="mr-2" /> Add Question
//                 </button>
//               </div>
//             </div>
            
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default QuestionBank;

import React from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import SidebarLecturer from "../../Sections/SidebarLecturer";
import Header from "../../Sections/Header";

const QuestionBank = () => {
  
  const questions = [
    { name: "Question 1", category: "Hello World", difficulty: "Easy" },
    { name: "Question 2", category: "Functions", difficulty: "Medium" },
    { name: "Question 3", category: "Abstractions", difficulty: "Hard" },
  ];

  return (
    <main className="w-full h-screen flex justify-between items-start">
      <SidebarLecturer />
      <section className="w-4/5 bg-white flex-grow flex flex-col justify-start items-center p-4">
        <Header />
        <div className="w-full max-w-screen-lg mx-auto p-6 bg-blue-300 rounded-xl shadow-lg flex flex-col items-center mt-20">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search Question.."
                className="pl-10 pr-4 py-2 w-full border rounded-md"
              />
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center">
                <FaPlus className="mr-2" /> Add Question
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-6 py-3 text-left text-blue-800">Name</th>
                <th className="px-6 py-3 text-left text-blue-800">Category</th>
                <th className="px-6 py-3 text-left text-blue-800">Difficulty</th>
                <th className="px-6 py-3 text-left text-blue-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-blue-800" : "bg-blue-700"}
                >
                  <td className="px-6 py-4 text-blue-200">{question.name}</td>
                  <td className="px-6 py-4 text-blue-200">{question.category}</td>
                  <td className="px-6 py-4 text-blue-200">{question.difficulty}</td>
                  <td className="px-6 py-4 flex">
                    <FaEdit className="mr-2 text-green-500 hover:text-green-600 cursor-pointer" />
                    <FaTrash className="text-red-500 hover:text-red-600 cursor-pointer" />
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

export default QuestionBank;