// import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { addUser, getOneUser, updatedUser } from '../services'
import { useMutation , useQueryClient} from  '@tanstack/react-query';
import { user, userLogginState } from './types.users';

export function useApiUsersHook(){

const queryClient = useQueryClient()
//add video a db
const useaddUser = useMutation({mutationFn: addUser, 
    onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ['users'] })}// compara el cache con la db, si hay cambios, pide data de nuevo  se renderiza en el useFetchVideos.
})

//edit
 const editeUser = useMutation({mutationFn: updatedUser, 
    onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ['videos'] })}// compara el cache con la db, si hay cambios, pide data de nuevo  se renderiza en el useFetchVideos.
})


//  function useFetchVideos(): UseQueryResult<user[]>{
//     return useQuery( {queryKey:['videos'], queryFn:fetchVideos})
// }

//login
const getUser = async (userToLogin : userLogginState) : Promise<user | undefined >=>{
    const user  = await getOneUser(userToLogin )
   
   return user
  }// averiguar como se haria con useQuery


//   const  deleteVideoMutation = useMutation({mutationFn:deleteVideo, onSuccess : ()=>{
//     queryClient.invalidateQueries({queryKey:['videos']})
// }})

return{  useaddUser,  getUser, editeUser}
}
