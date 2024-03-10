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

const sendOtp = async(req,res)=>{
        console.log(req.body);
        try{
        const {username,email,password,usertype} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({error: 'All fields are required'});
        }
        if(!usertype){
            return res.status(400).json({error: 'User type is not given'});
        }
        if(password.length < 6){
            return res.status(400).json({error: 'Password must be atleast 6 characters long'});
        }
        //lower case email
        
        const availableLecturer =  await Lecturer.findOne({email : email.toLowerCase()}) ;
        const availableStudent =  await student.findOne({email :email.toLowerCase()});
        console.log(availableLecturer,availableStudent)
        if(availableStudent || availableLecturer){
              return res.status(400).json({error:'User already exists'});
        }
   
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
            subject: 'Account Verification',
            text: `OTP is ${otp}`
          };
        
           transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              return res.status(400).json({error:`${err}`});
    
            } else {
                return res.status(200).json({msg:`Verify with the otp send to the email`});
            //   console.log(data)
            }
          });
    
    
        // return sendOtp(email)
        // return res.json({msg: 'User created successfully', otp});
        }
        catch(error){
            console.log(error)
           return res.status(400).json({error: error.message});
        }
        
    

}



const signup = async (req,res)=>{
    
    try{
    const {username,email,password,usertype,OTP} = req.body;
    console.log(req.body);
console.log(`OTP ${OTP} otp ${otp}`)
    hashedPassword = await bcrypt.hash(password,10);

    if(!OTP){
        console.log("empty otp")
        return res.status(400).json({error: 'Please enter the OTP'});
    }
    if(OTP !== otp){
        console.log("invalid otp")
        return res.status(400).json({error: 'Invalid OTP'});
    }
    else{

        
        if(usertype === 'lecturer'){
            // const availableUser =  await Lecturer.findOne({email});
            // if(availableUser){
            // console.log("lectr exist")
            //    return  res.status(400).json({error:'Lecturer already exists'});
            // } 
            const user = await User.create({username,email : email.toLowerCase(),password : hashedPassword,usertype});
            const lectr = await Lecturer.create({username,email : email.toLowerCase(),password : hashedPassword,userId : user._id});

            }else{

                console.log(usertype)
                // const availableUser =  await student.findOne({email});
                // if(availableUser){
                // console.log("stdnt exist")
                //    return  res.status(400).json({error:'Student already exists'});
                // }
            const user = await User.create({username,email: email.toLowerCase(),password : hashedPassword,usertype});
            const stdnt = await student.create({username,email: email.toLowerCase(),password : hashedPassword,userId : user._id});
        
            }
    }

    return res.status(200).json({msg: 'User created successfully'});
    }
    catch(error){
        console.log(error.message)
       return res.status(400).json({error: error.message});
    }
    
}


const login = async (req,res)=>{

    const {email,password} = req.body;
    console.log(req.body);

        const user = await User.findOne({email : email.toLowerCase()});
        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign(
                {id : user._id }, 
            process.env.ACCESS_TOKEN,
            {
                expiresIn: '1d'
            })

            console.log(`token is ${token} user is ${user}`)
            res.cookie(String(user._id),token,{
                path : '/',
                httpOnly:true,
                expires : new Date(Date.now() + 1000*60*5),
                sameSite : 'lax'
            }
                )

           
            if(user.usertype === 'lecturer'){
                return res.status(200).json({msg : "lecturer"}); // ?return added
            }
            else if(user.usertype === 'student'){
                return res.status(200).json({msg : "student"});
            }
            else{
                return res.status(200).json({msg : "admin"});
            }

        }
        
        else{
       
           return res.status(400).json({error: "invalid email or password"});
        }
        

        
}





const verifyToken = (req,res,next)=>{
    const cookie = req.headers.cookie;
   
    if(!cookie){
        return res.status(401).json({error: 'Session Expired Please login again'});
    }
    const token = cookie.split('=')[1];
       if(token == null){
        return res.status(401).json({error: 'Unauthorized'});
    }
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err){
            return res.status(403).json({error: 'Forbidden'});
        }
        req.id = user.id;
    })
    next();
  
    
}

// const getUser = async (req,res)=>{
//     const userId = req.id;
//     let user;
//     try{
//         user = await User.findById(userId,'-password');
//     }catch(err){
//         return res.status(400).json({error: err.message});
//     }
//     if(!user){
//         return res.status(404).json({error: 'User not found'});
//     }

//     return res.status(200).json({user});
// }
const getUser = async (req, res) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, '-password');
        if (!user) {
            throw new Error('User not found');
        }
        return res.status(200).json({ user }); // Send the user data if found
    } catch (err) {
        return res.status(404).json({ error: err.message }); // Send the error response if user not found or any other error occurs
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
            if(password.length < 6){
                return res.status(400).json({error: 'Password must be atleast 6 characters long'});
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
    

const logout =  (req,res,next)=>{

    const cookie = req.headers.cookie;
    if(!cookie){
        return res.status(401).json({error: 'Session Expired Please login again'});
    }
    const token = cookie.split('=')[1];
    if(token == null){
        return res.status(401).json({error: 'Unauthorized'});
    }
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err){
            return res.status(403).json({error: 'Forbidden'});
        }
        req.id = user.id;
    })
    res.clearCookie(String(req.id));
    req.cookies[`${req.id}`] = '';
    return res.status(200).json({msg: 'Logged out successfully'});
    

}

  


module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
    verifyToken,
    getUser,
    sendOtp,
    logout
}