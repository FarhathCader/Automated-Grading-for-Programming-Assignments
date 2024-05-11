const express = require('express')
const router = express.Router()

const {getContests, addContest, deleteContest, updateContest,getContest} = require('../controller/contestController')

router.post('/',addContest)
router.get('/',getContests)
router.get('/:id',getContest)
router.delete('/:id',deleteContest)
router.put('/:id',updateContest)


module.exports = router