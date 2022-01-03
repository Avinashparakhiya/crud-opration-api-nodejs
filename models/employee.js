const mongoose=require('mongoose')
const Schema=mongoose.Schema
const employee=new Schema(
    {
        name:{
            type:String
        },
        age:{
            type:Number
        },
        mobileno:{
            type:Number
        },
        email:{
            type:String
        },
        password:{
            type:String
        },
    },
    {
        timestamps:true
    }
)


const Employee=mongoose.model('Employee',employee)
module.exports=Employee