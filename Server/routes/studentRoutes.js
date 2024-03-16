const express = require('express');
const routes = express.Router();

const {updateStudent,getStudent} = require('../controller/studentController');

routes.put('/:id', updateStudent);
routes.get('/:userId', getStudent);

module.exports = routes;

