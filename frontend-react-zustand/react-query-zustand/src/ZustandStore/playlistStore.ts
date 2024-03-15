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
        console.log('aca sincroniza ')
        const {allVideosDb}= get()
        const {playlists}= get()
        // const {addVideoToList} = get()
        const copyDb : Video[] = [...allVideosDb]
        let copyPL= [...playlists]

        let newPl: Playlist;
        for( const video of copyDb){
            if(video.title != '' && video.title != undefined){
            newPl = { name: video.title, content:[]};
        ! copyPL.find(pl => pl.name == newPl.name)? copyPL = [...copyPL, newPl] : copyPL }
        }
        console.log('todas las pl no se agrega, solo sincronizo las que hay aca mas el resto, lasde la db, ', copyPL)
        // copyDb.map(item=>{
        //     //para que no ejecute la funcion addVideoToList sin un nombre de PL
        //    if(item.topyc != '') {addVideoToList(item.topyc, item._id)}
        // }) // estaba guardando listas vacias igual- ver
    },
         //add new lists
   addPlaylist : ( newList:string )=>{
    console.log('aca agregaria la plailist', newList)
    const newPlaylist : Playlist = {'name' : newList, 'content': []}
    const {playlists} = get()
    let copyPL = [...playlists]
    const indexInPl = copyPL.findIndex(item => item.name == newList)
    if(indexInPl == -1) copyPL = [...copyPL,newPlaylist]
    console.log('esto quedaria de las pl', copyPL)
    set(() =>({
        playlists:[ ...copyPL]  //playlists : [...copyPL]
    })) 
},
         //add new Content to List
    addVideoToList: (list, newId)=>{
        console.log('aca agregaria el video a una lista con estos datos', list, newId)
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
           listToChange = {name:PLCopy[listIndex].name , content:[ ...PLCopy[listIndex].content, newId]}
           PLCopy[listIndex]= listToChange
       console.log('se agrego el video a la lista y las pl quedaron asi', PLCopy)
       set(()=>({
        playlists: PLCopy
       })) }
    }, 
    //delete playList
    removePlaylist: ( removeList:string )=>{
        const {playlists} = get();
        const copyPl =[ ...playlists] 
        console.log('antes de borrar pl', copyPl)
        const finalPl = copyPl.filter(item => item.name != removeList)
        console.log('dspues de borrar',finalPl)
        set(() =>({
            playlists : [...finalPl]
        }))},

}),{name:'playlistStorage'}))