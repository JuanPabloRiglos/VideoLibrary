import { create } from "zustand";
import {Playlist} from '../hooks/types'
import { persist } from "zustand/middleware";

type PlaylistState = {
    playlists: Playlist[],
    addPlaylist :(newList:string)=> void,
    addVideoToList: (list:string, newId:string)=> void
}

export const PlaylistStore = create(persist<PlaylistState>((set, get)=>({
   playlists : [],
         //add new lists
   addPlaylist : ( newList:string )=>{
    const newPlaylist : Playlist = {'name' : newList, 'content': []}
    set((state) =>({
        playlists : [...state.playlists, newPlaylist]
    }))},
         //add new Content to List
    addVideoToList: (list, newId)=>{
        console.log(list)
        console.log(newId)
       const {playlists} = get()
       const PLCopy = [...playlists]
       const listIndex = PLCopy.findIndex(item=> item.name == list)
       const listToChange = {name:PLCopy[listIndex].name , content:[ ...PLCopy[listIndex].content, {id:newId}]}
       PLCopy[listIndex]= listToChange
       console.log(PLCopy)
       console.log(listToChange)
       set(()=>({
        playlists: PLCopy
       }))
    }


}),{name:'playlistStorage'}))