const Enrollment = require('../models/enrollment');
const Student = require('../models/student');
const Submission = require('../models/submission');
const Contest = require('../models/contest');

const getEnrolledStudentsWithGrades = async (req, res) => {
  try {
    const { contestId } = req.params;

    // Find all enrollments for the given contestId
    const enrollments = await Enrollment.find({ contestId });

    console.log('enrollments',enrollments);

    // Extract student IDs from the enrollments
    const studentIds = enrollments.map(enrollment => enrollment.studentId);

    console.log('studentIds',studentIds);

    // Query the Student collection to get details of enrolled students
    const students = await Student.find({ _id: { $in: studentIds } });

    console.log('students',students);
    // Calculate total grades for each student in the contest
    const studentsWithGrades = await Promise.all(students.map(async (student) => {
    const submissions = await Submission.find({ userId: student.userId, contestId });

      console.log('submissions',submissions);
      // Group submissions by problem ID
      const submissionGroups = {};
      submissions.forEach(submission => {
        if (!submissionGroups[submission.problemId]) {
          submissionGroups[submission.problemId] = [];
        }
        submissionGroups[submission.problemId].push(submission);
      });

      // Calculate highest grade for each problem
      const highestGrades = {};
      for (const [problemId, problemSubmissions] of Object.entries(submissionGroups)) {
        const highestGrade = Math.max(...problemSubmissions.map(submission => submission.grade));
        highestGrades[problemId] = highestGrade;
      }

      // Sum highest grades for each problem
      let totalGrade = 0;
      for (const grade of Object.values(highestGrades)) {
        totalGrade += grade;
      }

      return {
        regNo : student.regNo,
        username: student.username,
        totalGrade
      };
    }));

    res.status(200).json({ studentsWithGrades });
  } catch (error) {
    console.error('Error fetching enrolled students with grades:', error);
    res.status(500).json({ error: 'Failed to fetch enrolled students with grades' });
  }
};

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

const getEnrolledContests = async (req, res) => {
  try {
    const { userId } = req.params;
    const student = await Student.findOne({ userId});
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const enrollments = await Enrollment.find({ studentId: student._id});
    const contestIds = enrollments.map(enrollment => enrollment.contestId);
    const contests = await Contest.find({ _id: { $in: contestIds } });
    res.status(200).json({ contests });
  } catch (error) {
    console.error('Error fetching enrolled contests:', error);
    res.status(500).json({ error: 'Failed to fetch enrolled contests' });
  }
};

module.exports = { getEnrolledStudentsWithGrades,getEnrolledStudents , createEnrollment, getEnrolledStudent, getEnrollmentTime,getEnrolledContests};
