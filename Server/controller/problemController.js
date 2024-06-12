const Problem = require('../models/problems')

const addProblem = async (req,res)=>{
    try{
        const{name,category,description,difficulty,testCases,grade,initialCode,programmingLanguage,examples} = req.body;

        const problem = await Problem.create({
            name,
            category,
            description,
            difficulty,
            testCases,
            grade,
            initialCode,
            programmingLanguage,
            examples
        })

        return res.status(201).json({problem})


    }

    catch(err){
        return res.status(400).json({msg : 'Error Occured',error : err.message})
    }

}

const getProblems = async (req,res)=>{
    try{
        const problems = await Problem.find()
        return res.status(200).json({problems})
    }
    catch(err){
        return res.status(400).json({msg : err.message})
    }
}

const deleteProblem = async (req,res)=>{
    try{
        const problem = await Problem.findById(req.params.id);
        if(!problem)return res.status(400).json({error : "problem not found"})
        await Problem.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg : "problem deleted successfully"})
    }
    catch(err){

        return res.status(400).json({error : err.message})

    }
}

const getProblem = async (req,res)=>{
    try{
        const problem = await Problem.findById(req.params.id.toString())

        return res.status(200).json({problem})
    }
    catch(err){
        return res.status(400).json({msg : err.message})
    }
}

const updateInitialCode = async (req, res) => {
    
    try {
        // Find the problem by ID
        const problem = await Problem.findById(req.params.id);


        if (!problem) {
            return res.status(404).json({ msg: 'Problem not found' });
        }

        // Update initialCode and programmingLanguage if provided in the request body
        if (req.body.initialCode) {
            problem.initialCode = req.body.initialCode;
        }
        if (req.body.programmingLanguage) {
            problem.programmingLanguage = req.body.programmingLanguage;
        }

        // Save the updated problem
        await problem.save();

        // Return the updated problem in the response
        return res.status(200).json({ problem });
    } catch (err) {
        // Handle errors
        return res.status(400).json({ msg: err.message });
    }
};

const updateProblem = async (req, res) => {
    try {
      const { name, category, description, difficulty, testCases, grade, initialCode,examples} = req.body;
      const updatedProblem = await Problem.findByIdAndUpdate(
        req.params.id,
        {
          name,
          category,
          description,
          difficulty,
          testCases,
          grade,
          initialCode,
          examples,
        },
        { new: true, runValidators: true }
      );
      if (!updatedProblem) return res.status(404).json({ msg: "Problem not found" });
      return res.status(200).json({ problem: updatedProblem });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  };

const getPracticeProblems = async (req,res)=>{
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const problems = await Problem.find().skip(skip).limit(Number(limit));
    const total = await Problem.countDocuments();

    return res.status(200).json({ problems, total });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
}
  

module.exports = {addProblem,getProblems,getProblem,updateInitialCode,deleteProblem,updateProblem,getPracticeProblems}