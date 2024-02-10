import { ChangeEvent, MouseEvent, useState } from "react";
import {PlaylistStore} from '../../ZustandStore/playlistStore'
import { Accordion, AccordionBody, AccordionHeader, AccordionList, Button, Card, TextInput } from "@tremor/react";
import { useNavigate } from "react-router-dom";
// import { Playlist } from "../../hooks/types";



export function AccordionPlayList() { 
  const navigate = useNavigate()
  const [newListName, setNewListName] = useState<string>('')
  const {addPlaylist} = PlaylistStore()
  const {playlists}= PlaylistStore()

    const submitNewListName = (e:MouseEvent<HTMLButtonElement> ) =>{
      e.preventDefault()
      addPlaylist(newListName)
      setNewListName('')
    }

    return( 
        <Card className=" sm:row-start-4 md:row-start-3 my-2 sm:my-3 h-fit mx-auto md:-my-4" decoration="top" color="indigo">
  <AccordionList className="w-full" >
    {playlists?.map((platylist, i) =>{
        return (
 <Accordion key={i}>
 <AccordionHeader>{platylist.name}</AccordionHeader>
 <AccordionBody>
    <Button onClick={()=> navigate(`/search/${platylist.name}`)}> See the List </Button>
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