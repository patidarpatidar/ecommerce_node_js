const express = require('express');
const User = require('./db/User');
const Product = require('./db/Product')
require('./db/config');
const app = express();
const cors = require('cors');
const { response } = require('express');

app.use(express.json());
app.use(cors())
const jwt = require('jsonwebtoken');
const jwtKey = 'e-comm'
app.post("/register",async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send('somthing went wrong...')
        }
        else{
            res.send({user:result,auth:token})
        }
    })
})

app.post("/login",async (req,res)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password")
        if(user){
            jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send('somthing went wrong...')
                }
                else{
                    res.send({user,auth:token})
                }
            })
        }
        else{
            res.send('No user.....')
        }
    }
    else {
        res.send('plz enter email and password..')
    }
   
})

app.post("/add-product",verifyToken,async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})

app.get('/products',verifyToken,async(req,res)=>{
    let products = await Product.find();
    if(products.length){
        res.send(products);
    }
    
})
app.delete('/product/:id',verifyToken,async(req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    if(result){
        res.send(result)
    }
    
})

app.get('/product/:id',verifyToken,async(req,res)=>{
    const result = await Product.findOne({id:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:'no product found'})
    }
})

app.put('/product/:id',verifyToken,async(req,res)=>{
    const result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set : req.body
        }
    )
    res.send(result)
})
app.get('/search/:key', verifyToken ,async(req,res)=>{
    const result = await Product.find(
       {
        "$or":[
            {name:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
        ]
       }
      
    )
    res.send(result)
})
 function verifyToken(req,res,next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        console.log("middleware called",token)
        jwt.verify(token, jwtKey, (err,valid)=>{
            if(err){
                console.log(err)
                res.send({result:'plz enter valid token '})
            }
            else{
                next();
            }
        })
       
    }
    else{
        res.send({result:'plz add token with header'})
    }
   
 }
app.listen(5000)