import { create } from "zustand";
import {Playlist, Video} from '../hooks/types'
import { persist } from "zustand/middleware";

type PlaylistState = {
    allVideosDb: Video[],
    playlists: Playlist[],
    sincronizeListsInStoreWhitDb:(dataInDb:Video[])=> void,
    sincreonizeListContent:()=>void,
    addPlaylist :(newList:string)=> void,
    removePlaylist :(newList:string)=> void,
    addVideoToList: (list:string, newId:string)=> void
}

export const PlaylistStore = create(persist<PlaylistState>((set, get)=>({
    allVideosDb:[],
   playlists : [],
        // Sincronize db whit Store
    sincronizeListsInStoreWhitDb:(dataInDb:Video[])=>{
         const {addPlaylist} = get()
        const totalListInDb : string[] = dataInDb.map(item =>(item.topyc))
        totalListInDb.map(item =>{
             // para que si hay video sin topyc, que no se cree una pl sin nombre
           item != '' && addPlaylist(item)
        })
        set(()=>({
            allVideosDb : dataInDb
        }))
       
    } ,
        //Sincronize lists Content
    sincreonizeListContent:()=>{
        const {allVideosDb}= get()
        const {addVideoToList} = get()
        const copyDb : Video[] = [...allVideosDb]
        copyDb.map(item=>{
            //para que no ejecute la funcion addVideoToList sin un nombre de PL
           if(item.topyc != '') {addVideoToList(item.topyc, item._id)}
        })
        console.log(copyDb)
    },
         //add new lists
   addPlaylist : ( newList:string )=>{
    const newPlaylist : Playlist = {'name' : newList, 'content': []}
    const {playlists} = get()
    let copyPL = [...playlists]
    const indexInPl = copyPL.findIndex(item => item.name == newList)
    if(indexInPl == -1) copyPL = [...copyPL,newPlaylist]
    set(() =>({
        playlists : [...copyPL]
    }))},
         //add new Content to List
    addVideoToList: (list, newId)=>{
       const {playlists} = get()
       const PLCopy = [...playlists]
       const listIndex = PLCopy.findIndex(item=> item.name == list)
        //si no encuentra la lista, deja las playlist como esta
       if( listIndex == -1){
        set(()=>({
            playlists: PLCopy
           }))
       }else { 
         // chequea si esta el video en la lista
           const isInList = PLCopy[listIndex].content.find(video => video.id == newId)
           let listToChange;
           isInList ? listToChange = {name:PLCopy[listIndex].name , content:[ ...PLCopy[listIndex].content]}:
           listToChange = {name:PLCopy[listIndex].name , content:[ ...PLCopy[listIndex].content, {id:newId}]}
           PLCopy[listIndex]= listToChange
       
       set(()=>({
        playlists: PLCopy
       })) }
    }, 
    //delete playList
    removePlaylist: ( removeList:string )=>{
        const {playlists} = get();
        const copyPl =[ ...playlists] 
        const finalPl = copyPl.filter(item => item.name != removeList)
        set(() =>({
            playlists : [...finalPl]
        }))},

}),{name:'playlistStorage'}))