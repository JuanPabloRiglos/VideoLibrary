import mongoose from "mongoose";
import config from './config'

const URIMONGO = process.env.DBURI ? process.env.DBURI : 'mongodb://127.0.0.1:27017/test' 
 

// (async()=>{
//     try{
//         const db = await mongoose.connect(`mongodb://127.0.0.1:27017/${config.MONGO_DATABASE}`)
//          console.log(console.log('database is conected to :', db.connection.name))
//      } catch(err){
//         console.log(err)
//     }
// })()


mongoose.connect(URIMONGO)

const connection = mongoose.connection

connection.once('open',()=>{
    console.log('Se conecto la db PAPA')
})

