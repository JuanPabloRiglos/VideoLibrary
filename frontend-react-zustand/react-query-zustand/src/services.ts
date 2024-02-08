import { Video, VideoToSave } from './hooks/types'
import api from './baseAPI'

    //axios, lista todo la db
  export const fetchVideos = async () =>{
    const {data}= await api.get<Video[]>(`/`)
    return data
}

export const addVideo = async(video : VideoToSave)=>{ await api.post<Video>('/', video)}

export const getOneVideo = async(id : string) =>{  const {data} =await api.get<Video>(`/${id}`)
return data}

export const deleteVideo = async(id : string) =>{ await api.delete(`/${id}`)}

export const updatedVideo = async(video:Video | VideoToSave) => { await api.put<Video>(`/${video._id}`, video)}