import {  Schema , model } from "mongoose";

const userSchema = new Schema({
    name:{
        type : String,
        require: true,
        trim:true
    },
    email:{
        type : String,
        require: true,
        trim:true, 
        unique:true
    }, 
    image:{
        type : String,
    }, 
    password:{
        type: String,
        require:true
    }
},{
    versionKey:false,
    timestamps:true
});

export default model('UserModel', userSchema)