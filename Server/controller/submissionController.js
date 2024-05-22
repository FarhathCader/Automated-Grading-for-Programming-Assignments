const Submission = require("../models/submission");

// const postSubmission = async (req, res) => {
//     try{
//         const {problemId,  code, language,  grade,userId} = req.body;
//         const submission = await Submission.create({
//             problemId,
//             code,
//             language,
//             grade,
//             userId,
//         });
//         return res.status(201).json({submission});
//     }
//     catch(err){
//         return res.status(400).json({error : err.message})
//     }
// }

const postSubmission = async (req, res) => {
    try {
        const { problemId, code, language, grade, userId, testCases, results, status, contestId } = req.body;
        const submission = await Submission.create({
            problemId,
            code,
            language,
            grade,
            userId,
            status,
            submittedAt: new Date(),
            testCases,
            results,
            contestId

        });

        return res.status(201).json({ submission });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


const getSubmission = async (req, res) => {
    try {
        // Get userId, problemId, and contestId from the request query
        const { userId, problemId, contestId } = req.query;
        const query = { userId, problemId };
        if (contestId) {
            query.contestId = contestId;
        }
        const submission = await Submission.find(query);
        return res.status(200).json({ submission });
    } catch (err) {
        // Handle any errors
        return res.status(400).json({ error: err.message });
    }
}


const getSingleSubmission = async (req, res) => {
    try {
        const { id: submissionId } = req.params;
        const submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        return res.status(200).json({ submission });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}




module.exports = { postSubmission, getSubmission, getSingleSubmission }