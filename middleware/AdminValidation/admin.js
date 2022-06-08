const {check,validationResult}=require('express-validator');

exports.validateAdminSignUp=[
    check('firstname').trim().not().isEmpty().withMessage('Please Enter Your FirstName').
    isString().withMessage('Please enter the valid name').
    isLength({min:3,max:30}).
    withMessage('Name must be Within 3 to 30 characters'),

    check('lastname').trim().not().isEmpty().withMessage('Please Enter Your LastName').
    isString().withMessage('Please enter the valid name').isLength({min:3,max:30}).
    withMessage('Name must be Within 3 to 30 characters'),

    check('email').normalizeEmail().isEmail().withMessage('Invalid Email!!'),

    check('age').trim().not().isEmpty().withMessage('Enter the age'),

    check('phoneno').trim().not().isEmpty().withMessage('Enter the phone number ').isLength({min:1,max:10}).withMessage('invalid Phone no'),

    check('designation').trim().not().isEmpty().withMessage('Enter Your Designation !'),
    
    check('gender').trim().not().notEmpty().withMessage('Enter the gender'),

    check('password').trim().not().isEmpty().isLength({min:1,max:8}).withMessage('Password must be 8 characters long!'),

    check('username').trim().not().isEmpty().withMessage('Enter a username'),
];

exports.adminValidation=(req,res,next)=>{
    const result=validationResult(req).array()
    if(!result.length) return next();
    const error= result[0].msg;
    res.json({success:false, message:error});
};

exports.validateAdminSignIn=[
     check('email').trim().isEmail().withMessage('email is required!'),

     check('password').trim().not().isEmpty().withMessage('password is required!'),
];