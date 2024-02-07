import { useQuery } from '@tanstack/react-query'
import { fetchVideos} from '../services'

export function useFetchVideos(){
    return useQuery( {queryKey:['videos'], queryFn:fetchVideos})
}

// export function useAddVideo (){ return useMutation({mutationFn: addVideo})} -> lo tuve que aplicar directamente en el form