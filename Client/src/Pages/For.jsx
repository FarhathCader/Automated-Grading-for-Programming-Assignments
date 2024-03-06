import React, { useState } from 'react'

export default function For() {

    const [email,setEmail] = useState('')
    const handleForgot = async(e)=>{

        e.preventDefault();        
        const response = await fetch('http://localhost:4000/api/user/forgot', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email})
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
      Forgot Password
      <form action="" onSubmit={handleForgot}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
        <button>Send</button>
      </form>
    </div>
  )
}
