import { Card, Text, TextInput, Textarea, Button } from "@tremor/react";
import { useState , ChangeEvent ,FormEvent, useEffect} from "react";
import { useNavigate , useParams} from "react-router-dom";
import { toast } from "react-toastify";
import { Video, VideoToSave } from "../../hooks/types";
import { useMutation , useQueryClient} from  '@tanstack/react-query';
import { addVideo , getOneVideo} from "../../services";
import { updatedVideo } from "../../services"; 



export function Form(){
  const navigate = useNavigate()
  const params = useParams()
  const initialState : VideoToSave = { title: '',
  description:'', 
  url:''}
    const [video, setVideo] = useState<VideoToSave | Video>(initialState)

    const getVideo = async (id:string)=>{
      const res : Video  = await getOneVideo(id)
      const {title, url, description, _id} = res
      setVideo({title, url, description, _id})
      
    }

    useEffect(()=>{
      if(params.id){ getVideo(params.id)
      }
    },[params])


    // logica para React Query Agrege video. 
    const queryClient = useQueryClient()//necesario para renovar la data del cache
    const useAddVideo = useMutation({mutationFn: addVideo, 
        onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ['videos'] })}// compara el cache con la db, si hay cambios, pide data de nuevo  se renderiza en el useFetchVideos.
})

    //funcion para editar video 
    const editedVideo = useMutation({mutationFn: updatedVideo, 
        onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ['videos'] })}// compara el cache con la db, si hay cambios, pide data de nuevo  se renderiza en el useFetchVideos.
})

    const inputHandler =(e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setVideo({...video, [e.target.name] : e.target.value})
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

    console.log(video)
    return(
     <Card className="max-w-xs mx-auto my-3" decoration="top" decorationColor="indigo">
      <Text>Add New Video</Text>
        <form className="flex flex-col gap-4" onSubmit={ handlerSubmit}>
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
    { params.id ? <Button className="mt-2" variant="secondary" type="submit">
        Save Changes
      </Button>:
      <Button className="mt-2" variant="light" type="submit">
        Submit
      </Button>}
        </form>
     </Card>
);
}