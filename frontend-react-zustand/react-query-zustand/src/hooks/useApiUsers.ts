
import { addUser, getOneUser, updatedUser, getAllUsers} from '../services'
import { useMutation , useQueryClient, UseQueryResult, useQuery} from  '@tanstack/react-query';
import { user, userLogginState } from './types.users';

export function useApiUsersHook(){

const queryClient = useQueryClient()
//add video a db
const useaddUser = useMutation({mutationFn: addUser, 
    onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ['users'] })}// compara el cache con la db, si hay cambios, pide data de nuevo  se renderiza en el useFetchVideos.
})

//edit
 const editeUser = useMutation({mutationFn: updatedUser, 
    onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ['videos'] })}// LE HABIA DEJAO EL QUERYKEY EN VIDEOS, VER SI SE ROMPIO ALGO ==>  compara el cache con la db, si hay cambios, pide data de nuevo  se renderiza en el useFetchVideos.
})


 function useGetAllUsers(): UseQueryResult<user[]>{
    return useQuery( {queryKey:['users'], queryFn:getAllUsers})
}

//login
const getUser = async (userToLogin : userLogginState) : Promise<user | undefined >=>{
    const user  = await getOneUser(userToLogin )
   
   return user
  }// averiguar como se haria con useQuery


//   const  deleteVideoMutation = useMutation({mutationFn:deleteVideo, onSuccess : ()=>{
//     queryClient.invalidateQueries({queryKey:['videos']})
// }})

return{  useaddUser,  getUser, editeUser, useGetAllUsers}
}
