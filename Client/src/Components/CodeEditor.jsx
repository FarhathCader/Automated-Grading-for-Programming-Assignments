import React from 'react'
import { useParams } from 'react-router-dom'
import { useState ,useEffect} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import CodingEditor from './CodingEditor';
import axios from 'axios';
import TestCaseContext from '../Contexts/TestCaseContext';

export default function CodeEditor() {

    const {id} = useParams();
    const [problem,setProblem] = useState({});
    const [sampleTestCases,setSampleTestCases] = useState([]);
    const [allTestCases,setAllTestCases] = useState([]);
   
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/problems/${id}`);
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
        <div className='container mx-auto px-4 py-8 flex justify-center items-start space-x-4'>
          <div className='w-1/2 border rounded-md p-4'>
            <div>
              <p className='mb-2'>Category: {problem.category}</p>
              <p className='mb-2'>Difficulty: {problem.difficulty}</p>
            </div>
            <h3 className='text-xl font-bold mb-4'>Name: {problem.name}</h3>
            <div>
              <p className='mb-4'>Description: {problem.description}</p>
              <p className='mb-2 font-semibold'>Examples:</p>
              <ul>
                {problem.examples &&
                  problem.examples.map((example, index) => (
                    <li key={index} className='mb-2'>
                      <strong>Input:</strong> {example.input}<br />
                      <strong>Output:</strong> {example.output}<br />
                      <strong>Explanation:</strong> {example.explanation}
                    </li>
                  ))}
              </ul>
              <p className='mt-4 font-semibold'>Sample Test Cases:</p>
              <ul>
                {sampleTestCases &&
                  sampleTestCases.map((testCase, index) => (
                    <li key={index} className='mb-2'>
                      <strong>Input:</strong> {testCase.input}<br />
                      <strong>Output:</strong> {testCase.expectedOutput}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className='w-1/2'>
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
