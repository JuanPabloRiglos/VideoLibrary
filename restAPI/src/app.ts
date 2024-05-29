import  express, { urlencoded }  from "express";
import cors  from "cors";
import videoRoutes from './routes/videos/videos.rutes';
import userRoutes from './routes/users/users.rutes'
import morgan from "morgan";
require('dotenv').cofig()
const app = express();


//setings
app.set('port', process.env.PORT || 3444)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use('/videos', videoRoutes)
app.use('/users', userRoutes)

export default app