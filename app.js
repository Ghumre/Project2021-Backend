const express =require('express');
const { json } = require('express/lib/response');
require('dotenv').config();

const User= require('./models/user');
require('./models/db');
const userRouter=require('./routes/user');

const app=express();


app.use(express.json());

app.use(userRouter);

// const test=async (email,password)=>{
//     const user=await User.findOne({email:email});
//      const result=await user.comparePassword(password);
//      if(!result) return console.log({success:false,message:'Password s not matchng!'});
//      console.log(result);
// }

// test('eww12@email.com','63334i');


app.get('/', (req, res)=>{
    res.json({success:true, message:'welcome to browser!'});
}); 

app.listen(8000, ()=>{
     console.log('port is listening');
});



//mongodb+srv://admin:<password>@cluster0.lbxza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority