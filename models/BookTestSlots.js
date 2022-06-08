const mongoose= require ('mongoose');
const { required } = require('nodemon/lib/config');

const TestingSchema= new mongoose.Schema({
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
testType:{
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
 
const testingModel=mongoose.model('Testing', TestingSchema);
module.exports=testingModel;
      