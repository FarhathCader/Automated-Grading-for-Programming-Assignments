const express = require('express')
const router = express.Router()

const {getContests, addContest, deleteContest, updateContest,getContest,endContest} = require('../controller/contestController')

router.post('/',addContest)
router.get('/',getContests)
router.get('/:id',getContest)
router.delete('/:id',deleteContest)
router.put('/:id',updateContest)
router.put('/end/:id',endContest)


module.exports = router