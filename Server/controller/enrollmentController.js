const Enrollment = require('../models/enrollment');
const Student = require('../models/student');



const getEnrolledStudents = async (req, res) => {
  try {
    console.log('getEnrolledStudents',req.params);
    const { contestId } = req.params;

    // Find all enrollments for the given contestId
    const enrollments = await Enrollment.find({ contestId });

    // Extract student IDs from the enrollments
    const studentIds = enrollments.map(enrollment => enrollment.studentId);

    // Query the Student collection to get details of enrolled students
    const enrolledStudents = await Student.find({ _id: { $in: studentIds } });

    res.status(200).json({ enrolledStudents });
  } catch (error) {

    console.log('Error fetching enrolled students:', error);
    res.status(500).json({ error: 'Failed to fetch enrolled students' });
  }
};

const createEnrollment = async (req, res) => {
  try {
    const { studentId, contestId } = req.body;

    // Create a new enrollment document
    const enrollment = await Enrollment.create({
      studentId,
      contestId
    });

    res.status(201).json({ enrollment });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    res.status(500).json({ error: 'Failed to create enrollment' });
  }
};

const getEnrolledStudent = async (req, res) => {
  try {
    const { studentId, contestId } = req.params;
    const enrollment = await Enrollment
      .findOne({ studentId, contestId })
      .populate('studentId');
    res.status(200).json({ enrollment });
  }
  catch (error) {
    console.error('Error fetching enrolled student:', error);
    res.status(500).json({ error: 'Failed to fetch enrolled student' });
  }
}

const getEnrollmentTime = async (req, res) => {
  try {
    const { userId, contestId } = req.params;
    
    // Find the student by the user ID
    const student = await Student.findOne({ userId });
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentId = student._id;

    // Find the enrollment by studentId and contestId
    const enrollment = await Enrollment.findOne({ studentId, contestId });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.status(200).json({ createdAt: enrollment.createdAt });
  } catch (error) {
    console.error('Error fetching enrollment time:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment time' });
  }
};


module.exports = { getEnrolledStudents , createEnrollment, getEnrolledStudent, getEnrollmentTime};
