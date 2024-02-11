import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {PlaylistStore} from '../../ZustandStore/playlistStore'
import { Accordion, AccordionBody, AccordionHeader, AccordionList, Button, Card, TextInput } from "@tremor/react";
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
  console.log('Cargo')
  sincreonizeListContent()
},[addPlaylist])


    const submitNewListName = (e:MouseEvent<HTMLButtonElement> ) =>{
      e.preventDefault()
      addPlaylist(newListName)
      setNewListName('')
    }

    return( 
        <Card className="m-auto max-h-96 overflow-scroll" decoration="top" color="indigo">
  <AccordionList className="w-full " >
    {playlists?.map((platylist, i) =>{
        return (
 <Accordion key={i}>
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
  </AccordionList>
  <TextInput className="mt-2" value={newListName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setNewListName(e.target.value)} placeholder="Write here you new Playlist name" />

  <Button className="w-2/5 my-2" size="xs" onClick={ submitNewListName} >Add Playlist</Button>
 
  </Card>
);
}