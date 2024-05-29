import mongoose from "mongoose";
require('dotenv').config()


const URIMONGO = process.env.DBURI 


mongoose.connect(URIMONGO !)

const connection = mongoose.connection

connection.once('open',()=>{
    console.log('Se conecto la db PAPA')
})

