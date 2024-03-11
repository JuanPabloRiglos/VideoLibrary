import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {PlaylistStore} from '../../ZustandStore/playlistStore'
import { Accordion, AccordionBody, AccordionHeader, Button, TextInput } from "@tremor/react"; //AccordionList, Card
import { useNavigate } from "react-router-dom";
import { useSweetAlert } from "../../hooks/useSweetAlert";



export function AccordionPlayList() { 
  const [newListName, setNewListName] = useState<string>('')
  const {addPlaylist} = PlaylistStore()
  const {playlists}= PlaylistStore()
  const {sincreonizeListContent}= PlaylistStore()
  const navigate = useNavigate()
  const {SweetAlertDeletePL}= useSweetAlert()

useEffect(()=>{
  sincreonizeListContent()
},[addPlaylist])


    const submitNewListName = (e:MouseEvent<HTMLButtonElement> ) =>{
      e.preventDefault()
      addPlaylist(newListName)
      setNewListName('')
    }

    return( 
        <section className="mx-auto overflow-scroll bg-rose-50 p-8 border-2 rounded-2xl" style={{maxHeight:'500px'}}>
  <section className="w-full border-4 rounded-xl bg-rose-900 border-rose-900" >
    {playlists?.map((platylist, i) =>{
        return (
 <Accordion key={i} >
 <AccordionHeader>{platylist.name}</AccordionHeader>
 <AccordionBody className="flex gap-4">
    <Button color='green' onClick={()=>  navigate(`/search/list/${platylist.name}`)}> See the List </Button>
    <Button variant="primary" color="red" onClick={()=> SweetAlertDeletePL(platylist.name)}>
					Delete Playlist
				</Button>
 </AccordionBody>
</Accordion>
        )
    }) 
}
  </section>
  <TextInput className="mt-2" value={newListName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setNewListName(e.target.value)} placeholder="Write here you new Playlist name" />

  <button className="w-full mt-4 py-1.5 border-2 rounded-xl font-semibold text-white border-rose-900  bg-teal-400 transition-all hover:border-rose-900 hover:bg-violet-900 hover:text-teal-400"  onClick={ submitNewListName} >Add Playlist</button>
 
  </section>
);
}