const User = require("../Models/User")
const bcrypt = require("bcryptjs")
const router = require("express").Router()
const jwt = require("jsonwebtoken")
router.post("/signup",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        const email = await User.findOne({email:req.body.email})
        if (user){
            res.status(401).json("duplicateuser")
        }
        else if(email){
            res.status(401).json("duplicateemail")
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newuser = User({...req.body,password:hash})
            const Saveduser = await newuser.save();
            res.status(200).json(Saveduser)
        }
    }catch(err){
        res.status(500).json(err)
    }
})
router.post("/signin",async(req,res)=>{
    try{
    const user = await User.findOne({username:req.body.username})
    if (user){
        const checkpassword =  bcrypt.compareSync(req.body.password,user.password)
        if (checkpassword){
            const token = jwt.sign({id:user._id},process.env.JWTKEY)
            const {password,...other} = user._doc
            res.status(200).json({...other,token})
        }else{
            res.status(401).json("password")
        }
    }else{
        res.status(401).json("user")
    }
}catch(err){
    res.status(500).json(err)
}
})

module.exports = router