const express = require('express');
const routes = express.Router();

const { getAdmin, updateAdmin} = require('../controller/adminController');


routes.get('/:userId', getAdmin);
routes.put('/:id', updateAdmin);



module.exports = routes;

