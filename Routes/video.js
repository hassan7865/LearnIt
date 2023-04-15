const User = require("../Models/User")
const Video = require("../Models/Video")
const verify = require("./verifyToken")
const router = require("express").Router()

router.post("/newvideo",verify,async(req,res)=>{
    const user = await User.findById(req.user.id)
    if (user.isAdmin === true){
    try{
        const newvideo = new Video(req.body)
        const savedvideo = await newvideo.save()
        res.status(200).json(savedvideo)
    }catch(err){
        res.status(500).json(err)
    }
}
})
router.get("/onevideo",verify,async(req,res)=>{
    try{
        const random = await Video.aggregate([{$sample:{size:1}}])
        res.status(200).json(random)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/random",verify,async(req,res)=>{
    try{
        const one = await Video.aggregate([{$sample:{size:20}}])
        res.status(200).json(one)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/deletevideo/:id",verify,async(req,res)=>{
    const user = await User.findById(req.user.id)
    if (user.isAdmin === true){
        try{
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("Video Deleted ")
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You are not admin")
    }
})
router.put("/view/:id",verify,async(req,res)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $addToSet:{views:req.user.id}
        })
        res.status(200).json("View Added")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/popular",verify,async(req,res)=>{
    try{
        const popular =await Video.find()
        const video = popular.sort((a,b)=>(b.views.length)-(a.views.length))
        res.status(200).json(video)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/python",verify,async(req,res)=>{
    try{
        const video = await Video.find({category:"python"})
        res.status(200).json(video)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/javascript",verify,async(req,res)=>{
    try{
        const video = await Video.find({category:"javascript"})
        res.status(200).json(video)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/list",verify,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        const listvideos = user?.myList
        const list = await Promise.all(
            listvideos.map((id)=>{
                return Video.findById(id)
            })
        )
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/allvideos",verify,async(req,res)=>{
    try{
        const video =await Video.find()
        res.status(200).json(video)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/searchvideo/:id",verify,async(req,res)=>{
    try{
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    }catch(err){
        res.status(500).json(err)
    }
})
router.put("/addreview/:id",verify,async(req,res)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $push:{comments:req.body}
        })
        res.status(200).json("Comment Added")
    }catch(err){
        res.status(500).json(err)
    }
})
router.put("/deletereview/:videoid/:index",verify,async(req,res)=>{
    const arrIndex = `comments.${req.params.index}`
    try{
        await Video.findByIdAndUpdate(req.params.videoid,{
            $unset : {[arrIndex] : 1 },
        })
        await Video.findByIdAndUpdate(req.params.videoid,{
            $pull : {"comments" : null}
        })
        res.status(200).json("Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.put("/videodislike/:id",verify,async(req,res)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $pull:{like:req.user.id}
        })
        res.status(200).json("Video Dislike")
    }catch(err){
        res.status(500).json(err)
    }
})
router.put("/videolike/:id",verify,async(req,res)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $push:{like:req.user.id}
        })
        res.status(200).json("Video Liked")
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router