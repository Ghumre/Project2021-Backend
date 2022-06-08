const jwt=require('jsonwebtoken');
//const User= require('../models/user');
const Admin=require('../models/admin');

exports.isAuth=async(req,res,next)=>{
    if(req.headers && req.headers.authorization){
       const token=  req.headers.authorization.split(' ')[1]
       try{
        const decode=jwt.verify(token, process.env.JWT_SECRET);
        const admin=await Admin.findById(decode.adminId);
  if(!admin){
      return res.json({success:false, message:'unauthorised access'});
  }
  req.admin=admin;
  next();

       }
       catch(error){
           if(error.name=='JsonWebTokenError'){
            return res.json({success:false, message:'unauthorised access'});
           }
           if(error.name=='TokenExpiredError'){
            return res.json({success:false, message:'session expired try sign in!'});
           }
           res.res.json({success:false, message:'Internal server error!'});
       }

    }else{
        res.json({success:false,message:'unauthorise access'});
    }
};