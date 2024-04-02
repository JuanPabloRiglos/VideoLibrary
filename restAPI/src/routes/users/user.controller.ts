import { RequestHandler } from "express"

import UserModel from './userModel'

 export const getUsers : RequestHandler = async(req, res)  => {
    try{
        const users = await UserModel.find()
        return res.json(users)
    }catch(err){
        res.send(err)
        
    }
}

// Encuentra mediante Email, lo debo pasar en el Body, no como param
export const getOneUser : RequestHandler = async(req, res)  => {
    const email =  req.params.email
    // const passwordParams =  req.params.password
    const founded = await UserModel.findOne({email})

     if(! founded){ return res.status(204).json({message: 'User not founded'})}
//     else if(founded.password !== passwordParams){return res.status(401).json({message:'Las contraseñas no coinciden'})
// } 
else { return res.json(founded)
    
}}

export const createUser : RequestHandler = async(req, res)  => {
   const isInDb = await UserModel.findOne({email: req.body.email})
    if(isInDb){ return res.status(301).json({message:'The email alredy exist in DB'})
    }
    const user = new UserModel(req.body)
    const saveUser = await user.save()
    res.status(200).json(saveUser)}

 
export const updateUser : RequestHandler = async(req, res)  => {
   const userUpdated = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new:true} )
   if(!userUpdated) {return res.status(204).json({message:'User not founded'})}
   return res.json(userUpdated)
}

export const DeleteUser : RequestHandler = async(req, res)  => {
    const id = req.params.id
    const founded = await UserModel.findByIdAndDelete(id)

    if(!founded){ return res.status(204).json({message: 'User not founded'})}else { return res.json(founded)
    
}}
