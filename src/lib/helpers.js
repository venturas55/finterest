const bcrypt=require('bcryptjs');
const res = require('express/lib/response');
const helpers = {};

helpers.encryptPass = async (password) =>{
    const sal = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,sal);
    return password;
};

helpers.verifyPassword = async(password,hashedPassword)=>{
    try{
       return await bcrypt.compare(password, hashedPassword);
    }catch(e){
        console.log(e);
    }
}

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/signin');
}

helpers.isNotAuthenticated = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/profile');
}

module.exports = helpers;