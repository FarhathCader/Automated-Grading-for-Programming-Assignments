import React from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import CodingEditor from './CodingEditor';
import TestCaseContext from '../Contexts/TestCaseContext';
import NavbarSubmission from './NavbarSubmission';
import { useSelector } from 'react-redux';
import SubmissionResult from './SubmissionResult';
import MoonLoader from 'react-spinners/MoonLoader';
import { backendUrl } from '../../config';
import BackButton from './BackButton';
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function CodeEditor() {

  const { contestId, problemId } = useParams();
    const [problem,setProblem] = useState({});
    const [sampleTestCases,setSampleTestCases] = useState([]);
    const [allTestCases,setAllTestCases] = useState([]);
    const [viewSubmission, setViewSubmission] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    
    useEffect(() => {

      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${backendUrl}/api/problems/${problemId}`);
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
        finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [problemId]);

    useEffect(() => {
      console.log("user problem contest",user._id,problemId,contestId)
    },[user._id,problemId,contestId]);

    const updateInitialCode = (newInitialCode) => {
      setProblem({ ...problem, initialCode: newInitialCode });
    };

    const handleNavigation = (p) => {
      if(p === 'submission') {
        setViewSubmission(true);
      }
      else {
        setViewSubmission(false);
      }
    };


    return (
        <div className='mx-auto px-4 py-8 flex flex-col justify-center items-start space-x-4'>
          <BackButton/>
            <div className="w-full"> {/* Added w-full class to make the Navbar take full width */}
    <NavbarSubmission handleNavigation = {handleNavigation} viewSubmission=  {viewSubmission}/>
  </div>
       {viewSubmission ? (
      <div className="w-full"> {/* Ensure full width when viewing submission */}
      <SubmissionResult userId={user._id} problemId={problemId} contestId={contestId}/>
    </div>
       ):  <div className="w-full bg-gray-50 rounded-lg shadow-md p-6 my-6">
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
    <strong>Input:</strong><pre className="whitespace-pre-wrap">{example.input}</pre>
    <strong>Output:</strong><pre className="whitespace-pre-wrap">{example.output}</pre>
    <strong>Explanation:</strong><pre className="whitespace-pre-wrap">{example.explanation}</pre>
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
           <strong>Input:</strong><pre className="whitespace-pre-wrap">{testCase.input}</pre>
           <strong>Output:</strong><pre className="whitespace-pre-wrap">{testCase.expectedOutput}</pre>
         </li>
         
          ))}
        </ul>
      </div>
    )}
  </div>
</div>
}
        {!viewSubmission && <div className='w-full'>
            {problem && (
              <TestCaseContext.Provider value={{ sampleTestCases, allTestCases }}>
                <CodingEditor
                  initialCode={problem.initialCode}
                  onUpdateInitialCode={updateInitialCode}
                  showOutput={true}
                  problem={problem}
                  contestId={contestId}
                />
              </TestCaseContext.Provider>
            )}
          </div>
          
          }
             {loading && (
        <div className="fixed inset-0 bg-black opacity-80 flex justify-center items-center">
          <MoonLoader color="blue" loading={true} size={220} css={override} />
        </div>
      )}
        </div>
      );
}
