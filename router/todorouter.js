let express=require("express")

let todorouter=express.Router()

let {TodoModel}=require("../model/todomodel")
const jwt=require("jsonwebtoken")

todorouter.post("/addtodo",async(req,res)=>{
    let payload=req.body
    console.log(payload,"jjj")
    try{
        console.log(payload,"eee")
        let data=new TodoModel(payload)
        console.log(data,"uuuu")
         await data.save()
         res.status(200).send({"msg":"new todo added"})
    }
    catch(err){
        console.log(err)
        res.status(400).send({"msg":"not able to add todo"})
    }
})

todorouter.get("/",async(req,res)=>{
     let token=req.headers.authorization.split(" ")[1]
     let decoded=jwt.verify(token,"bruce")
     console.log(decoded)
    try{
        if(decoded){
        let data= await TodoModel.find({"userid":decoded.userid})
         res.status(200).send(data)
        }
        else{
            res.status(400).send({"messgae":"user has not been created any todo yet"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({"msg":"not able to get"})
    }
})

todorouter.patch("/update/:id",async(req,res)=>{
    let {id}=req.params
    let payload=req.body
    console.log(payload)
    let token=req.headers.authorization.split(" ")[1]
    let decoded=jwt.verify(token,"bruce")
    try{
        if(decoded){
            let data=await TodoModel.findByIdAndUpdate({_id:id},payload)
            res.status(200).send(data)
        }
        else{
            res.status(400).send({"messgae":"cant able to update"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({"msg":"not able to edit"})
    }
})

todorouter.delete("/delete/:id",async(req,res)=>{
    let {id}=req.params
    let token=req.headers.authorization.split(" ")[1]
    let decoded=jwt.verify(token,"bruce")
    try{
        if(decoded){
            let data=await TodoModel.findByIdAndDelete({_id:id})
            res.status(200).send({"message":"todo deleted"})
        }
        else{
            res.status(400).send({"messgae":"cant able to delete"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({"msg":"not able to delete"})
    }
})



module.exports={todorouter}