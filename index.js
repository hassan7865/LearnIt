const express = require("express")
const app = express()
const path = require("path")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./Routes/auth")
const videoRoute = require("./Routes/video")
const userRoute = require("./Routes/user")
const cors = require("cors")
dotenv.config()
app.use(express.json())
const connect = ()=>{
    mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("DB Connection SuccessFull!!")}).catch((err)=>{
        throw err
})
}
app.use("/api/video",videoRoute)
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",function(_,res){
    res.sendFile(
        path.join(__dirname,"./frontend/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

app.listen(process.env.PORT,()=>{
    connect()
    console.log(`Server Started At Port ${process.env.PORT}!!`)
})
