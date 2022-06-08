const express=require('express');
const router= express.Router();

const {registerUserForVaccination,vaccineValidations}=require('../Controllers/Appointment');
const{VaccineValidation,vaccineValidation}=require('../middleware/VaccineValidation/Appointment')
const {Vaccination}=require('../GetDataFuctions/Appointment');
const newLocal = '/registersForVaccination';
router.post(newLocal,VaccineValidation,vaccineValidation,registerUserForVaccination);
router.get('/Vaccinations', Vaccination);
module.exports= router;