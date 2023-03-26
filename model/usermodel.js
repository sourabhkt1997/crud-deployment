let mongoose=require("mongoose")


let userSchema=mongoose.Schema({
  email:String,
  password:String,
},{
    versionKey:false
})

UserModel=mongoose.model("todouser",userSchema)

module.exports={UserModel}