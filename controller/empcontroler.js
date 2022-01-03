const response = require('express')
const Employee=require('../models/employee')
//const joi=require('joi')
//const Joi = require('joi')

const index=(req,res,next)=>
{
Employee.find().then(response=>
    {
        res.json(
            {
             response   
            }
        )
    })
    .catch(error=>
        {
            res.json(
                {
                    message:'An Error Occured!'
                }
            )
        })
}

const show=(req,res,next)=>
{
    let employeeID=req.body.employeeID
    Employee.findById(employeeID)
    .then(response=>
        {
            res.json(
                {
                    response
                }
            )
        }).catch(error=>
            {
                res.json({
                    message:'An error occured'
                })
            })
}

const store=(req,res,next)=>
{
    let employee=new Employee(
        {
            name:req.body.name,
            age:req.body.age,
            mobileno:req.body.mobileno,
            email:req.body.email,
            password:req.body.password

        }
    )
    // const schema=Joi.object().keys({
    //     name:Joi.string().required(),
    //     age:Joi.number().required(),
    //     mobileno:Joi.number().required(),
    //     email:Joi.string.required().email().trim(),
    //     password:Joi.string().min(5).max(10).required()
    // })
    // Joi.valid
    // employee.save(req.body,schema,(err,result)=>
    // {
    //     if(err)
    //     {
    //         res.send('An Error has Ocured')
    //     }
    //     console.log(result);
    //     res.send('Successfully posted data')
    // })
    .then(response=>
        {
            res.json({message:'Employee Add Succesfully'})
        })
        .catch(error=>
            {
                res.json({
                    message:'An Error occured'
                })
            })
}


const update=(req,res,next)=>
{
    let employeeID=req.body.employeeID

    let updateData=
    {
         name:req.body.name,
        age:req.body.age,
        mobileno:req.body.mobileno,
        email:req.body.email,
        password:req.body.password

    }

    Employee.findByIdAndUpdate(employeeID,{$set:updateData})
    .then(()=>
    {
        res.json(
            {
                message:'Employee updated Successfully'
            }
        )
    })
    .catch(error=>{
        res.json({
            message:'An error Occured'
        })
    })
}

const destroy=(req,res,next)=>
{
    let employeeID=req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(()=>
    {
       req.json({
           message:'Employee De;eted Succesully'
       }) 
    })
    .catch(error=>
        {
            req.json(
                {
                    message:'An Error Occured'
                }
            )
        })
}

module.exports={index,show,store,update,destroy}

