const User = require('../models/user');

const signup = async (req,res)=>{
    // res.json({msg: 'User created successfully'});
   


    try{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({error: 'All fields are required'});
    }

    const user = await User.create({username,email,password});
    res.json({msg: 'User created successfully', user});
    }
    catch(error){
        res.status(400).json({error: "User already exists"});
    }
    
}


const login = (req,res)=>{
    res.json({msg: 'User logged in successfully'});
}


module.exports = {
    signup,
    login
}