const express = require('express');
const routes = express.Router()

const {signup,login,forgotPassword,resetPassword,verifyToken,getUser,sendOtp,logout,refreshToken} = require('../controller/userController')

routes.post('/signup',signup)
routes.post('/login',login)
routes.post('/forgot',forgotPassword);
routes.post('/reset/:token',resetPassword);
routes.get('/user',verifyToken,getUser);
routes.post('/send',sendOtp)
routes.post('/logout',logout)
routes.get('/refresh',refreshToken,getUser)


module.exports = routes