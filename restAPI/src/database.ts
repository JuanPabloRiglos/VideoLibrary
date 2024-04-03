import mongoose from "mongoose";
// import config from './config'
import dotenv from 'dotenv'
 
dotenv.config()
console.log('db en', process.env.DBURI)

const URIMONGO = process.env.DBURI ? process.env.DBURI : 'mongodb://127.0.0.1:27017/mernVideoDB' 
 
mongoose.connect(URIMONGO)//iria la url de mongoAtlas o en el .env

const connection = mongoose.connection

connection.once('open',()=>{
    console.log('Se conecto la db de Mongo de la VideoListApp')
})

