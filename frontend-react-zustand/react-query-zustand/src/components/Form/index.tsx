import { Card, Text, TextInput, Textarea, Button, Select, SelectItem } from "@tremor/react";
import { useState , ChangeEvent ,FormEvent, useEffect} from "react";
import { useNavigate , useParams} from "react-router-dom";
import { toast } from "react-toastify";
import { Video, VideoToSave } from "../../hooks/types";
import { useApiHook } from "../../hooks/useApi";
import { PlaylistStore } from "../../ZustandStore/playlistStore";

export default function Form(){
  const {playlists}= PlaylistStore()
  // const {addVideoToList}= PlaylistStore()
  const navigate = useNavigate()
  const params = useParams()
  const initialState : VideoToSave = { title: '',
  description:'', 
  url:'', 
topyc:''}
    const [video, setVideo] = useState<VideoToSave | Video>(initialState)
  const {editedVideo, useAddVideo, getVideo} = useApiHook()
 
    useEffect(()=>{

      async function fetchVideoToEditData() {
        if(params.id){ 
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const response : Video = await getVideo(params.id)
          .then(response => setVideo(response))
        }
      }
       fetchVideoToEditData();
      
    },[params])

    const inputHandler =(e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setVideo({...video, [e.target.name] : e.target.value})
    }

    const handlerTopyc = (value : string)=>{
      setVideo({ ...video , topyc: value})
    }

    const handlerSubmit = (e : FormEvent<HTMLFormElement>) =>{
       e.preventDefault()
       if(!params.id){
         useAddVideo.mutate(video)
         toast.success('New Video Added')
       } else {
        editedVideo.mutate(video)
         toast.success('Video edited whit succes!')
       }
        setVideo(initialState)
        navigate('/')
    }
 
    return(
     <Card className="max-w-xs mx-auto my-3" decoration="top" decorationColor="indigo">
      <Text>Add New Video</Text>
        <form className="flex flex-col gap-4" onSubmit={ handlerSubmit} >
        <TextInput placeholder="Select a video Title..." name="title" value={video.title}  onChange={inputHandler} autoFocus/>
        <TextInput placeholder="Insert the video's URL"  name="url" value={video.url}  onChange={inputHandler}/>
        <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm text-slate-500">
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Start typing here..."
          name="description"
          value={video.description} 
           onChange={inputHandler}
        />
      </div>
						<div className=" w-3/5 space-y-6">
							<Select className="w-full"
               value={video.topyc}
               >
							{ playlists.map(list=>
								<SelectItem value={list.name} onClick={()=> handlerTopyc(list.name)}>
									{list.name}
								</SelectItem>
							)
      }
      </Select>
      </div>
{ 
    params.id ? <Button className="mt-2" variant="secondary" type="submit">
        Save Changes
      </Button>:
      <Button className="mt-2" variant="light" type="submit">
        Submit
      </Button>
      }
        </form>
     </Card>
);
}