const express = require('express')
const router = express.Router()

const {getContests, addContest, deleteContest, updateContest,getContest,getAvilabalContests} = require('../controller/contestController')

router.post('/',addContest)
router.get('/:userId',getContests)
router.get('/available/:studentId',getAvilabalContests)
router.get('/:id',getContest)
router.delete('/:id',deleteContest)
router.put('/:id',updateContest)


module.exports = router