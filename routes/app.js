const express=require('express')
const router=express.Router()

const EmpController=require('../controller/empcontroler')

router.get('/',EmpController.index)
router.post('/show',EmpController.show)
router.post('/store',EmpController.store)
router.post('/update',EmpController.update)
router.post('/delete',EmpController.destroy)

module.exports=router
