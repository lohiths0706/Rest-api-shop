const express=require('express');
const route=express.Router();
const mongoose=require('mongoose')
const Product=require('../models/product')
route.get('/',(req,res,next)=>{
   Product.find()
   .select("name price _id")
   .exec()
   .then(docs=>{
    const response={
        count: docs.length,
        products: docs.map(doc=>{
            return{
            name:doc.name,
            price:doc.price,
            _id:doc._id,
            request:{
               type:'GET',
               url:'http://localhost:3000/product/' +doc._id
            }
            }

        })

    };
    //  if(docs.length>=0)
    // {
      res.status(200).json(response)
    // }
    // else{
    //     res.status(404).json({
    //      message:'no entries found'
    //    })
    //    }  
    // res.status(200).json(docs)
   })
   .catch(err=>{
    console.log(err)
    res.status(500).json({
        error:'the given id is deleted or'
    })
   })

    })

route.post('/',(req,res,next)=>{
    const product=new Product({
        _id:req.body.id,
        name:req.body.name,
        price:req.body.price
    });
    product
    .save()
    .then(result =>{
        console.log(result)
        res.status(200).json({
            message:'created product successfully',
            createdproduct:{
                name:result.name,
                price:result.price,
                _id:result._id,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/product/' +result._id
                }

            }
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
})
route.get('/:productId',(req,res,next)=>{
    const id=req.params.productId
    console.log(id)
    Product.findById(id)
    .exec()
    .then(doc=>{
        console.log("from database",doc);
        if(doc)
        {
           res.status(200).json(doc)
        }
        else{
            res.status(404).json({message:'not found for gven id'})
        }
    })
    .catch(err=>
    {
       console.log(err)
       res.status(500).json({
        message:' productId'
       });
    });
})
route.patch('/:productId',(req,res,next)=>{
    const id=req.params.productId;
    const updateOps={}
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    Product.UpdateOne({ _id: id },{$set:updateOps}).exec()
    .then(result=>{
        console.log(result)
        res.status.json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(200).json({
            message:'the update'
        })
          })
})
route.delete('/:productId',(req,res,next)=>{
   
    const id = req.params.productId;

Product.deleteOne({ _id: id })
  .exec()
  .then((result) => {
    if (result.deletedCount > 0) {
      console.log(result);
      res.status(200).json({
        message: 'Product deleted successfully'
      });
    } else {
      res.status(404).json({
        message: 'Product not found for the given id'
      });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });


    res.status(200).json({
        message:'you have delete the gievn id'
    })
})
module.exports=route