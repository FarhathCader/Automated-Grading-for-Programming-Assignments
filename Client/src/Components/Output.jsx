import React, { useEffect, useState, useContext } from 'react';
import { executeCode } from '../api';
import TestCaseContext from '../Contexts/TestCaseContext';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import SyncLoader from 'react-spinners/SyncLoader';
import { CSSProperties } from "react";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Output(props) {
  const { sampleTestCases, allTestCases } = useContext(TestCaseContext);
  const { value, language, problem } = props;
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);
  const [passedWeight, setPassedWeight] = useState(0);
  const [problemGrade, setProblemGrade] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passedPercentage, setPassedPercentage] = useState(0);
  const [finalProblemGrade, setFinalProblemGrade] = useState(0);
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const user = useSelector(state => state.user);

  const finalGrade = (pass, grade) => {
    return (pass / 100) * grade;
  };

  // const runCodeWithInterval = async (input, expectedOutput, weight, index) => {
  //   console.log("input,", input)
  //   setTimeout(async () => {
  //     const sourceCode = value;
  //     if (!sourceCode) return;
  //     try {
  //       setIsLoading(true);
  //       const response = await executeCode(sourceCode, language, input);
  //       let output = response.run.output;
  //       console.log(output)
  //       console.log(response)
  //       if (output.endsWith('\n')) {
  //         output = output.slice(0, -1);
  //       }

  //       const result = expectedOutput === output ? '✅' : '❌';
  //       setResults(prevResults => [
  //         ...prevResults,
  //         { input, expectedOutput, output, result, weight }
  //       ]);
  //       setDisplay(true);
  //       if (result === '✅') {
  //         setPassedWeight(prevPassedWeight => prevPassedWeight + weight);
  //       }
  //     } catch (error) {
  //       setResults(prevResults => [
  //         ...prevResults,
  //         { input, expectedOutput, output: error.message, error: true, weight }
  //       ]);
  //       setDisplay(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, index * 1000);
  // };

  // const runAllCodeWithInterval = () => {
  //   setIsRunning(true);
  //   setResults([]);
  //   let totalWeight = 0;
  //   sampleTestCases.forEach((testCase, index) => {
  //     totalWeight += testCase.weight;
  //     runCodeWithInterval(testCase.input, testCase.expectedOutput, testCase.weight, index);
  //   });
  //   setTotalWeight(totalWeight);
  //   setPassedWeight(0); // Reset passed weight
  //   setTimeout(() => {
  //     setIsRunning(false);
  //   }, sampleTestCases.length * 1000);
  // };

  useEffect(() => {
    setResults([]);
    setDisplay(false);
    setProblemGrade(problem.grade); // Update problem grade
  }, [value, language, problem.grade]);

  useEffect(() => {
    grading();
  }, [totalWeight, passedWeight]);

  useEffect(() => {
    if (shouldSubmit) {
      console.log("sending submission");
      sendSubmission(grading());
      setShouldSubmit(false);

    }
  }, [shouldSubmit,finalProblemGrade]);


  const grading = () => {
    const passedPercentage_ = totalWeight ? (passedWeight / totalWeight) * 100 : 0;
    const finalProblemGrade_ = finalGrade(passedPercentage_, problemGrade);
    setPassedPercentage(passedPercentage_);
    setFinalProblemGrade(finalProblemGrade_);
    return finalProblemGrade_;
  };

  const submitCodeWithInterval = async (input, expectedOutput, weight, index) => {
    const sourceCode = value;
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const response = await executeCode(sourceCode, language, input);
      console.log("got the response for testcase", index + 1);
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
        console.log("setting weight", weight, passedWeight);
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
  };
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const runAllCodeWithInterval = async () => {
    console.log("All code running started");
    setIsRunning(true);
    setPassedWeight(0);
    setTotalWeight(0);
    setResults([]);
    try {
      for (let index = 0; index < sampleTestCases.length; index++) {
        const testCase = sampleTestCases[index];
        setTotalWeight(prev => prev + testCase.weight);
        await submitCodeWithInterval(testCase.input, testCase.expectedOutput, testCase.weight, index);
        await delay(400); // Adding a delay of 200ms between each request
      }
    } catch (err) {
      toast.error('Error running code:');
    } finally {
      setIsRunning(false);
      console.log("All code running finished");
    }
  };

  const submitAllCodeWithInterval = async () => {
    console.log("All code submission started");
    setIsRunning(true);
    setPassedWeight(0);
    setTotalWeight(0);
    setResults([]);
    try {
      for (let index = 0; index < allTestCases.length; index++) {
        const testCase = allTestCases[index];
        setTotalWeight(prev => prev + testCase.weight);
        await submitCodeWithInterval(testCase.input, testCase.expectedOutput, testCase.weight, index);
        await delay(400); // Adding a delay of 200ms between each request
      }
    } catch (err) {
      toast.error('Error running code:');
    } finally {
      setIsRunning(false);
      console.log("All code submission finished");
    }
  };
  
  const sendSubmission = async (grade) => {
    console.log("sending submission with",passedWeight,totalWeight,grade);
    try {
      const response = await fetch('http://localhost:4000/api/submission/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemId: problem._id, // Assuming problem object contains _id
          code: value,
          language: language,
          grade,
          userId: user._id, // Assuming user object contains _id
        }),
      });
      const data = await response.json();
    } catch (error) {
      toast.error('Error saving submission:');
    } finally {
      setIsSubmitting(false);
      toast.success('Submission saved successfully!');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitAllCodeWithInterval();
      setShouldSubmit(true);
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
        <button className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600' type='button' onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'SUBMIT'}
        </button>
        <h1>{totalWeight}</h1>
        <h1>{passedWeight}</h1>
      </div>
      {isLoading && <p className='text-gray-700'>Running...</p>}
      {display && (
        <div className='bg-gray-100 rounded-md p-4'>
          {results.map((result, index) => (
            <div key={index} className='mb-4'>
              <pre className='text-gray-700'><span className='font-semibold'>Input:</span><pre className="whitespace-pre-wrap">{result.input}</pre></pre>
              <pre className='text-gray-700'><span className='font-semibold'>Expected Output:</span><pre className="whitespace-pre-wrap">{result.expectedOutput}</pre></pre>
              <pre className='text-gray-700'><span className='font-semibold'>Output:</span><pre className="whitespace-pre-wrap">{result.output}</pre></pre>

              {result.error && <p className='text-red-600'><span className='font-semibold'>Error:</span> {result.output}</p>}
              {result.result && <p className='text-green-600'><span className='font-semibold'>Result:</span> {result.result}</p>}
              <hr className='my-2 border-gray-400' />
            </div>
          ))}
          {!isRunning && display && <p className='text-gray-700'>Passed Percentage: {passedPercentage}%</p>}
          {!isRunning && display && <p className='text-gray-700'>Final Grade: {finalProblemGrade}</p>}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={200} />
      {isSubmitting && <div className="fixed inset-0 bg-black opacity-80 flex justify-center items-center">
        <SyncLoader color="green" loading={true} size={20} cssOverride={override} />
      </div>}
    </div>
  );
}
