import { Router } from "express";
import * as videoController from './videos.controller'
const routes = Router()

routes.get('/videos', videoController.getVideos)
routes.post('/videos', videoController.createVideo)
routes.get('/videos/:id', videoController.getOneVideo)
routes.put('/videos/:id', videoController.updateVideo)
routes.delete('/videos/:id', videoController.DeleteVideo)
export default routes