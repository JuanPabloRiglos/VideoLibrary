/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, MouseEvent,useEffect, useState } from "react";//
import {PlaylistStore} from '../ZustandStore/playlistStore'
import { UserStore } from "../ZustandStore/userStore";
import { Accordion, AccordionBody, AccordionHeader, Button } from "@tremor/react";
import { useNavigate } from "react-router-dom";
import { useSweetAlert } from "../hooks/useSweetAlert";
import { useUserDataHandler } from "../hooks/useUserDataHandler";
import { Playlist } from "../hooks/types";


export function AccordionPlayList() { 
  const {addPlToUserDb, deletePlToUserDb}= useUserDataHandler()
  const {userLogged} = UserStore()
  const {addPlaylist, playlists, sincreonizeListContent} = PlaylistStore()
  const [playlistToRender, setPlayListToRender]= useState <Playlist[]| null> (null)
  const [newListName, setNewListName] = useState<string>('')
  const navigate = useNavigate()
  const storageplCount = playlists.length
  const {SweetAlertDeletePL}= useSweetAlert()

useEffect(()=>{
userLogged.email != '' ? setPlayListToRender([...userLogged.playlists]) : setPlayListToRender([...playlists])
},[playlists, userLogged])

const submiDeleteList = (listToDelete:string) =>{
  deletePlToUserDb(listToDelete)
  SweetAlertDeletePL(listToDelete)
 
}

    const submitNewListName = (e:MouseEvent<HTMLButtonElement> ) =>{
      e.preventDefault()
      addPlToUserDb(newListName)
      addPlaylist(newListName)
      setNewListName('')
    }
console.log('las playlist en el store, desde acordeon, son :',playlists)
    return( 
        <section className="mx-auto overflow-scroll bg-rose-50 p-6 border-2 hover:shadow-2xl rounded-2xl" style={{maxHeight:'500px'}}>
  <section className="w-full max-h-64 overflow-scroll rounded-xl border-2 " >
    {playlistToRender?.map((platylist, i) =>{
        return (
 <Accordion key={i} className="border border-teal-700">
 <AccordionHeader className=" bg-rose-600 font-semibold text-white">{platylist.name}</AccordionHeader>
 <AccordionBody className="flex gap-4 bg-rose-600 " >
    <Button color='green' className="bg-teal-500 hover:bg-teal-700 border-violet-900 hover:border-violet-900 hover:shadow-xl transition-colors" onClick={()=>  navigate(`/search/list/${platylist.name}`)}> See the List </Button>
    <Button variant="primary" color="red" className=" bg-rose-500 hover:shadow-xl hover:bg-rose-800 border-violet-900 transition-colors" onClick={()=> submiDeleteList(platylist.name)}>
					Delete Playlist
				</Button>
 </AccordionBody>
</Accordion>
        )
    }) 
}
  </section>
  <input className="mt-2 w-full p-2 border-2 border-violet-900 rounded-xl bg-rose-100" value={newListName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setNewListName(e.target.value)} placeholder="Write here you new Playlist name" />

  <button className="w-full mt-4 py-1.5 border-2 rounded-xl font-semibold text-white border-violet-900  bg-teal-700 transition-all hover:border-rose-900 hover:bg-violet-900 hover:text-teal-400"  onClick={ submitNewListName} disabled={!userLogged.email} > {userLogged.email ? 'Add Playlist': 'Login for add a Playlist'}</button>
 
  </section>
);
}