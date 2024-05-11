import React from 'react'
import { useParams } from 'react-router-dom'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import CodingEditor from './CodingEditor';
import TestCaseContext from '../Contexts/TestCaseContext';

export default function CodeEditor() {

    const {id} = useParams();
    const [problem,setProblem] = useState({});
    const [sampleTestCases,setSampleTestCases] = useState([]);
    const [allTestCases,setAllTestCases] = useState([]);
   
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/problems/${id}`);
          const data = response.data;
          setProblem(data.problem);
          // Filter sample test cases and store them in sampleTestCases state
          if (data.problem.testCases) {
            const sampleCases = data.problem.testCases.filter(testCase => testCase.isSample);
            setSampleTestCases(sampleCases);
            setAllTestCases(data.problem.testCases);
          }
        } catch (error) {
          console.error('Error fetching problem details:', error);
        }
      };
      fetchData();
    }, [id]);

    const updateInitialCode = (newInitialCode) => {
      setProblem({ ...problem, initialCode: newInitialCode });
    };


    return (
        <div className='mx-auto px-4 py-8 flex flex-col justify-center items-start space-x-4'>
         <div className="w-full bg-gray-50 rounded-lg shadow-md p-6">
  <h3 className="text-lg font-semibold mb-4 text-center">{problem.name}</h3>
  <div className="flex justify-between">
    <div>
      <p className="text-sm text-gray-600">Category: {problem.category}</p>
    </div>
    <div>
      <p className="text-sm text-gray-600">Difficulty: {problem.difficulty}</p>
    </div>
  </div>
  <div className="mt-4">
  <p className="text-gray-700 font-bold">Problem Description</p>
    <p className="text-gray-700">{problem.description}</p>
    {problem.explanation && (
      <div className="mt-4">
        <p className="text-gray-800 font-semibold">Explanation:</p>
        <p className="text-gray-700">{problem.explanation}</p>
      </div>
    )}
    {problem.examples && problem.examples.length > 0 && (
      <div className="mt-4">
        <p className="text-gray-800 font-semibold">Examples:</p>
        <ul className="list-disc list-inside">
          {problem.examples.map((example, index) => (
            <li key={index} className="mb-2 text-gray-700">
              <strong>Input:</strong> {example.input}<br />
              <strong>Output:</strong> {example.output}<br />
              <strong>Explanation:</strong> {example.explanation}
            </li>
          ))}
        </ul>
      </div>
    )}
    {sampleTestCases && sampleTestCases.length > 0 && (
      <div className="mt-4">
        <p className="text-gray-800 font-semibold">Sample Test Cases:</p>
        <ul className="list-disc list-inside">
          {sampleTestCases.map((testCase, index) => (
            <li key={index} className="mb-2 text-gray-700">
              <strong>Input:</strong> {testCase.input}<br />
              <strong>Output:</strong> {testCase.expectedOutput}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>

          <div className='w-full'>
            {problem && (
              <TestCaseContext.Provider value={{ sampleTestCases, allTestCases }}>
                <CodingEditor
                  initialCode={problem.initialCode}
                  onUpdateInitialCode={updateInitialCode}
                  showOutput={true}
                  problem={problem}
                />
              </TestCaseContext.Provider>
            )}
          </div>
        </div>
      );
}
