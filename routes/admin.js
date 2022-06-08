const express=require('express');
const router= express.Router();

const {createAdmin,adminSignIn,uploadProfile}=require('../Controllers/admin');
const{validateAdminSignIn,validateAdminSignUp,adminValidation}=require('../middleware/AdminValidation/admin');
const Admin= require('../models/admin');
const{isAuth}=require('../middleware/adminAuth');
const multer=require('multer');


const Admin1=  require('../middleware/AdminValidation/admin');
const storage=multer.diskStorage({});


const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb('invalid image file',false);
    }
} 
const uploads= multer({storage,fileFilter});

router.post('/create-admin',validateAdminSignUp,adminValidation, createAdmin);
router.post('/admin-sign-in',validateAdminSignIn,adminValidation,adminSignIn);
router.post('/upload-Admin-profile',isAuth,uploads.single('profile'),uploadProfile
);
module.exports= router;