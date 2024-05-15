import React, { useEffect, useState } from 'react';
import { executeCode } from '../api';
import { useContext } from 'react';
import TestCaseContext from '../Contexts/TestCaseContext';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Output(props) {
  const { sampleTestCases,allTestCases } = useContext(TestCaseContext);
  const { value, language, problem } = props;
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);
  const [passedWeight, setPassedWeight] = useState(0);
  const [problemGrade, setProblemGrade] = useState(0);

  // Calculate final grade based on passed percentage and problem grade
  const finalGrade = (passedPercentage, problemGrade) => {
    return (passedPercentage / 100) * problemGrade;
  };

  const runCodeWithInterval = async (input, expectedOutput, weight, index) => {
    console.log("input,",input)
    setTimeout(async () => {
      const sourceCode = value;
      if (!sourceCode) return;
      try {
        setIsLoading(true);
        const response = await executeCode(sourceCode, language, input);
        let output = response.run.output;
        console.log(output)
        console.log(response)
        if (output.endsWith('\n')) {
            output = output.slice(0, -1);
        }
        

        const result = expectedOutput === output ? '✅' : '❌';
        setResults(prevResults => [
          ...prevResults,
          { input, expectedOutput, output, result, weight }
        ]);
        setDisplay(true);
        if (result === '✅') {
          setPassedWeight(prevPassedWeight => prevPassedWeight + weight);
        }
      } catch (error) {
       
        setResults(prevResults => [
          ...prevResults,
          { input, expectedOutput, output: error.message, error: true, weight }
        ]);
        setDisplay(true);
      } finally {
        setIsLoading(false);
      }
    }, index * 1000);
  };

  const runAllCodeWithInterval = () => {
    setIsRunning(true);
    setResults([]);
    let totalWeight = 0;
    sampleTestCases.forEach((testCase, index) => {
      totalWeight += testCase.weight;
      runCodeWithInterval(testCase.input, testCase.expectedOutput, testCase.weight, index);
    });
    setTotalWeight(totalWeight);
    setPassedWeight(0); // Reset passed weight
    setTimeout(() => {
      setIsRunning(false);
    }, sampleTestCases.length * 1000);
  };

  const submitCodeWithInterval = async (input, expectedOutput, weight, index) => {
    setTimeout(async () => {
      const sourceCode = value;
      if (!sourceCode) return;
      try {
        setIsLoading(true);
        const response = await executeCode(sourceCode, language, input);
        let output = response.run.output;
        if (output.endsWith('\n')) {
            output = output.slice(0, -1);
        }
        
        const result = expectedOutput === output ? '✅' : '❌';
        setResults(prevResults => [
          ...prevResults,
          { input, expectedOutput, output, result, weight }
        ]);
        setDisplay(true);
        if (result === '✅') {
          setPassedWeight(prevPassedWeight => prevPassedWeight + weight);
        }
      } catch (error) {
        setResults(prevResults => [
          ...prevResults,
          { input, expectedOutput, output: error.response.data.message, error: true, weight }
        ]);
        setDisplay(true);
      } finally {
        setIsLoading(false);
      }
    }, index * 1000);
  };

  const submitAllCodeWithInterval = () => {
    setIsRunning(true);
    setResults([]);
    let totalWeight = 0;
    allTestCases.forEach((testCase, index) => {
      totalWeight += testCase.weight;
      submitCodeWithInterval(testCase.input, testCase.expectedOutput, testCase.weight, index);
    });
    setTotalWeight(totalWeight);
    setPassedWeight(0); // Reset passed weight
    setTimeout(() => {
      setIsRunning(false);
    }, sampleTestCases.length * 1000);
  };

//   const handleSubmit = () => {
//     setDisplay(false);
//   };

  useEffect(() => {
    setResults([]);
    setPassedWeight(0);
    setTotalWeight(0);
    setProblemGrade(problem.grade); // Update problem grade
  }, [value, language, problem.grade]);

  const passedPercentage = totalWeight ? (passedWeight / totalWeight) * 100 : 0;
  const finalProblemGrade = finalGrade(passedPercentage, problemGrade);
  const user  = useSelector(state => state.user);
// Add an onClick handler to the submit button to send submission details to the backend
const handleSubmit = async () => {
    console.log('Submitting...');
    try {
      // Send submission details to the backend
      await submitAllCodeWithInterval();
      const response = await fetch('http://localhost:4000/api/submission/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemId: problem._id, // Assuming problem object contains _id
          code: value,
          language: language,
          grade: finalProblemGrade,
          userId: user._id, // Assuming user object contains _id

        }),
      });
      const data = await response.json();
   
      toast.success('Submission saved successfully!');
    } catch (error) {
      console.error('Error saving submission:', error);
    }
  };
  

  
  return (
    <div className='flex flex-col space-y-4'>
    <div className='flex justify-between items-center'>
      <button className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600' type='button' onClick={runAllCodeWithInterval} disabled={isRunning}>
        {isRunning ? 'Running...' : 'RUN'}
      </button>
      <button className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600' type='button' onClick={handleSubmit}>
        SUBMIT
      </button>
    </div>
    {isLoading && <p className='text-gray-700'>Running...</p>}
    {display && (
      <div className='bg-gray-100 rounded-md p-4'>
        {results.map((result, index) => (
          <div key={index} className='mb-4'>
        <p className='text-gray-700'><span className='font-semibold'>Input:</span><pre className="whitespace-pre-wrap">{result.input}</pre></p>
<p className='text-gray-700'><span className='font-semibold'>Expected Output:</span><pre className="whitespace-pre-wrap">{result.expectedOutput}</pre></p>
<p className='text-gray-700'><span className='font-semibold'>Output:</span><pre className="whitespace-pre-wrap">{result.output}</pre></p>

            {result.error && <p className='text-red-600'><span className='font-semibold'>Error:</span> {result.output}</p>}
            {result.result && <p className='text-green-600'><span className='font-semibold'>Result:</span> {result.result}</p>}
            <hr className='my-2 border-gray-400' />
          </div>
        ))}
        {!isRunning && display && <p className='text-gray-700'>Passed Percentage: {passedPercentage}%</p>}
        {!isRunning && display && <p className='text-gray-700'>Final Grade: {finalProblemGrade}</p>}
      </div>
    )}
    <ToastContainer/>
  </div>
  
  );
}
