import React, { useEffect, useState, useContext } from 'react';
import { executeCode } from '../api';
import TestCaseContext from '../Contexts/TestCaseContext';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SyncLoader from 'react-spinners/SyncLoader';
import axios from 'axios';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Output(props) {
  const { sampleTestCases, allTestCases } = useContext(TestCaseContext);
  const { value, language, problem,contestId } = props;
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
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [createdTime, setCreatedTime] = useState(0);
  const [contestDuration, setContestDuration] = useState(0);

  const user = useSelector(state => state.user);


  const fetchCreatedTime = async () => {
    try {
      if (user._id === undefined || contestId === undefined) return;
      const res = await axios.get(`http://localhost:4000/api/enrollment/time/${user._id}/${contestId}`);
      const data = res.data.createdAt;
      console.log("created time", data);
      if (data) setCreatedTime(data);
    } catch (err) {
      console.log("Error fetching enrollment:", err.message);
    }
  }

  const fetchContestDuration = async () => {
    try {
      if (contestId === undefined) return;
      const res = await axios.get(`http://localhost:4000/api/contest/${contestId}`);
      const data = res.data.contest.duration;
      console.log("contest duration", data);
      if (data) setContestDuration(data);
    } catch (err) {
      console.log("Error fetching contest duration:", err.message);
    }
  }

  useEffect(() => {
    fetchCreatedTime();
    if(user && contestId){

    }
  }, [user, contestId]);

  useEffect(() => {
    if(contestId){
      fetchContestDuration();
    }
  }, [contestId]);




  const finalGrade = (pass, grade) => {
    return (pass / 100) * grade;
  };

  useEffect(() => {
    setResults([]);
    setDisplay(false);
    setProblemGrade(problem.grade); 
  }, [value, language, problem.grade]);

  useEffect(() => {
    grading();
  }, [totalWeight, passedWeight]);

  useEffect(() => {
    if (shouldSubmit) {
      console.log("sending submission");
      const testCases = allTestCases.map(testCase => ({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        weight: testCase.weight
      }));
      const status = grading() === problem.grade;
      sendSubmission(grading(), testCases, results,status);
      setShouldSubmit(false);
    }
  }, [shouldSubmit, finalProblemGrade, results]);

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
  const sendSubmission = async (grade, testCases, results,status) => {
    console.log("sending submission with", passedWeight, totalWeight, grade,status);
    try {

      const response = await axios.post('http://localhost:4000/api/submission/', {
        problemId: problem._id, // Assuming problem object contains _id
        code: value,
        language: language,
        grade: parseFloat(grade).toFixed(2),
        userId: user._id, // Assuming user object contains _id
        status,
        submittedAt: new Date(),
        testCases: testCases,
        results: results,
        contestId:contestId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;
      console.log('Submission saved successfully:', data);
      toast.success('Submission saved successfully!');
    } catch (error) {
      toast.error('Error saving submission:');
      console.log('Error saving submission:', error)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    const currentTime = new Date().getTime();
    const contestEndTime = new Date(createdTime).getTime() + contestDuration * 60 * 1000;

    if (currentTime > contestEndTime) {
      toast.error('Contest duration has ended. Cannot submit.');
      return;
    }
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
      <div className='flex justify-between items-center space-x-4'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600'
          type='button'
          onClick={runAllCodeWithInterval}
          disabled={isRunning}>
          {isRunning ? 'Running...' : 'RUN'}
        </button>
        <button
          className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600'
          type='button'
          onClick={handleSubmit}
          disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'SUBMIT'}
        </button>
      </div>
      {isLoading && <p className='text-gray-700'>Running...</p>}
      {display && (
        <div className='bg-gray-100 rounded-md p-4 max-h-80 overflow-y-auto'>
          {results.map((result, index) => (
            <div key={index} className='mb-4'>
              <div className='mb-2'>
                <span className='font-semibold text-gray-700'>Input:</span>
                <pre className="whitespace-pre-wrap">{result.input}</pre>
              </div>
              <div className='mb-2'>
                <span className='font-semibold text-gray-700'>Expected Output:</span>
                <pre className="whitespace-pre-wrap">{result.expectedOutput}</pre>
              </div>
              <div className='mb-2'>
                <span className='font-semibold text-gray-700'>Output:</span>
                <pre className="whitespace-pre-wrap">{result.output}</pre>
              </div>

              {result.error && (
                <p className='text-red-600'>
                  <span className='font-semibold'>Error:</span> {result.output}
                </p>
              )}
              {result.result && (
                <p className='text-green-600'>
                  <span className='font-semibold'>Result:</span> {result.result}
                </p>
              )}
              <hr className='my-2 border-gray-400' />
            </div>
          ))}
          {!isRunning && display && (
            <>
              <p className='text-gray-700'>Passed Percentage: {parseFloat(passedPercentage).toFixed(2)}%</p>
              <p className='text-gray-700'>Final Grade: {parseFloat(finalProblemGrade).toFixed(2)}</p>
            </>
          )}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={1000} />
      {isSubmitting && (
        <div className="fixed inset-0 bg-black opacity-80 flex justify-center items-center">
          <SyncLoader color="green" loading={true} size={20} css={override} />
        </div>
      )}
    </div>
  );
}
