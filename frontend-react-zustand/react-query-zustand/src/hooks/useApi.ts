import { useQuery } from '@tanstack/react-query'
// import { fetchVideos} from '../services'
import { Video } from '../hooks/types'
import api from '../baseAPI'

    //axios, lista todo la db
   const fetchVideos = async () =>{
    const {data}= await api.get<Video[]>(`/`)
    return data
}

export function useFetchVideos(){
    return useQuery( {queryKey:['videos'], queryFn:fetchVideos})
}