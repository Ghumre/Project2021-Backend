const jwt= require('jsonwebtoken');
const User= require('../models/user');
const sharp=require('sharp');
const cloudinary=require('../helper/imageUpload');

exports.createUser= async(req,res)=>{

    const {firstname,secondname,age,email,phoneno,AdharNo,gender,
        username,password,}= req.body
    
  try{
    const isNewUser= await User.isThisEmailInUse(email);
    if(!isNewUser) return res.json({
        success:false,
        message:'This email is already in use, try another or sign-in',
    });
 
    const isNewUser1= await User.isThisPhoneNoInUse(phoneno);
    if(!isNewUser1) return res.json({
        success:false,
        message:'This phoneno is already in use, try another or sign-in',
    });

    const isNewUser2= await User.isThisAdharCardNoInUse(AdharNo);
    if(!isNewUser2) return res.json({
        success:false,
        message:'This Adhar Card number is already in use, try another or sign-in',
    });

    const isNewUser3= await User.isThisUserNameInUse(username);
    if(!isNewUser3) return res.json({
        success:false,
        message:'This username is already in use, try another or sign-in',
    });
}catch(error) {
    console.log("there is Somthing wrong",error.message);
}
     const user= await User({
         firstname,
         secondname,
         age,
         email,
         phoneno, 
         AdharNo,
         gender,
        username,
        password,
     });
     await user.save();
     res.json({success:true,user});
    };

    exports.userSignIn= async (req,res)=>{
       const{email,password}=req.body

       const user=await User.findOne({email});

       if(!user) return res.json({success:false,message:'user not found,with gven email!'});

       const isMatch=await user.comparePassword(password);
       if(!isMatch) return res.json({success:false,message:'Password s not matchng!'});
      
    
      const token= jwt.sign({userId:user._id},
         process.env.JWT_SECRET,{expiresIn:'1d'});

         const userInfo={
        firstname:user.firstname,
         secondname:user.secondname,
         avtar:user.avtar?user.avtar:'',
         };

    res.json({success:true,user:userInfo,token});


    };

    exports.uploadProfile=async(req,res)=>{
        const {user}=req
        if(!user)return res.status(401).json({success:false,message:'unauthorized access'});


        try{

const result=await cloudinary.uploader.upload(req.file.path, {
           public_id:'${user._id}_profile',
           width:500,
           height:500,
           crop:'fill'
       });
       
       await User.findByIdAndUpdate(user._id,{avtar:result.url});
         res.status(201).json({success:true, message:'Your profile has updated!'});
    
    }catch(error){
        res.status(500).json({success:false, message:'server error try after some time!'});
        console.log('Error while uploading profile image', error.message);
    }
};
    