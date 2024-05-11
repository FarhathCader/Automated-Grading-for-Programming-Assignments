const express = require('express')
const router = express.Router()

const {addProblem,getProblems,getProblem, updateInitialCode,deleteProblem, updateProblem} = require('../controller/problemController')

router.post('/',addProblem)
router.get('/',getProblems)
router.get('/:id',getProblem)
router.patch('/:id',updateInitialCode)
router.delete('/:id',deleteProblem)
router.put('/:id',updateProblem)


module.exports = router