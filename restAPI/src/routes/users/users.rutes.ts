import { Router } from "express";
import * as userController from './user.controller'
const routes = Router()

routes.get('/', userController.getUsers)
routes.post('/', userController.createUser)
routes.get('/:email/', userController.getOneUser)
// routes.get('/:email/?:password/', userController.getOneUser) //atento que le pego a /email
routes.put('/:id', userController.updateUser)
routes.delete('/:id', userController.DeleteUser)
export default routes