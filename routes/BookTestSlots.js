const express=require('express');
const router= express.Router();
const {isAuth}=require('../middleware/auth');
const {registerUserForTesting} = require('../Controllers/BookTestSlots');
const { TestingSchema } = require('../models/BookTestSlots');
const { TestingValidation, TestValidation } = require('../middleware/TestingVallidation/BookTestSlots');
const { Testings }= require('../GetDataFuctions/BookTestSlots');
router.post('/Testing', TestingValidation, TestValidation ,registerUserForTesting);
router.get('/GetTesting', Testings);
module.exports=router;
       