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
    console.log('estoy en el addvideo to user pl y llega esto', plName, videoId)
    const plToUpdate : number = userLogged.playlists.findIndex(pl=> pl.name == plName)
    console.log('el indice segun el nombre de la lista es, ', plToUpdate)
   if (plToUpdate < 0 ){
    console.log('no se encontro la playlist')
   } else{
    const isInPL = userLogged.playlists[plToUpdate].content.includes(videoId);
    console.log('esta agregado a la pl', isInPL)
    const contentIndex : number = userLogged.playlists[plToUpdate].content.length 
    console.log('content puntoLength, e index', contentIndex)
   if(!isInPL){ // si el video no esta, lo agrega al array
    userLogged.playlists[plToUpdate].content[contentIndex] = videoId }
else{   // si el video esta, deberia
      console.log('el videoantes de sacarlo de la lista', userLogged)
    userLogged.playlists[plToUpdate].content = userLogged.playlists[plToUpdate].content.filter(id => id != videoId)
    console.log('el video ya estaba en la lista del usuario', userLogged)
   }
   }
   // AGREGAR TOPIC A LOS VIDEOS ACA PARA QUE QUEDE SINCRONIZADO
   const videoIndex : number = userLogged.videos!.findIndex(video => video._id == videoId)
   userLogged.videos![videoIndex].topyc.includes(plName) ? userLogged.videos![videoIndex].topyc = '' :
   userLogged.videos[videoIndex].topyc = plName
   
   addUserLogged(userLogged)
   editeUser.mutate(userLogged)
}

const flollowHandler =(userToFollow) =>{
    console.log('en el handler, usuario a seguir original', userToFollow)
    console.log('user logged prev change', userLogged)

   const isFollow =  userToFollow.followers.includes(userLogged._id);
let updatedFollowers;
let updTateFollows;
  if (isFollow){ updatedFollowers = userToFollow.followers.filter(item => item != userLogged._id)
    updTateFollows = userLogged.followed?.filter(item => item != userToFollow._id) }else {
        updatedFollowers = [...userToFollow.followers, userLogged._id];
        updTateFollows = [...userLogged.followed, userToFollow._id]
}

userToFollow.followers = [...updatedFollowers]
userLogged.followed = [...updTateFollows]

console.log('userToFollow update', userToFollow)
console.log('user logged update', userLogged)

    addUserLogged(userLogged)
editeUser.mutate(userToFollow)
   editeUser.mutate(userLogged)
}

    return {editUserStoreYDb, addVideoUserDbStore, editedVideoUserDbStore, canDeleteVideo, userDbDeleteVideo, addPlToUserDb, deletePlToUserDb , addVideoToUsrPl, flollowHandler}
}