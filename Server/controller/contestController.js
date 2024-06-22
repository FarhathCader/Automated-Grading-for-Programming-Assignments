const contest = require('../models/contest');
const Contest = require('../models/contest')
const Enrollment = require('../models/enrollment')
const Problem = require('../models/problems')


async function addContest(req, res) {
    try {
        const { name, startDate, endDate, duration, problems,createdBy } = req.body;
        

        // Create a new Contest document
        const contest = new Contest({
            name,
            startDate,
            endDate,
            duration,
            problems,
            createdBy
        });

        // Save the contest to the database
        await contest.save();

        res.status(201).json({ message: 'Contest created successfully', contest });
    } catch (error) {
        console.error('Error adding contest:', error);
        res.status(500).json({ error: err.message });
    }
}


const getContests = async (req,res)=>{

    try{
        const {userId} = req.params;
        const contests = await Contest.find({createdBy:userId})      
        return res.status(200).json({contests})
    }
    catch(err){
        return res.status(400).json({msg : err.message})
    }
}


const getCompletedContests = async (req, res) => {
  try {

    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const { userId } = req.params;
    const currentTimestamp = new Date().getTime();

      const completedContests = await Contest.find({
          createdBy: userId,
          endDate: { $lt: currentTimestamp }
      }).skip(skip).limit(Number(limit));

      const total = await Contest.find({
        createdBy: userId,
        endDate: { $lt: currentTimestamp }
    }).countDocuments();

      return res.status(200).json({completedContests,total});
  } catch (err) {
      return res.status(400).json({ msg: err.message });
  }
}

const getOngoingContests = async (req, res) => {
  try {
    
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
      const { userId } = req.params;
      const currentTimestamp = new Date().getTime();

      const availableContests = await Contest.find({
          createdBy: userId,
          endDate: { $gte: currentTimestamp }
      }).skip(skip).limit(Number(limit));

      const total = await Contest.find({
        createdBy: userId,
        endDate: { $gte: currentTimestamp }
    }).countDocuments();
      return res.status(200).json({availableContests,total});
  } catch (err) {
      return res.status(400).json({ msg: err.message });
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

const getContest = async (req, res) => {
    try {
      const { id } = req.params;
      const contest = await Contest.findById(id);
      if (!contest) {
        return res.status(404).json({ error: 'Contest not found' });
      }
      const problems = await Contest.findById(id).populate('problems');
      const problems_ = problems.problems;
      console.log(problems_);
      res.status(200).json({ contest,problems : problems_});
    } catch (error) {
      console.error('Error fetching contest:', error);
      res.status(500).json({ error: 'Failed to fetch contest' });
    }
  };


const updateContest = async (req, res) => {
    try {
      const { name, startDate, endDate, duration, problems } = req.body;
      const updatedContest = await Contest.findByIdAndUpdate(
        req.params.id,
        {
            name, startDate, endDate, duration, problems
        },
        { new: true, runValidators: true }
      );
      if (!updatedContest) return res.status(404).json({ msg: "Contest not found" });
      return res.status(200).json({ contest: updatedContest });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  };
  
// const getAvilabalContests = async (req, res) => {
//     try {
//       const { studentId } = req.params;
//       const contests = await Contest.find();
//       const currentDate = new Date();
//       const availableContests = contests.filter(contest => {
//         const startDate = new Date(contest.startDate);
//         const endDate = new Date(contest.endDate);
//         return currentDate >= startDate && currentDate <= endDate;
//       });
//       const availableContestIds = availableContests.map(contest => contest._id.toString());
//       const enrollments = await Enrollment.find({ studentId, contestId: { $in: availableContestIds } }).populate('contestId');
//        const conteststoremove = enrollments.filter(contest => {
//         return contest.createdAt.getTime() + contest.contestId.duration*60000 < currentDate.getTime();      
//        }).map(contest => contest.contestId._id.toString());

//        const availableContests_ = availableContests.filter(contest => {
//         return !conteststoremove.includes(contest._id.toString());
//       }
//     )
//       res.status(200).json({availableContests_});
      
      


      
//   }
//   catch (error) {
//     console.error('Error fetching available contests:', error);
//     res.status(500).json({ error: 'Failed to fetch available contests' });
//   }
// }

const getAvilabalContests = async (req, res) => {
  try {
    const { studentId } = req.params;
    const currentDate = new Date();

    // Fetch only the contests that are currently ongoing
    const contests = await Contest.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate }
    });

    const contestIds = contests.map(contest => contest._id.toString());

    // Fetch enrollments for the student in the ongoing contests
    const enrollments = await Enrollment.find({
      studentId,
      contestId: { $in: contestIds }
    }, 'contestId createdAt').populate('contestId', 'duration');

    // Calculate the contests to remove based on the duration and createdAt
    const contestIdsToRemove = new Set(enrollments.filter(enrollment => {
      return enrollment.createdAt.getTime() + enrollment.contestId.duration * 60000 < currentDate.getTime();
    }).map(enrollment => enrollment.contestId._id.toString()));

    // Filter available contests by removing the contests that have ended for the student
    const availableContests_ = contests.filter(contest => !contestIdsToRemove.has(contest._id.toString()));

    res.status(200).json({ availableContests_ });
  } catch (error) {
    console.error('Error fetching available contests:', error);
    res.status(500).json({ error: 'Failed to fetch available contests' });
  }
};

const searchContests = async (req, res) => {
    try {
        const { name } = req.query;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        console.log("name",name)
        // Construct query object
        const query = {};
        if (name) query.name = new RegExp(name, 'i');
        console.log(query)
        const contests = await Contest.find(query).skip(skip).limit(Number(limit));
        const total = await Contest.find(query).countDocuments();
        console.log(contests)
        return res.status(200).json({contests,total})
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getUpcomingContests = async (req, res) => {
  try {
    const currentTimestamp = new Date().getTime();
    const upcomingContests = await Contest.find({
      startDate: { $gt: currentTimestamp }
    })
    return res.status(200).json({ upcomingContests});
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};


  

module.exports = {getContests,addContest,deleteContest,updateContest,getContest,getAvilabalContests,getCompletedContests,getOngoingContests,searchContests,getUpcomingContests}