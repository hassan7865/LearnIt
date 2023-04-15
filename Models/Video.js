const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema({
    title:{type:String,required:true},
    imgUrl:{type:String,required:true},
    videoUrl:{type:String,required:true},
    description:{type:String,required:true},
    views:{type:[String],default:[]},
    like:{type:[String],default:[]},
    category:{type:String},
    comments:[
        {
        username:{type:String},
        profile:{type:String},
        desc:{type:String},
        date:{type:String}
        }

    ]
},{timestamps:true})

module.exports = mongoose.model("Video",VideoSchema)