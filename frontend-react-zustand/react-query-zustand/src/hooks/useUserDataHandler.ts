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

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Trabajo sobre videos en el usuario =-=-=-=-=-=-=-=-
    const addVideoUserDbStore = async (allVideos:Video[])=>{ // tambien termina siendo una edicion 
        const updatedUservideos = allVideos.filter(video => video.owners?.includes(userLogged._id))
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

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=Trabajo en las Playlist en el Usuario

const addPlToUserDb= (newList: string)=>{
    console.log('llega al addPlTouser esto', newList)
    const oldsPl = userLogged.playlists
    let updatedPl;
    !oldsPl ? updatedPl= [ {name:newList, content:[]}] : updatedPl= [...oldsPl, {name:newList, content:[]}]
    const updatedUser : user = {...userLogged, playlists: [...updatedPl]}
    addUserLogged(updatedUser)
    editeUser.mutate(updatedUser)
    
}

const deletePlToUserDb= (listToDl: string)=>{
    console.log('llega al deletePL esto', listToDl)
    const oldsPl = userLogged.playlists
    const updatedPl = oldsPl.filter(pl => pl.name != listToDl)
    const updatedUser : user = {...userLogged, playlists: [...updatedPl]}
    addUserLogged(updatedUser)
    editeUser.mutate(updatedUser)
    
}

const addVideoToUsrPl= (plName:string, videoId:string)=>{

    const plToUpdate = userLogged.playlists.findIndex(pl=> pl.name == plName)
   if (plToUpdate < 0 ){
    console.log('no se encontro la playlist')
   } else{
    const isInPL = userLogged.playlists[plToUpdate].content.includes(videoId)
    let contentIndex = userLogged.playlists[plToUpdate].content.length 
     contentIndex > 0 ? contentIndex = contentIndex-1 : contentIndex
    !isInPL ? userLogged.playlists[plToUpdate].content[contentIndex] = videoId :
    console.log('el video ya estaba en la lista del usuario')
   }

   // AGREGAR TOPIC A LOS VIDEOS ACA PARA QUE QUEDE SINCRONIZADO
   const videoIndex = userLogged.videos?.findIndex(video => video._id == videoId)
   userLogged.videos[videoIndex].topyc = plName
   
   addUserLogged(userLogged)
   editeUser.mutate(userLogged)
}

    return {editUserStoreYDb, addVideoUserDbStore, editedVideoUserDbStore, canDeleteVideo, userDbDeleteVideo, addPlToUserDb, deletePlToUserDb , addVideoToUsrPl}
}