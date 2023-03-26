let express=require("express")

let userrouter=express.Router()

let {UserModel}=require("../model/usermodel")
let jwt=require("jsonwebtoken")
let  bcrypt = require('bcrypt')
// let {auth}=require("../middelware/auth.miidlewae")
// user

userrouter.post("/register",async(req,res)=>{
    let {email,password}=req.body
    try{
        bcrypt.hash(password, 5,async(err, hash)=> {
           let data=new UserModel({email,password:hash})
         await data.save()
         res.status(200).send({"msg":"new user added"})
        }); 
    }
    catch(err){
        console.log(err)
        res.status(400).send({"msg":"not able to register"})
    }
})

//login authentication
userrouter.post("/login",async(req,res)=>{
    let {email,password}=req.body
    try{
        let user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err, result)=> {
                if(result){
                    res.status(200).send({"message":"login success full","token":jwt.sign({"userid":user[0]._id},"bruce")})
                }
                else{
                    res.status(400).send({"message":"login failed"})
                }
            });
           
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({"msg":err.message})
    }
})




module.exports={userrouter}