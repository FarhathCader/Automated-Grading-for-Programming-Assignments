const express = require('express')
const router = express.Router()
const {postSubmission,getSubmission} = require('../controller/submissionController');

router.post('/', postSubmission);
router.get('/', getSubmission);

module.exports = router