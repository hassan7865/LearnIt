const User = require("../Models/User")
const router = require("express").Router()
const verify = require("./verifyToken");
//!Update Profile
router.put("/updateprofile",verify,async(req,res)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            profile:req.body.profile
        })
        res.status(200).json("Profile Updated")
    }catch(err){
        res.status(500).json(err)
    }
})
router.put("/videolist/:id",verify,async(req,res)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $push:{myList:req.params.id}
        })
        res.status(200).json("Video Added to List")
    }catch(err){
        res.status(500).json(err)
    }
})
router.put("/Minvideolist/:id",verify,async(req,res)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{myList:req.params.id}
        })
        res.status(200).json("Video Removed from List")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/current",verify,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/finduser/:username",verify,async(req,res)=>{
    try{
        const user = await User.findOne({username:req.params.username})
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router