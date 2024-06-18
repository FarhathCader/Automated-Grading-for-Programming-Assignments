import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { backendUrl } from '../../../config';
import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

const ViewProblem = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/problems/${id}`);
        setProblem(response.data.problem);
        setLoading(false);
      } catch (error) {
        setError('Error fetching problem details');
        setLoading(false);
      }
    };
    fetchProblemDetails();
  }, [id]);

  if (loading) return   <div className="w-full flex justify-center items-center h-screen">
  <ClipLoader
    color="red"
    loading={true}
    size={150}
    css={override}
  />
</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md max-w-3xl">
  <h2 className="text-2xl font-bold mb-6 text-center">{problem.name}</h2>
  
  <div className="mb-6">
    <p className="text-lg"><strong>Difficulty:</strong> {problem.difficulty}</p>
    <p className="text-lg"><strong>Category:</strong> {problem.category}</p>
    <p className="text-lg"><strong>Description:</strong> {problem.description}</p>
  </div>
  
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2">Initial Code:</h3>
    {problem.initialCode.map((code, index) => (
      <div key={index} className="bg-gray-100 rounded-md p-4 my-2">
        <h4 className="font-medium mb-1">Language: {code.language}</h4>
        <pre className="bg-gray-200 rounded-md p-2 overflow-auto">{code.code}</pre>
      </div>
    ))}
  </div>
  
  {problem.testCases && problem.testCases.length > 0 && 
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2">Test Cases:</h3>
    {problem.testCases.map((testCase, index) => (
      <div key={index} className="bg-gray-100 rounded-md p-4 my-2">
        <h4 className="font-medium mb-1">Test Case {index + 1}:</h4>
        <p><strong>Input:</strong> {testCase.input}</p>
        <p><strong>Expected Output:</strong> {testCase.expectedOutput}</p>
        <p><strong>Sample:</strong> {testCase.isSample ? 'Yes' : 'No'}</p>
        <p><strong>Weight:</strong> {testCase.weight}</p>
      </div>
    ))}
  </div>}
  
  {problem.examples && problem.examples.length > 0 && 
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2">Examples:</h3>
    {problem.examples.map((example, index) => (
      <div key={index} className="bg-gray-100 rounded-md p-4 my-2">
        <h4 className="font-medium mb-1">Example {index + 1}:</h4>
        <p><strong>Input:</strong> {example.input}</p>
        <p><strong>Expected Output:</strong> {example.output}</p>
        <p><strong>Explanation:</strong> {example.explanation}</p>
      </div>
    ))}
  </div>}
  
  <div className="mt-4 text-lg">
    <p><strong>Grade:</strong> {problem.grade}</p>
  </div>
</div>

    // <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
    //   <h2 className="text-2xl font-bold mb-4">{problem.name}</h2>
    //   <p><strong>Difficulty:</strong> {problem.difficulty}</p>
    //   <p><strong>Category:</strong> {problem.category}</p>
    //   <p><strong>Description:</strong> {problem.description}</p>

    //   <div className="mt-4">
    //     <h3 className="text-lg font-semibold">Initial Code:</h3>
    //     {problem.initialCode.map((code, index) => (
    //       <div key={index} className="bg-gray-100 rounded-md p-4 my-2">
    //         <h4 className="font-medium">Language: {code.language}</h4>
    //         <pre className="bg-gray-200 rounded-md p-2 overflow-auto">{code.code}</pre>
    //       </div>
    //     ))}
    //   </div>

    //  {problem.testCases && problem.testCases.length > 0 && 
    //   <div className="mt-4">
    //     <h3 className="text-lg font-semibold">Test Cases:</h3>
    //     {problem.testCases.map((testCase, index) => (
    //       <div key={index} className="bg-gray-100 rounded-md p-4 my-2">
    //         <h4 className="font-medium">Test Case {index + 1}:</h4>
    //         <p><strong>Input:</strong> {testCase.input}</p>
    //         <p><strong>Expected Output:</strong> {testCase.expectedOutput}</p>
    //         <p><strong>Sample:</strong> {testCase.isSample ? 'Yes' : 'No'}</p>
    //         <p><strong>Weight:</strong> {testCase.weight}</p>
    //       </div>
    //     ))}
    //   </div>}

    //   {problem.examples && problem.examples.length > 0 && 
    //   <div className="mt-4">
    //     <h3 className="text-lg font-semibold">Examples:</h3>
    //     {problem.examples.map((example, index) => (
    //       <div key={index} className="bg-gray-100 rounded-md p-4 my-2">
    //         <h4 className="font-medium">Example {index + 1}:</h4>
    //         <p><strong>Input:</strong> {example.input}</p>
    //         <p><strong>Expected Output:</strong> {example.output}</p>
    //         <p><strong>Explanation:</strong> {example.explanation}</p>
    //       </div>
    //     ))}
    //   </div>}

    //   <div className="mt-4">
    //     <p><strong>Grade:</strong> {problem.grade}</p>
    //   </div>

    // </div>
  );
};

export default ViewProblem;
