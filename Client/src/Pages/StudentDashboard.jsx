import React from 'react'
//import { Link } from 'react-router-dom'
import Sidebar from '../Sections/Sidebar'
import Feed from '../Sections/Feed'

export default function StudentDashboard() {
  console.log("hello");
  return (
   
    <main className='w-full h-screen flex justify-between items-start'>
      <Sidebar/>
      <Feed/>
    </main>
  )
}
