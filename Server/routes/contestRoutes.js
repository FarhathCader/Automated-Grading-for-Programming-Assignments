const express = require('express')
const router = express.Router()

const {getContests, addContest, deleteContest} = require('../controller/contestController')

router.post('/',addContest)
router.get('/',getContests)
// router.get('/:id',getProblem)
// router.patch('/:id',updateInitialCode)
router.delete('/:id',deleteContest)
// router.put('/:id',updateProblem)


module.exports = router