const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        phone:{
            type:String,
            required:true,
        },
        profileImage:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
        },
        profession:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        zip:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            required:true,
          
        }
    },
    {timestamps: true}
);
module.exports = mongoose.model("worker",UserSchema);