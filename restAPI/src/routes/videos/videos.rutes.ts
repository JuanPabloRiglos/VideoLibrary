import { Router } from "express";
import * as videoController from './videos.controller'
const routes = Router()

routes.get('/', videoController.getVideos)
routes.post('/', videoController.createVideo)
routes.get('/:id', videoController.getOneVideo)
routes.put('/:id', videoController.updateVideo)
routes.delete('/:id', videoController.DeleteVideo)
export default routes