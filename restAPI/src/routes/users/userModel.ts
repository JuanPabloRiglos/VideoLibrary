import {  Schema , model } from "mongoose";

const userSchema = new Schema({
  firstName:{
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
    lastName:{
        type: String,
        trim:true,
    },
    img:{
        type : String,
        trim:true,
    }, 
    password:{
        type: String,
        require:true
    }, 
    playlists: {
      name: String,
      content: []
    }, 
      videos:  {
        type: [], 
    
      }, 
      followers:  {
        type: [String], 
        default: [] 
      },
      followed:  {
        type: [String], 
        default: [] 
      },
},{
    versionKey:false,
    timestamps:true
});

export default model('UserModel', userSchema)