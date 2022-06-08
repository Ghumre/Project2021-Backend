const {check,validationResult}=require('express-validator');

exports.VaccineValidation=[
    check('firstname').trim().not().isEmpty().withMessage('Please Enter Your FirstName').
    isString().withMessage('Please enter the valid name').
    isLength({min:3,max:30}).
    withMessage('Name must be Within 3 to 30 characters'),

 check('lastname').trim().not().isEmpty().withMessage('Please Enter Your LastName').
     isString().withMessage('Please enter the valid name').isLength({min:3,max:30}).
     withMessage('Name must be Within 3 to 30 characters'),

     check('phoneno').trim().not().isEmpty().withMessage('Enter the phone number ').isLength({min:1,max:10}).withMessage('invalid Phone no'),

    check('slotsTime').trim().not().isEmpty().withMessage('Please enter the timing for slot!'),

    check('slotsDate').trim().not().isEmpty().withMessage('Please enter the date!'),

    check('vaccineType').trim().not().isEmpty().withMessage('Please enter the vaccine type!'),
];

exports.vaccineValidation=(req,res,next)=>{
    const result=validationResult(req).array()
    if(!result.length) return next();
    const error= result[0].msg;
    res.json({success:false, message:error});
};
