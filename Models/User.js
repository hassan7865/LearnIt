const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    profile:{type:String,default:"https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"},
    myList:{type:[String],default:[]},
    isAdmin:{type:Boolean,default:false}
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema)