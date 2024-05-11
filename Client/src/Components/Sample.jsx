import React, { useState } from 'react'
import { runCode } from '../api'

export default function Sample() {

    const [code,setCode] = useState("hello")

    const handleChange = (e) => {
        setCode(e.target.value)
    }

    const handleSubmit = () => {
        console.log("Submitted")
    }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h4 className="text-lg font-semibold mb-4">Code Editor</h4>
      <textarea
        className="w-full h-40 resize-none border border-gray-300 rounded-md p-2"
        value={code}
        onChange={handleChange}
        placeholder="Write your code here..."
      ></textarea>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleSubmit}
        >
          Submit Code
        </button>
      </div>
    </div>
  )
}
