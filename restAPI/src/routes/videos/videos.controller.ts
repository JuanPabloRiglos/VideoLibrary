import { RequestHandler } from "express"

import VideoModel from './videos'

 export const getVideos : RequestHandler = async(req, res)  => {
    try{

        const videos = await VideoModel.find()
        return res.json(videos)
    }catch(err){
        res.send(err)
        console.log(err)
    }
}

export const getOneVideo : RequestHandler = async(req, res)  => {
    const id = req.params.id
    const founded = await VideoModel.findById(id)

    if(! founded){ return res.status(204).json({message: 'video not founded'})}else { return res.json(founded)
    console.log(founded)
}}

export const createVideo : RequestHandler = async(req, res)  => {
   const isInDb = await VideoModel.findOne({url: req.body.url})
    if(isInDb){ return res.status(301).json({message:'te URL alredy exist in DB'})

    }
    const video = new VideoModel(req.body)
    const saveVideo = await video.save()
    res.status(200).json(saveVideo)
return(video)}

 
export const updateVideo : RequestHandler = async(req, res)  => {
   const videoUpdated = await VideoModel.findByIdAndUpdate(req.params.id, req.body, {new:true} )
   if(!videoUpdated) {return res.status(204).json({message:'video not founded'})}
   return res.json(videoUpdated)
}

export const DeleteVideo : RequestHandler = async(req, res)  => {
    const id = req.params.id
    const founded = await VideoModel.findByIdAndDelete(id)

    if(!founded){ return res.status(204).json({message: 'video not founded'})}else { return res.json(founded)
    console.log(founded)
}}
