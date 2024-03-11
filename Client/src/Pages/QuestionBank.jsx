import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa"; 
import SidebarLecturer from "../Sections/SidebarLecturer";
import Header from "../Sections/Header";

const QuestionBank = () => {
  return (
    <main className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <SidebarLecturer />
        <section className="w-full bg-blue-100 flex-grow flex flex-col justify-start items-center p-4">
          <div className="w-full max-w-screen-lg mx-auto p-6 bg-blue-300 rounded-xl shadow-lg flex flex-col items-center mt-20">
            <div className="flex items-center justify-between w-full mb-4"> {/* Modified */}
              <div className="relative flex-grow"> {/* Removed w-96 and added flex-grow */}
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
            
          </div>
        </section>
      </div>
    </main>
  );
};

export default QuestionBank;
