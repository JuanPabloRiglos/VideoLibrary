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
    addVideoToList: (list:string, newId:string)=> void,
    removeVideoToList: (list:string, newId:string)=> void
}

export const PlaylistStore = create(persist<PlaylistState>((set, get)=>({
    allVideosDb:[],
   playlists : [],
        // Sincronize db whit Store
    sincronizeListsInStoreWhitDb:(dataInDb:Video[])=>{
         const { playlists, allVideosDb} = get()
         
         console.log( 'dataInDb al momento de la sincronizacion inicial,',dataInDb )
         console.log( 'allVideos al momento de la sincronizacion inicial,', allVideosDb)
        console.log( 'pl al momento de la sincronizacion inicial,', playlists)
        set(()=>({
            allVideosDb : dataInDb
        }))
       
    } ,
        //Sincronize lists Content
    sincreonizeListContent:()=>{
        console.log('aca sincroniza ')
        // const {allVideosDb}= get()
        const {playlists}= get()
        // const {addVideoToList} = get()
        // const copyDb : Video[] = [...allVideosDb]
        const copyPL= [...playlists]

    
        console.log('sincronize content todas las pl no se agrega, solo sincronizo las que hay aca mas el resto, lasde la db, ', copyPL)
        // copyDb.map(item=>{
        //     //para que no ejecute la funcion addVideoToList sin un nombre de PL
        //    if(item.topyc != '') {addVideoToList(item.topyc, item._id)}
        // }) // estaba guardando listas vacias igual- ver
    },
         //add new lists
   addPlaylist : ( newList:string )=>{
    const {playlists} = get()
    let copyPL = [...playlists]
    console.log('en Add plailist aca agregaria la plailist', newList)
    console.log('esto hay en plailist antes de agregaR: ', playlists)
    console.log('esto hay en la copia de la plailist antes de agregaR: ', copyPL)
    const newPlaylist : Playlist = {'name' : newList, 'content': []}
    const indexInPl = copyPL.findIndex(item => item.name == newList)
    if(indexInPl < 0) copyPL = [...copyPL,newPlaylist]
    console.log('esto quedaria de las pl', copyPL) // Funciona, devuelve un array
    set(() =>({
        playlists: copyPL  //playlists : [...copyPL]
    })) 
},
         //add new Content to List
    addVideoToList: (list, newId)=>{// Funciona, devuelve el array con los id sumados en el content
        console.log('aca agregaria el video a una lista con estos datos', list, newId)
       const {playlists} = get()
       console.log('las pl en estore antes de agregar un video', playlists)
       const PLCopy = [...playlists]
       console.log('la copia de las pl en estore antes de agregar un video', PLCopy)
       const listIndex = PLCopy.findIndex(item=> item.name == list)
        //si no encuentra la lista, deja las playlist como esta
        console.log('busca el indice d ela lista', listIndex)
       if( listIndex < 0){
        set(()=>({
            playlists: PLCopy
           }))
       }else { 
         // chequea si esta el video en la lista
         console.log('entro en el else de que encontro el indice del plailist en la lista')
           const isInList = PLCopy[listIndex].content.includes(newId)
           console.log('esta el id en la lista d ela plailist? ', isInList)
           let listToChange;
           if(isInList){ 

               listToChange = {name:PLCopy[listIndex].name , content:[ ...PLCopy[listIndex].content]}
               console.log('lisTochange en caso de que este en la lista el id', listToChange)
           }else {

               listToChange = {name: PLCopy[listIndex].name , content:[ ...PLCopy[listIndex].content, newId]}
               console.log('lisTo change en caso de NO que este en la lista el id,', listToChange)
           }
           console.log('asi quedo la lsita editada', listToChange);
            PLCopy[listIndex] = {... listToChange, content:[...listToChange.content]}
       console.log('se agrego el video a la lista y las pl quedaron asi', PLCopy)
       set(()=>({
        playlists: PLCopy
       })) }
    }, 

    removeVideoToList: (list, newId)=>{
        const {allVideosDb} = get()
        const videoCopy = [...allVideosDb]
        console.log('copia de allVideosInDb,', videoCopy)
        videoCopy.forEach(item => {
            if (item._id === newId) {
              item.topyc = '';
            }
          });
          console.log(' videoCopy despues de la actualizacion,', videoCopy)
        console.log('aca borraria el video de una lista con estos datos', list, newId)
       const {playlists} = get()
       console.log('pl previa  en remove videos', playlists)
       const PLCopy = [];
        for(let i = 0; i < playlists.length ; i ++){
            const contentInObj =  playlists[i].content.map(item => {return item})
            const objetToPl = {name: playlists[i].name,  content:[...contentInObj]} 
            PLCopy.push(objetToPl)
        }
        
       console.log('copia de las listas', PLCopy)
       const listIndex = PLCopy.findIndex(item=> item.name == list)
       console.log('copia del index de la lista, si es -1 no esta la list', listIndex)
        //si no encuentra la lista, deja las playlist como esta
       if( listIndex == -1){
        console.log('quedaria como estaba, asi', PLCopy)
        set(()=>({
            playlists: PLCopy
           }))
       }else { 
         // chequea si esta el video en la lista
         const finalContent =  PLCopy[listIndex].content.filter(id => id != newId) 
          PLCopy[listIndex] = {... PLCopy[listIndex], content: [...finalContent]}
       console.log('se borraria el video de la lista y las pl quedarian asi', PLCopy)
       set(()=>({
        playlists: PLCopy, 
        allVideosDb: videoCopy
       })) 
    }
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