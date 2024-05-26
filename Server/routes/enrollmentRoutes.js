const express = require('express');
const router = express.Router();

const { getEnrolledStudents, createEnrollment, getEnrolledStudent ,getEnrollmentTime} = require('../controller/enrollmentController');

router.get('/:contestId', getEnrolledStudents);
router.get('/:studentId/:contestId', getEnrolledStudent);
router.post('/', createEnrollment);
router.get('/time/:userId/:contestId', getEnrollmentTime);

module.exports = router;

