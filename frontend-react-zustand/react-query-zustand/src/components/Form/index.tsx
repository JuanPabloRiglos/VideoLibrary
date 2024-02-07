import { Card, Text, TextInput, Textarea, Button } from "@tremor/react";
import { useState , ChangeEvent ,FormEvent} from "react";
import { Video, VideoToSave } from "../../hooks/types";
import { useMutation , useQueryClient} from  '@tanstack/react-query';
import { addVideo } from "../../services";
// import { updatedVideo } from "../../services"; -> cuando haga el updated


export function Form(){
    const [video, setVideo] = useState<VideoToSave | Video>({ title: '',
        description:'', 
        url:''})

    // logica para React Query Agrege video. 
    const queryClient = useQueryClient()//necesario para renovar la data del cache
    const useAddVideo = useMutation({mutationFn: addVideo, 
        onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ['videos'] })}// compara el cache con la db, si hay cambios, pide data de nuevo  se renderiza en el useFetchVideos.
})

    //funcion para editar video -> Cuando lo use, atento que tengo que pasar un 'video' con los cambios a efectuados
//     const editedVideo = useMutation({mutationFn: updatedVideo, 
//         onSuccess:()=>{ queryClient.invalidateQueries({ queryKey: ['videos'] })}// compara el cache con la db, si hay cambios, pide data de nuevo  se renderiza en el useFetchVideos.
// })

    const inputHandler =(e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setVideo({...video, [e.target.name] : e.target.value})
    }

    const handlerSubmit = (e : FormEvent<HTMLFormElement>) =>{
       e.preventDefault()
        useAddVideo.mutate(video)
    }

    console.log(video)
    return(
     <Card className="max-w-xs mx-auto my-3" decoration="top" decorationColor="indigo">
      <Text>Add New Video</Text>
        <form className="flex flex-col gap-4" onSubmit={ handlerSubmit}>
        <TextInput placeholder="Select a video Title..." name="title"  onChange={inputHandler}/>
        <TextInput placeholder="Insert the video's URL"  name="url" onChange={inputHandler}/>
        <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm text-slate-500">
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Start typing here..."
          name="description" onChange={inputHandler}
        />
      </div>
      <Button className="mt-2" variant="light" type="submit">
        Submit
      </Button>
        </form>
     </Card>
);
}