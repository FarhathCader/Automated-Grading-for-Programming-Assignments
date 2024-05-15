import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeEditor from '../../Components/CodeEditor';
import CodingEditor from '../../Components/CodingEditor';
import { CODE_SNIPPETS } from '../../constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const AddProblem = () => {
  const [formData, setFormData] = useState({
    name: '',
    difficulty: '',
    category: '',
    description: '',
    initialCode: [
      { language: "javascript", code: CODE_SNIPPETS['javascript'] },
      { language: "python", code: CODE_SNIPPETS['python'] },
      { language: "java", code: CODE_SNIPPETS['java'] },
      { language: "cpp", code: CODE_SNIPPETS['cpp'] },
      { language: "c", code: CODE_SNIPPETS['c'] },
      { language: "csharp", code: CODE_SNIPPETS['csharp'] },
    ],
    testCases: [],
    grade: 0,
    examples: []
  });
  const { id } = useParams();
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleExampleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExamples = [...formData.examples];
    updatedExamples[index][name] = value;
    setFormData({
      ...formData,
      examples: updatedExamples
    });
  };



  const addExample = () => {
    setFormData({
      ...formData,
      examples: [...formData.examples, { input: '', output: '', explanation: '' }]
    });
  };

  const removeExample = (index) => {
    const updatedExamples = [...formData.examples];
    updatedExamples.splice(index, 1);
    setFormData({
      ...formData,
      examples: updatedExamples
    });
  };

  

  const handleTestCaseChange = (e, index, field) => {
    const { value } = e.target;
    const updatedTestCases = [...formData.testCases];
    updatedTestCases[index][field] = value;
    console.log(updatedTestCases[index])
    setFormData({
      ...formData,
      testCases: updatedTestCases
    });
  };
  
  const handleCheckboxChange = (e, index) => {
    const { checked } = e.target;
    const updatedTestCases = [...formData.testCases];
    updatedTestCases[index].isSample = checked;
    setFormData({
      ...formData,
      testCases: updatedTestCases
    });
  };
  
  const addTestCase = () => {
    console.log("add test case")
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', expectedOutput: '', isSample: false, weight: 0 }]
    });
  };
  
  const removeTestCase = (index) => {
    const updatedTestCases = [...formData.testCases];
    updatedTestCases.splice(index, 1);
    setFormData({
      ...formData,
      testCases: updatedTestCases
    });
  };
  

  useEffect(() => {
    if (id) {
      fetchProblemDetails(id);
    }
  }, [id]);

  const fetchProblemDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/problems/${id}`);
      const problem = response.data.problem;
      setFormData({
        name: problem.name,
        difficulty: problem.difficulty,
        category: problem.category,
        description: problem.description,
        initialCode: problem.initialCode,
        testCases: problem.testCases,
        grade: problem.grade,
        examples: problem.examples || [] // Ensure examples exist before setting
      });
    } catch (error) {
      console.error('Error fetching problem details:', error);
    }
  };
    useEffect(() => {
    
    if(localStorage.getItem('codes')){
      setFormData({...formData, initialCode :JSON.parse(localStorage.getItem('codes'))});

    }
  }, []);

  
  const updateInitialCode = (newInitialCode) => {
    setFormData({
      ...formData,
      initialCode: newInitialCode
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation code here...
        if(!formData.name){
      toast.error('Name is required');
      return;
    }
    if(!formData.difficulty){
      toast.error('Difficulty is required');
      return;
    }
    if(!formData.category){
      toast.error('Category is required');
      return;
    }
    if(!formData.description){
      toast.error('Description is required');
      return;
    }
    if(!formData.grade){
      toast.error('Grade is required');
      return;
    }
    const invalidTestCase = formData.testCases.find(testCase => testCase.weight <= 0);
    if (invalidTestCase) {
      toast.error('Test case weight must be greater than zero');
      return;
    }

    const url = id ? `http://localhost:4000/api/problems/${id}` : 'http://localhost:4000/api/problems';
    const method = id ? 'PUT' : 'POST';

    try {
      await axios({
        method: method,
        url: url,
        data: formData,
      });
      toast.success(`${id ? 'Problem updated' : 'Problem added'} successfully!`);
      localStorage.clear();
      navigate('/qbank');
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error ${id ? 'updating' : 'adding'} problem. Please try again.`);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Problem' : 'Add Problem'}</h2>
      <form className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Difficulty:</label>
          <input type="text" name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full h-40 px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">Initial Code:</label>
          <CodingEditor onUpdateInitialCode={updateInitialCode} initialCode={formData.initialCode} showOutput={false} />
        </div>
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">Test Cases:</h3>
          {formData.testCases.map((testCase, index) => (
          <div key={index} className="bg-gray-100 rounded-md p-4 space-y-4 mb-5">
          <label className="block mb-1 text-sm font-medium text-gray-700">Test Case {index + 1}:</label>
          <div className="space-y-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Input:</label>
            <textarea
              type="text"
              name="input"
              value={testCase.input}
              onChange={(e) => handleTestCaseChange(e, index, 'input')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Expected Output:</label>
            <textarea
              type="text"
              name={`expectedoutput`}
              value={testCase.expectedOutput}
              onChange={(e) => handleTestCaseChange(e, index, 'expectedOutput')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="inline-flex items-center">
            <input
              type="checkbox"
              name={`isSample`}
              checked={testCase.isSample}
              onChange={(e) => handleCheckboxChange(e, index)}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Sample</span>
          </div>
          <div className="space-y-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Weight:</label>
            <input
              type="number"
              name={`weight`}
              value={testCase.weight}
              onChange={(e) => handleTestCaseChange(e, index, 'weight')}
              placeholder="Weight"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button className='mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600' type="button" onClick={() => removeTestCase(index)}>Remove Testcase</button>
        </div>
          ))}
          <button type="button" onClick={addTestCase} className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Add New Testcase</button>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Grade:</label>
          <input type="number" name="grade" value={formData.grade} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">Examples:</h3>
          {formData.examples.map((example, index) => (
              <div key={index} className="bg-gray-100 rounded-md p-4 space-y-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Example {index + 1}:</label>
              <div className="space-y-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">Input:</label>
                <textarea
                  type="text"
                  name={`input`}
                  value={example.input}
                  onChange={(e) => handleExampleChange(e, index)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">Expected Output:</label>
                <textarea
                  type="text"
                  name={`output`}
                  value={example.output}
                  onChange={(e) => handleExampleChange(e, index)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">Explanation:</label>
                <textarea
                  type="text"
                  name={`explanation`}
                  value={example.explanation}
                  onChange={(e) => handleExampleChange(e, index)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button type="button" className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={() => removeExample(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addExample} className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Add Example</button>
        </div>
        <div className="col-span-2">
          <button type="submit" className="w-full bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600">
            {id ? 'Update Problem' : 'Add Problem'}
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
  
};

export default AddProblem;
