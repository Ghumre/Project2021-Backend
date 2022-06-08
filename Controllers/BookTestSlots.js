const Testing=require('../models/BookTestSlots');


exports.registerUserForTesting=async(req,res)=>{
    const {firstname,lastname,phoneno,slotsTime,slotsDate,
       testType}= req.body

       const testing=await Testing({
        firstname,
        lastname,
        
        phoneno,
        slotsTime,
        slotsDate,
       testType
      
    });
    await testing.save();
    res.json({success:true,testing});
};

