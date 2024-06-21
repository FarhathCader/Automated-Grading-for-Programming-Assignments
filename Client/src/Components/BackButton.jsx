import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';


const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="bg-blue-500 flex items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6 text-sm md:text-2xl lg:text-3xl"
    >
      <FaArrowLeft className="mr-2" /> Back
    </button>
  );
};

export default BackButton;
