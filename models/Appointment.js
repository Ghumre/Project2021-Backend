const mongoose= require ('mongoose');
const { required } = require('nodemon/lib/config');

const vaccinationSchema= new mongoose.Schema({
    firstname:{
        type:String ,
    required:true
},
lastname:{
    type:String,
    required:true
},
phoneno:{
    type:Number,
    required:true
},
vaccineType:{
    type:String,
    required:true
},
slotsTime:{
    type:String, 
    required:true
     },
 slotsDate:{
     type:String,
     required:true
 }
});
 
const vaccineModel=mongoose.model('Vaccination', vaccinationSchema);
module.exports=vaccineModel;
