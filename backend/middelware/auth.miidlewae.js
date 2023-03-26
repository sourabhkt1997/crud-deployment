let jwt=require("jsonwebtoken")

let auth=(req,res,next)=>{
    let token=req.headers.authorization
    if(token){
        let decoded=jwt.verify(token.split(" ")[1],"bruce")
        console.log(decoded)
        if(decoded){
            console.log(decoded.userid)
           req.body.userid=decoded.userid
            next()
        }
        else{
            res.status(400).send({"message":"please login first"})
        }
    }
    else{
        res.status(400).send({"message":"please login first"})
    }
}

module.exports={auth}