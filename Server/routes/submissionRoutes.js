const express = require('express')
const router = express.Router()
const {postSubmission,getSubmission, getSingleSubmission} = require('../controller/submissionController');

router.post('/', postSubmission);
router.get('/', getSubmission);
router.get('/:id', getSingleSubmission);

module.exports = router