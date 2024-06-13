const contest = require('../models/contest');
const Contest = require('../models/contest')
const Enrollment = require('../models/enrollment')


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
        res.status(500).json({ error: err.message });
    }
}


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

const getContest = async (req, res) => {
    try {
      const { id } = req.params;
      const contest = await Contest.findById(id);
      if (!contest) {
        return res.status(404).json({ error: 'Contest not found' });
      }
      res.status(200).json({ contest });
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
  
const getAvilabalContests = async (req, res) => {
    try {
      const { studentId } = req.params;
      const contests = await Contest.find();
      const currentDate = new Date();
      const availableContests = contests.filter(contest => {
        const startDate = new Date(contest.startDate);
        const endDate = new Date(contest.endDate);
        return currentDate >= startDate && currentDate <= endDate;
      });
      const availableContestIds = availableContests.map(contest => contest._id.toString());
      const enrollments = await Enrollment.find({ studentId, contestId: { $in: availableContestIds } }).populate('contestId');
       const conteststoremove = enrollments.filter(contest => {
        return contest.createdAt.getTime() + contest.contestId.duration*60000 < currentDate.getTime();      
       }).map(contest => contest.contestId._id.toString());

       const availableContests_ = availableContests.filter(contest => {
        return !conteststoremove.includes(contest._id.toString());
      }
    )
      res.status(200).json({availableContests_});
      
      


      
  }
  catch (error) {
    console.error('Error fetching available contests:', error);
    res.status(500).json({ error: 'Failed to fetch available contests' });
  }
}

  

module.exports = {getContests,addContest,deleteContest,updateContest,getContest,getAvilabalContests}