import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
export default function Sample() {

  const [students, setStudents] = useState([]);

  const fetchEnrolledStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/enrollment/6644b2d66eefd0203275ae84`);
      setStudents(response.data.enrolledStudents);
      console.log(response);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchEnrolledStudents();
  }
    , []);


  return (
    <div>
   

   Hello Sample
    <ul>
        {students.map(student => (
          <li key={student._id}>{student.username}</li>
        ))}
      </ul>
       
    </div>
  )
}
