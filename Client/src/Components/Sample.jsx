import React, { useEffect, useState } from 'react'

export default function Sample() {

    const [count, setCount] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [passedWeight, setPassedWeight] = useState(0);
    const [problemGrade, setProblemGrade] = useState(0);
    const [passedPercentage, setPassedPercentage] = useState(0);
    const [finalProblemGrade, setFinalProblemGrade] = useState(0);

    const handleClcik = () => {
        setCount(prevCount => prevCount + 1)
        console.log(count)
    }
    const finalGrade = (passedPercentage, problemGrade) => {
        return (passedPercentage / 100) * problemGrade;
      };

    const submit = () => {
        setTotalWeight(prevWeight => prevWeight + 5);
        setPassedWeight(prev => prev + 5);
        setProblemGrade(prev => prev + 5);
    }

    const grading = () => {
        const passedPercentage_ = totalWeight ? (passedWeight / totalWeight) * 100 : 0;
        const finalProblemGrade_ = finalGrade(passedPercentage_, problemGrade);
        setPassedPercentage(passedPercentage_);
        setFinalProblemGrade(finalProblemGrade_);
    
      }

      useEffect(() => {
        console.log("total weight and passed weight changed", totalWeight, passedWeight)
        grading();
      }, [totalWeight, passedWeight]);

    useEffect(() => {
        console.log("useEffect called",count)
        setPercentage(count * 10)
        
    }, [count])


  return (
    <div>

        {/* <h1>{count}</h1>
        <button onClick={handleClcik}>Increment</button>
        <h1>{percentage}</h1> */}
        <h1>passedPercentage {passedPercentage}</h1>
        <h1>finalProblemGrade {finalProblemGrade}</h1>
        <button onClick={submit}>Submit</button>
      
    </div>
  )
}
