const { is } = require('express/lib/request');
const mongoose= require ('mongoose');
const { required } = require('nodemon/lib/config');

const bcrypt=require('bcrypt');
const { buffer } = require('sharp/lib/is');


const userSchema=new  mongoose.Schema({
         firstname:{
             type:String,
             required:true
         },

         secondname:{
            type:String,
            required:true
         },

         age:{
             type:Number,
             required:true

         },

         email:{
             type:String,
             required:true

         },
         
         phoneno:{
             type:Number,
             required:true
         },

         AdharNo:{
             type:Number,
             required:true
         },
         gender:{
             type:String,
             required:true
         },
         username:{
             type:String,
         },
         password:{
             type:String,
             required:true
         },

         avtar:String,
        

});

userSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8,(err, hash)=>{
            if(err) return next(err);

            this.password= hash;
            next();
        });
    }
});

userSchema.methods.comparePassword= async function(password){
    if(!password) throw new Error('Password is missing ,can not compare!');
    try{
        const result=await bcrypt.compare(password, this.password);
        return result;
    }catch(error){
        console.log('Error while comparing password!',error.message);
    }
};

userSchema.statics.isThisEmailInUse=async function (email){
    if(!email)throw new error('Invalid Email!');
    
    try{
    const user=await this.findOne({email});
    if(user) return false
     return true;
    }
    catch(err){
        console.log('error inside isThisEmailInUse method',err.message)
        return false
    }
}

userSchema.statics.isThisPhoneNoInUse=async function (phoneno){
    if(!phoneno)throw new error('Invalid Phone Number!');
    
    try{
    const user=await this.findOne({phoneno});
    if(user) return false
     return true;
    }
    catch(error){
        console.log('error inside isThisPhoneNoInUse method',error.message)
        return false
    }
}

userSchema.statics.isThisAdharCardNoInUse=async function (AdharNo){
    if(!AdharNo)throw new error('Invalid Adhar Card Number!');
    
    try{
    const user=await this.findOne({AdharNo});
    if(user) return false
     return true;
    }
    catch(error){
        console.log('error inside isThisAdharCardNoInUse method',error.message)
        return false
    }
}

userSchema.statics.isThisUserNameInUse=async function (username){
    if(!username)throw new error('Invalid Phone Number!');
    
    try{
    const user=await this.findOne({username});
    if(user) return false
     return true;
    }
    catch(error){
        console.log('error inside isThisUserNameInUse method',error.message)
        return false
    }
}
module.exports=mongoose.model('User', userSchema);