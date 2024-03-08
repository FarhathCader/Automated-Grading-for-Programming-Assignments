const User = require('../models/user');
const Lecturer = require('../models/lecturer');
const student = require('../models/student');
const bcrypt = require('bcrypt');
const nodeMailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const crypto = require('crypto');

function generateSecureOTP(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    let OTP = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charsLength);
        OTP += chars[randomIndex];
    }

    return OTP;
}

// Example usage:
let otp;


const sendOtp =  (email)=>{

    otp = generateSecureOTP(6);
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        },
        // host: smtpHost,
        // port: smtpPort,
        // secure: false
      });
    
      let mailOptions = {
        from: "farhadfd818@gmail.com",
        to: email,
        subject: 'Reset Password',
        text: `OTP is ${otp}`
      };
    
       transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
            return res.status(200).json({msg:`Check your email for the password reset link`});
        //   console.log(data)
        }
      });
}


const signup = async (req,res)=>{
    // res.json({msg: 'User created successfully'});
   

    console.log(req.body);
    try{
    const {username,email,password,usertype} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({error: 'All fields are required'});
    }
    if(password.length < 6){
        return res.status(400).json({error: 'Password must be atleast 6 characters long'});
    }
    const availableUser =  await User.findOne({email});
    if(availableUser){
       return  res.status(400).json({error:'User already exists'});
    }
    hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({username,email,password : hashedPassword,usertype});
    if(usertype === 'lecturer'){
        await Lecturer.create({name: username, email, password : hashedPassword});
                
    }else{
       await student.create({name: username, email, password : hashedPassword});
    }
    sendOtp(email)
    return res.json({msg: 'User created successfully', otp});
    }
    catch(error){
       return res.status(400).json({error: error.message});
    }
    
}


const login = async (req,res)=>{

    const {email,password} = req.body;
    console.log(req.body);

        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            // res.status(200).json(user)
            // const token = jwt.sign(
            //     {user:{
            //     id:user._id,
            //     email:user.email,
            //     userName:user.userName
            // }}, 
            // process.env.ACCESS_TOKEN,
            // {
            //     expiresIn: '1d'
            // })

            // console.log(`token is ${token}`)
            // res.cookie('token',token,{
            //     httpOnly:true,
            //     maxAge: 24*60*60*1000
            // })
            if(user.usertype === 'lecturer'){
                res.status(200).json({msg : "lecturer"});
            }
            else if(user.usertype === 'student'){
                res.status(200).json({msg : "student"});
            }
            else{
                res.status(200).json({msg : "admin"});
            }

        }
        
        else{
       
            res.status(400).json({error: "invalid email or password"});
        }
        

        
}


const forgotPassword = 
    async (req,res)=>{
        const {email} = req.body;
        try{
            if(!email){
                return res.status(400).json({error: 'Email is mandatory'});
            }
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: 'User does not exist'});
            }

            const token = jwt.sign({id:user._id},process.env.ACCESS_TOKEN,{
                expiresIn: '1d'
            })

            let transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                  type: 'OAuth2',
                  user: process.env.MAIL_USERNAME,
                  pass: process.env.MAIL_PASSWORD,
                  clientId: process.env.OAUTH_CLIENTID,
                  clientSecret: process.env.OAUTH_CLIENT_SECRET,
                  refreshToken: process.env.OAUTH_REFRESH_TOKEN
                },
                // host: smtpHost,
                // port: smtpPort,
                // secure: false
              });
            
              let mailOptions = {
                from: "farhadfd818@gmail.com",
                to: email,
                subject: 'Reset Password',
                text: `This link will expire in 5 minutes\nhttp://localhost:5173/reset/${token}`
              };
            
              transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                  console.log("Error " + err);
                } else {
                    return res.status(200).json({msg:`Check your email for the password reset link`});
                //   console.log(data)
                }
              });

        }

        catch(err){
            res.status(500).json({error:err.message});
        }
    


    }


    const resetPassword = 
        async (req,res)=>{
            const {password} = req.body;
            const token = req.params.token;
            console.log(token,password)
            if(!password){
                return res.status(400).json({error : 'Password is mandatory'});
            }
            if(!token){
                return res.status(400).json({error:'Token is mandatory'});
            }
            try{
                const decoded = jwt.verify(token,process.env.ACCESS_TOKEN);
                const user = await User.findById(decoded.id);
                if(!user){
                   return  res.status(400).json({error : 'User does not exist'});
                }
                const hashedPassword = await bcrypt.hash(password,10);
                user.password = hashedPassword;
                await user.save();
                return res.status(200).json({msg : 'Password reset successfully'});
            }
            catch(err){
               return  res.status(500).json({error: "Invalid Token"});
            }
        }
    

  


module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
}