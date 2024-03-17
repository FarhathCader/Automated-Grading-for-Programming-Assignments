const express = require('express');
const routes = express.Router();

const { updateLecturer,getLecturer } = require('../controller/LecturerController');

routes.put('/:id', updateLecturer);
routes.get('/:userId', getLecturer);

module.exports = routes;

