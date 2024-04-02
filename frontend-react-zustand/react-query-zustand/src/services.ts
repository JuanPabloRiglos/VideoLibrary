/* eslint-disable @typescript-eslint/no-unused-vars */
import { Video, VideoToSave } from './hooks/types'
import {api, apiUsers} from './baseAPI'
import { userLogginState, user } from './hooks/types.users'
    //axios, lista todo la db
  export const fetchVideos = async () =>{
    const {data}= await api.get<Promise<Video[]>>(`/`)
  return data}
// consumo de Video Api


export const addVideo = async(video : VideoToSave)=>{ 
  console.log('que le llega al addVideo :', video)
  try{
    const {data}=  await api.post<Video>('/', video)
    console.log('esto devuelve la creacion del video',data)
  }catch(err){
    console.log('error al crear video:', err)
  }
 }

export const getOneVideo = async(id : string) =>{  const {data} =await api.get<Video>(`/${id}`)
return data}

export const deleteVideo = async(id : string) =>{
  console.log('esto le llega al delete vdeo :',id)
  try {
    await api.delete(`/${id}`)
  } catch(err){
    console.log('error en el borrado de video', err)
  }}

export const updatedVideo = async(video:Video | VideoToSave) => {
  console.log('que recibe el edit video', video)
  try{
    const response = await api.put<Video>(`/${video._id}`, video)
    console.log('respuesta del video mutate', response)
  }catch (err){
    console.log('error ene el video updated', err)
  } 
}

// =-=-=-=-=-=-=-=-=-=-=-=-= consumo de user api =-=-=-=-=-=-=-=-=-=-=-//

export const getAllUsers = async()=>{ 
  // console.log('entramos en la ejecucion del getAllUsers')
  try{
   const {data} = await apiUsers.get<Promise<user[]>>('/');
  //  console.log('esto devolvieron todos los usuarios', data)
   return data
  }catch(err){
    console.log('error en la creacion de usuarios :', err)
  }
  }

export const addUser = async(user : user)=>{ 
  try{
   const {data} = await apiUsers.post<user>('/', user);
   console.log(data)
  }catch(err){
    console.log('error en la creacion de usuarios :', err)
  }
  }

export const getOneUser = async(userToLogin : userLogginState ) : Promise<user | undefined>  =>{ 
  console.log('que le llega a getOneUSer', userToLogin)
  try{
    const {data} = await apiUsers.get<user>(`/${userToLogin.email}`)
    console.log('lo que devolvio el getOne fue :', data)
    return data
  }catch(err){
    console.log('hay error al requerir un usuario:', err)
    
  }
  // trabjar para que muestre cuando la password no coincide
  }


export const deleteUser = async(id : string) =>{ await apiUsers.delete(`/${id}`)}

export const updatedUser = async(user: user) => {
  console.log('le llega al update user: ',user )
  try{
   const {data}= await apiUsers.put(`/${user._id}`, user)
   console.log('respuesta de la edicion :', data)
  }catch(err){
    console.log('error al edtiar :', err)
  }
}