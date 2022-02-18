const express=require('express');
const router= express.Router();

const{validateUserSignUp,userValidation,validateUserSignIn,}=require('../middleware/validation/user');
const {createUser, userSignIn, uploadProfile}=require('../Controllers/user');
const User= require('../models/user');
const{isAuth}=require('../middleware/auth');
const multer=require('multer');

const User1=  require('../middleware/validation/user');
const storage=multer.diskStorage({});


const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb('invalid image file',false);
    }
} 
const uploads= multer({storage,fileFilter});
    
 
router.post('/create-user',validateUserSignUp,userValidation, createUser);
router.post('/sign-in',validateUserSignIn,userValidation,userSignIn);
// router.post('/create-post',isAuth,(req,res)=>{
//     //create our post..
//     res.send('welcome you are in secret route');
// });
router.post('/upload-profile',isAuth,uploads.single('profile'),uploadProfile
);
module.exports= router;       
            