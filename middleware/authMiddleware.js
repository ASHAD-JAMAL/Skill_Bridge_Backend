const jwt = require('jsonwebtoken');
require("dotenv").config();

const httpStatusCode = require('../constant/httpStatusCode');

async function getToken(user){
    const token = await jwt.sign({user}, process.env.JWT_SECRET, {expiresIn:'1d'});
    return token;
}

async function verifyToken(req,res,next){
    const token = req.headers.authorization;

    if(!token){
        return res.status(httpStatusCode.UNAUTHORIZED).json({success:false,message:"Unauthorized: Token not provided"});
    }
    try{
        //split the authorization header by space and directly use the token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(error){
        console.error('Error verifying token:',error);
        return res.status(httpStatusCode.UNAUTHORIZED).json({success:false,message:'Unauthorized:Invalid Token'});
    }
}
module.exports ={
    getToken,
    verifyToken
}