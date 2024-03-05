import React, { useEffect,useState } from 'react'

export default function Sample() {

    const [samples, setSamples] = useState([]);

    useEffect(()=>{
        const fetchSamples = async () => {
            const response = await fetch('http://localhost:4000/api/sample');
            const data = await response.json();
            if(response.ok){
                setSamples(data.samples);
            }

        }
        fetchSamples();
    },[])

  return (
    <div>

        <table>
          
            <tr>
                <th>Name</th>
                <th>Age</th>
            </tr>

           
            {samples && samples.map(sample => (
          <tr key={sample._id}>
              <td>{sample.name}</td>
              <td>{sample.age}</td>
          </tr>
      ))}
               

        

        </table>

   
    </div>
  )
}
