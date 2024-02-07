import { Video, VideoToSave } from './hooks/types'
import api from './baseAPI'

    //axios, lista todo la db
  export const fetchVideos = async () =>{
    const {data}= await api.get<Video[]>(`/`)
    return data
}

export const addVideo = async(video : VideoToSave)=>{ await api.post<Video>('/', video)}

export const deleteVideo = async(id : string | undefined) =>{ await api.delete(`/${id}`)}

export const updatedVideo = async(video:Video) => { await api.put(`/${video._id}`, video)}