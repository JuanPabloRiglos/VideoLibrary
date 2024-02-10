import { useQuery } from '@tanstack/react-query'
import { fetchVideos, updatedVideo, addVideo, getOneVideo} from '../services'
import { useMutation , useQueryClient} from  '@tanstack/react-query';
import { Video } from './types';
export function useApiHook(){
const queryClient = useQueryClient()
//add video a db
const useAddVideo = useMutation({mutationFn: addVideo, 
    onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ['videos'] })}// compara el cache con la db, si hay cambios, pide data de nuevo  se renderiza en el useFetchVideos.
})

//edit
 const editedVideo = useMutation({mutationFn: updatedVideo, 
    onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ['videos'] })}// compara el cache con la db, si hay cambios, pide data de nuevo  se renderiza en el useFetchVideos.
})

 function useFetchVideos(){
    return useQuery( {queryKey:['videos'], queryFn:fetchVideos})
}

const getVideo = async (id:string)=>{
    const res : Video  = await getOneVideo(id)
    const {title, url, description, _id, topyc} = res
    const videoToShow = {title, url, description, _id, topyc }
    return videoToShow
  }

return{ editedVideo, useFetchVideos, useAddVideo, getVideo}
}

// export function useAddVideo (){ return useMutation({mutationFn: addVideo})} -> lo tuve que aplicar directamente en el form