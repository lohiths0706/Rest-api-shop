const express=require('express')
const app=express()
const morgan=require('morgan')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const productRoutes=require('./api/router/product')
const orderRoutes=require('./api/router/order')
app.use(morgan('dev'))
mongoose.connect("mongodb+srv://lohiths0706:lohith@cluster0.hlyy1bl.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(bodyParser.urlencoded({extend:false}))
app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","*")
    if(req.method==='OPTIONS')j
    {
        res.header('Access-Control-Allow-Origin,PUT,POST,PATCH,DELETE')
            return res.status(200).json({});
    }
    next();
});
app.use('/product',productRoutes)
app.use('/order',orderRoutes)
app.use((req,res,next)=>{
    const error=new error('not found');
    error.status(404);
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error :{
            message:error.message
        }
    })

})

module.exports=app