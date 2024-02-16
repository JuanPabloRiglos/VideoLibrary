/* eslint-disable @typescript-eslint/no-unused-vars */
import { Video, VideoToSave } from './hooks/types'
import {api, apiUsers} from './baseAPI'
import { userLogginState, user } from './hooks/types.users'
    //axios, lista todo la db
  export const fetchVideos = async () =>{
    const {data}= await api.get<Promise<Video[]>>(`/`)
  return data}
// consumo de Video Api
export const addVideo = async(video : VideoToSave)=>{ await api.post<Video>('/', video)}

export const getOneVideo = async(id : string) =>{  const {data} =await api.get<Video>(`/${id}`)
return data}

export const deleteVideo = async(id : string) =>{ await api.delete(`/${id}`)}

export const updatedVideo = async(video:Video | VideoToSave) => { await api.put<Video>(`/${video._id}`, video)}

// =-=-=-=-=-=-=-=-=-=-=-=-= consumo de user api =-=-=-=-=-=-=-=-=-=-=-//
export const addUser = async(user : user)=>{ await apiUsers.post<user>('/', user)}

export const getOneUser = async(user : userLogginState ) =>{ const {data} = await apiUsers.get<user>(`/${user.email}`)
  return data
  // trabjar para que muestre cuando la password no coincide
  }


export const deleteUser = async(id : string) =>{ await apiUsers.delete(`/${id}`)}

export const updatedUser = async(user: user) => { await apiUsers.put<Video>(`/${user._id}`, user)}