import React from 'react'
import { useNavigate } from 'react-router-dom'
const FrontSignup = () => {

  const navigate = useNavigate();
  const lecturerSignup = ()=>{

    navigate('/lecturer')
  }

  const studentSignup = ()=>{

    navigate('/student')
  }

  return (
    <div>
      <div className='bg-gray-200 w-full min-h-screen flex items-center justify-center'>
        
      <div className='w-100 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center'>
        <h1 className="text-3xl font-bold text-violet-700 mb-4">SignUp As</h1>
        <div className="mb-6 flex  items-center justify-center space-x-5">
         
          <button  onClick={studentSignup} className="w-40 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            Student
          </button>
          <button onClick={lecturerSignup} className="w-40 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            Lecturer
          </button>
        </div>
        <p className="text-gray-600">
          Crafting Futures with <b className='text-violet-700'>Z-Code</b>: Empowering Minds, Fueling
          Innovations.
        </p>
      </div>
    </div>
    </div>
  )
}

export default FrontSignup