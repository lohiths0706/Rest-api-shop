const express=require('express')
const router=express.Router()
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'order is fetch'
    })
})
router.post('/',(req,res,next)=>{
    const order={
        ordername:req.body.ordername,
        orderq:req.body.orderq
        };
    res.status(200).json({
        message:'order is ',
        orderDetail:order
    })
})
router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'order is ',
        orderId: req.params.orderId
    })
})
router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'order is delate',
        orderId: req.params.orderId
    })
})
module.exports=router