const contest = require('../models/contest');
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


const endContest = async (req, res) => {
  const { id } = req.params;
  console.log("id",id)
  try {
    const updatedContest = await Contest.findByIdAndUpdate(
      id,
      { endDate: new Date() },
      { new: true }
    );
    if (!updatedContest) {
      return res.status(404).json({ message: 'Contest not found' });
    }

    res.status(200).json({ contest: updatedContest });
  } catch (error) {
    res.status(500).json({ message: 'Failed to end contest', error });
  }
};

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
      console.log(req.body)
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
  

module.exports = {getContests,addContest,deleteContest,updateContest,getContest,endContest}