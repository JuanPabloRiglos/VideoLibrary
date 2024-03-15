import { UserStore } from "../ZustandStore/userStore"
import { Video } from "./types"
import { user } from "./types.users"
import { useApiUsersHook } from "./useApiUsers"


export function useUserDataHandler(){
    
    const {editeUser} = useApiUsersHook()
    const {addUserLogged, userLogged} =  UserStore()


    const editUserStoreYDb = (fintalData : user) => {// Edita el usuario del perfilForm
        editeUser.mutate(fintalData)
		addUserLogged(fintalData)
    }

    const addVideoUserDbStore = async (allVideos:Video[])=>{ // tambien termina siendo una edicion 
        console.log('todos los videos de la app :', allVideos)
        console.log('saque el utimo video que me llego, es :',allVideos)
        const updatedUservideos = allVideos.filter(video => video.owners?.includes(userLogged._id))
        console.log('filtrados por id del usuario', updatedUservideos)

        if(updatedUservideos.length === userLogged.videos?.length){
            console.log('los videos del usuario estan actualizados')
            return
        }else{
            const updatedUser = {...userLogged, videos:[...updatedUservideos]}
             addUserLogged(updatedUser)
             editeUser.mutate(updatedUser)
        }


    }

    const editedVideoUserDbStore =(video : Video)=>{
      
        
        const userVideos = [...userLogged.videos !] 
        const oldVideo = userVideos.findIndex(item => item.url == video.url)
      oldVideo != -1 ? userVideos[oldVideo]= video : console.log('no se encontro el video a editar')
        const updatedUser : user = {...userLogged, videos: [...userVideos]}
        addUserLogged(updatedUser)
        editeUser.mutate(updatedUser)
    }

    const canDeleteVideo = (item : Video)=>{
   
        const userVideos = [...userLogged.videos !]
        const findItem = userVideos.findIndex(video => video.url == item.url)
        if(findItem != -1){
            return true
        }else{
            return false
        }
    }

    const userDbDeleteVideo = (id : string)=>{
    
        const userVideos = [...userLogged.videos !]
        console.log('que ha en los videos:,', userVideos)
        let fileredVideos;
        userVideos[0]._id ?fileredVideos = userVideos.filter(video => video._id != id) :fileredVideos = userVideos.filter(video => video.url != id)

        const updatedUser = {...userLogged, videos : [...fileredVideos]}
        addUserLogged(updatedUser)
        editeUser.mutate(updatedUser)
    }

    return {editUserStoreYDb, addVideoUserDbStore, editedVideoUserDbStore, canDeleteVideo, userDbDeleteVideo}
}