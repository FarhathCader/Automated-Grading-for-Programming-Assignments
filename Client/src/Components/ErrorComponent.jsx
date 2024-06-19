// ErrorComponent.js
import React from 'react';

const ErrorComponent = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded shadow-lg text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">OOPS!</h1>
      <p className="text-lg text-gray-700">Server is Down. Come back later</p>
    </div>
  </div>
  );
};

export default ErrorComponent;
