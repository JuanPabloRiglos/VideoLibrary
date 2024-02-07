import  express, { urlencoded }  from "express";
import cors  from "cors";
import videoRoutes from './routes/videos.rutes'
import morgan from "morgan";
const app = express();

//setings
app.set('port', process.env.PORT || 3444)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use(videoRoutes)

export default app