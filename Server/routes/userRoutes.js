const express = require('express');
const routes = express.Router()

const {signup,login,forgotPassword,resetPassword} = require('../controller/userController')

routes.post('/signup',signup)
routes.post('/login',login)
routes.post('/forgot',forgotPassword);
routes.post('/reset/:token',resetPassword);


module.exports = routes