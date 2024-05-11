const Contest = require('../models/contest')


async function addContest(req, res) {
    try {
        const { name, startDate, endDate, duration, problems } = req.body;

        // Create a new Contest document
        const contest = new Contest({
            name,
            startDate,
            endDate,
            duration,
            problems
        });

        // Save the contest to the database
        await contest.save();

        res.status(201).json({ message: 'Contest created successfully', contest });
    } catch (error) {
        console.error('Error adding contest:', error);
        res.status(500).json({ error: 'Failed to add contest' });
    }
}

module.exports = { addContest };


const getContests = async (req,res)=>{
    try{
        const contests = await Contest.find()
        return res.status(200).json({contests})
    }
    catch(err){
        return res.status(400).json({msg : err.message})
    }
}

async function deleteContest(req, res) {
    const contestId = req.params.id;

    try {
        // Find the contest by ID and delete it
        const deletedContest = await Contest.findByIdAndDelete(contestId);

        if (!deletedContest) {
            return res.status(404).json({ error: 'Contest not found' });
        }

        res.json({ message: 'Contest deleted successfully' });
    } catch (error) {
        console.error('Error deleting contest:', error);
        res.status(500).json({ error: 'Failed to delete contest' });
    }
}

// const getProblem = async (req,res)=>{
//     try{
//         const problem = await Problem.findById(req.params.id.toString())
//     console.log("getting problem",problem.name)

//         return res.status(200).json({problem})
//     }
//     catch(err){
//         return res.status(400).json({msg : err.message})
//     }
// }

// const updateInitialCode = async (req, res) => {
    
//     try {
//         // Find the problem by ID
//         const problem = await Problem.findById(req.params.id);

//         console.log("updateing",problem.name," problem")

//         if (!problem) {
//             return res.status(404).json({ msg: 'Problem not found' });
//         }

//         // Update initialCode and programmingLanguage if provided in the request body
//         if (req.body.initialCode) {
//             problem.initialCode = req.body.initialCode;
//         }
//         if (req.body.programmingLanguage) {
//             problem.programmingLanguage = req.body.programmingLanguage;
//         }

//         // Save the updated problem
//         await problem.save();

//         // Return the updated problem in the response
//         return res.status(200).json({ problem });
//     } catch (err) {
//         // Handle errors
//         return res.status(400).json({ msg: err.message });
//     }
// };

// const updateProblem = async (req, res) => {
//     try {
//       const { name, category, description, difficulty, testCases, grade, initialCode,examples} = req.body;
//       console.log(req.body)
//       const updatedProblem = await Problem.findByIdAndUpdate(
//         req.params.id,
//         {
//           name,
//           category,
//           description,
//           difficulty,
//           testCases,
//           grade,
//           initialCode,
//           examples,
//         },
//         { new: true, runValidators: true }
//       );
//       if (!updatedProblem) return res.status(404).json({ msg: "Problem not found" });
//       return res.status(200).json({ problem: updatedProblem });
//     } catch (err) {
//       return res.status(400).json({ msg: err.message });
//     }
//   };
  

module.exports = {getContests,addContest,deleteContest}