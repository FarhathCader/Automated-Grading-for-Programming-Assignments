import React, { useEffect, useState } from 'react';
import { executeCode } from '../api';
import { useContext } from 'react';
import TestCaseContext from '../Contexts/TestCaseContext';

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
    setTimeout(async () => {
      const sourceCode = value;
      if (!sourceCode) return;
      try {
        setIsLoading(true);
        const response = await executeCode(sourceCode, language, input);
        const output = response.run.output;
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
        const output = response.run.output;
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
// Add an onClick handler to the submit button to send submission details to the backend
const handleSubmit = async () => {
    console.log('Submitting...');
    try {
      // Send submission details to the backend
      await submitAllCodeWithInterval();
      const response = await fetch('http://localhost:4000/submissions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemId: problem._id, // Assuming problem object contains _id
          code: value,
          language: language,
          grade: finalProblemGrade,
        }),
      });
      const data = await response.json();
      console.log('Submission saved:', data.submission);
    } catch (error) {
      console.error('Error saving submission:', error);
    }
  };
  

  
  return (
    <div className='code-output'>
      <div className='output-btn'>
        <button type='button' onClick={runAllCodeWithInterval} disabled={isRunning}>
          {isRunning ? 'Running...' : 'RUN'}
        </button>
        <button type='button' onClick={handleSubmit}>SUBMIT</button>
      </div>
      {isLoading && <p>Running...</p>}
      {display && (
        <div className='result'>
          {results.map((result, index) => (
            <div key={index} className='test-case-result'>
              <p>Input: {result.input}</p>
              <p>Expected Output: {result.expectedOutput}</p>
              <p>Output: {result.output}</p>
              {result.error && <p>Error: {result.output}</p>}
              {result.result && <p>Result: {result.result}</p>}
              <hr />
            </div>
          ))}
        </div>
      )}
      {!isRunning && display && <p>Passed Percentage: {passedPercentage}%</p>}
      {!isRunning && display && <p>Final Grade: {finalProblemGrade}</p>}
    </div>
  );
}
