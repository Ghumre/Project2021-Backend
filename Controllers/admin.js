const jwt= require('jsonwebtoken');
//const User= require('../models/user');
const Admin=require('../models/admin');
const sharp=require('sharp');
const cloudinary=require('../helper/imageUpload');

exports.createAdmin= async(req,res)=>{

    const {firstname,lastname,age,email,phoneno,designation,gender,
        username,password,}= req.body
    
  try{
    const isNewUser= await Admin.isThisEmailInUse(email);
    if(!isNewUser) return res.json({
        success:false,
        message:'This email is already in use, try another or sign-in',
    });
 
    const isNewUser1= await Admin.isThisPhoneNoInUse(phoneno);
    if(!isNewUser1) return res.json({
        success:false,
        message:'This phoneno is already in use, try another or sign-in',
    });

    

    const isNewUser2= await Admin.isThisUserNameInUse(username);
    if(!isNewUser2) return res.json({
        success:false,
        message:'This username is already in use, try another or sign-in',
    });
}catch(error) {
    console.log("there is Somthing wrong",error.message);
}
     const admin= await Admin({
         firstname,
         lastname,
         age,
         email,
         phoneno, 
         designation,
         gender,
        username,
        password,
     });
     await admin.save();
     res.json({success:true,admin});
    };

    exports.adminSignIn= async (req,res)=>{
       const{email,password}=req.body

       const admin=await Admin.findOne({email});

       if(!admin) return res.json({success:false,message:'user not found,with gven email!'});

       const isMatch=await admin.comparePassword(password);
       if(!isMatch) return res.json({success:false,message:'Password s not matchng!'});
      
    
      const token= jwt.sign({userId:admin._id},
         process.env.JWT_SECRET,{expiresIn:'1d'});

         const adminInfo={
        firstname:admin.firstname,
         lastname:admin.lastname,
         avtar:admin.avtar?admin.avtar:'',
         };

    res.json({success:true,user:adminInfo,token});


    };

    exports.uploadProfile=async(req,res)=>{
        const {admin}=req
        if(!admin)return res.status(401).json({success:false,message:'unauthorized access'});


        try{

const result=await cloudinary.uploader.upload(req.file.path, {
           public_id:'${user._id}_profile',
           width:500,
           height:500,
           crop:'fill'
       });
       
       await Admin.findByIdAndUpdate(admin._id,{avtar:result.url});
         res.status(201).json({success:true, message:'Your profile has updated!'});
    
    }catch(error){
        res.status(500).json({success:false, message:'server error try after some time!'});
        console.log('Error while uploading profile image', error.message);
    }
};
    