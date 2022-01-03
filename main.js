const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyparser=require('body-parser')

const EmpRoute=require('./routes/app')
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/login_registration')
const db=mongoose.connection

db.on('error',(err)=>
{
    console.log(err);
})

db.once('open',()=>
{
    console.log("Data Base Connection Establish");
})

const app=express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const Port=process.env.Port || 3100

app.listen(Port,()=>
{
    console.log(`Server Is Running port Number ${Port}`);
})

app.use('/',EmpRoute)