const Vaccination=require('../models/Appointment');


exports.registerUserForVaccination=async(req,res)=>{
    const {firstname,slotsTime,slotsDate,lastname,phoneno,
       vaccineType } =req.body

       const vaccination=await Vaccination({
        firstname,
       lastname,
       phoneno,
       
        slotsTime,
        slotsDate,
       vaccineType 
      
    });
    await vaccination.save();
    res.json({success:true,vaccination});
};


// exports.vaccinValidate=async (req,res)=>{
//   const{ vaccineType }=req.body
 
//     const vaccine=await Vaccination.findOne({ vaccineType });

//  if(vaccine)
//   return res.json({success:false,message:'You are already registered for this vaccination!'});
// };