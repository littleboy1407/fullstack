const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    fullname:{type:String,required:true},
    phone:{type:String,required:true,unique:true},
    dob:{type:Date},
    avatar:{type:String},
})

const User = mongoose.model("User",UserSchema)
module.exports={User,UserSchema}