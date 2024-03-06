import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export default function Res() {
    const [password,setPassword] = useState()
    const navigate = useNavigate()
    const {token} = useParams()


    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log("passed",token)
        const response = await fetch(`http://localhost:4000/api/user/reset/${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password})
          });
          const json = await response.json();

          if(response.ok){
            console.log(json.msg)
          }
          else{
            console.log(json.error);
          }
        
    }

  return (
    <div>
      <h1>Reset password</h1>
      <form  onSubmit={handleSubmit}>
        <label htmlFor='password'>
        New  Password
        </label>
        <input id='password' type="password"  onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  )
}
