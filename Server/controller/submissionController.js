const Submission = require("../models/submission");

const postSubmission = async (req, res) => {
    try{
        const {problemId,  code, language,  grade,userId} = req.body;
        const submission = await Submission.create({
            problemId,
            code,
            language,
            grade,
            userId,
        });
        return res.status(201).json({submission});
    }
    catch(err){
        return res.status(400).json({error : err.message})
    }
}

const getSubmission = async (req, res) => {
    try{
        //get a problem with given userid and problem id
        const {userId, problemId} = req.body;
        const submission = await Submission.find({userId, problemId});
        console.log(submission);
        return res.status(200).json({submission});
    }
    catch(err){
        return res.status(400).json({error : err.message})
    }
}

        

module.exports = {postSubmission,getSubmission}