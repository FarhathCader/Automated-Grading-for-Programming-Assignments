import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Feed = () => {
  return (
    <section className="w-4/5 grow bg-white h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
      <Header />
      <div className="w-100 p-6 bg-blue-100 rounded-xl shadow-lg flex flex-col items-center mt-20">
        <h1 className="text-3xl font-bold text-violet-700 mb-4">
          Welcome to your Dashboard!{" "}
        </h1>
        <div className="mb-6 flex flex-col items-center justify-center">
          <p className="text-gray-600 text-lg mb-4">
            Explore the available contests or start practicing to sharpen your
            skills.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Link to={'/available'}>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
              Available Contests
            </button></Link>
          
            <Link to={'/practice'}>
            <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none">
              Start Practice
            </button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;
