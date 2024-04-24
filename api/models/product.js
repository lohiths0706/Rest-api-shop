const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    _id: String,
    name:{type:String,required:true},
    price:{type:Number,reqiured:true}
})
module.exports=mongoose.model('Product',productSchema)