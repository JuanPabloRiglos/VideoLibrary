import mongoose, {  Schema , model } from "mongoose";

const videoSchema = new Schema({
       
    title:{
        type : String,
        require: true,
        trim:true
    },
    description:{
        type : String,
        require: true,
        trim:true
    }, 
    url:{
        type : String,
        require: true,
        trim:true, 
        unique: true
    }, 
    topyc:{type:String,
        trim:true},
    owners:{
            type:  [
                String
                ]}
},{
    versionKey:false,
    timestamps:true
});

export default model('VideoModel', videoSchema)