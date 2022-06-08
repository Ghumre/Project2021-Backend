const express =require('express');
const { json } = require('express/lib/response');
require('dotenv').config();

const User= require('./models/user');
require('./models/db');
const userRouter=require('./routes/user');
const adminRouter=require('./routes/admin');
const vaccinationRouter=require('./routes/Appointment');
const testingRouter=require('./routes/BookTestSlots');
const Vaccinations=require('./models/Appointment');
const vaccineModel = require('./models/Appointment');
const { Vaccination }=require('./GetDataFuctions/Appointment');
const app=express(); 


app.use(express.json());
app.use(vaccinationRouter);
 app.use(adminRouter);
app.use(testingRouter);
app.use(userRouter);


app.get('/', (req, res)=>{
    res.json({success:true, message:'welcome to browser!'});
}); 

app.listen(8000, ()=>{
     console.log('port is listening');
});


   
//mongodb+srv://admin:<password>@cluster0.lbxza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
