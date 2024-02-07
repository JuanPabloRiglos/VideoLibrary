import { Video } from './hooks/types'
import api from './baseAPI'

    //axios, lista todo la db
  export const fetchVideos = async () =>{
    const {data}= await api.get<Video[]>(`/`)
    return data
}