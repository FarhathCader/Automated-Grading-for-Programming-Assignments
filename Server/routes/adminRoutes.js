const express = require('express');
const routes = express.Router();

const { getAdmin} = require('../controller/adminController');

routes.get('/:userId', getAdmin);


module.exports = routes;

