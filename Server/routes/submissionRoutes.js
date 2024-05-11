const express = require('express')
const router = express.Router()
const {postSubmission} = require('../controller/submissionController');

router.post('/', postSubmission);

module.exports = router