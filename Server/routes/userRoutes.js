const express = require('express');
const routes = express.Router()

const {signup,login,forgotPassword,resetPassword,verifyToken,getUser,sendOtp} = require('../controller/userController')

routes.post('/signup',signup)
routes.post('/login',login)
routes.post('/forgot',forgotPassword);
routes.post('/reset/:token',resetPassword);
routes.get('/user',verifyToken,getUser);
routes.post('/send',sendOtp)


module.exports = routes