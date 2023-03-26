let mongoose=require("mongoose")


let todoSchema=mongoose.Schema({
  task:String,
  date:String,
  status:String,
  userid:String
},{
    versionKey:false
})

TodoModel=mongoose.model("tododata",todoSchema)

module.exports={TodoModel}