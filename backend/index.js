let express=require("express")
let app=express()

let {connection}=require("./db")
let {todorouter}=require("./router/todorouter")
let {userrouter}=require("./router/userrouter")
let {auth}=require("./middelware/auth.miidlewae")
require("dotenv").config()
app.use(express.json())

let cors = require('cors')
app.use(cors())
app.use("/user",userrouter)
app.use(auth)
app.use("/todo",todorouter)

 

app.listen(process.env.port,async()=>{
    try{
       await connection
       console.log(`server running in port ${process.env.port}`)
    }
    catch(err){
        console.log("not able to connect")
        console.log(err)
    }
})