/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Text, TextInput, Textarea, Button, Select, SelectItem } from "@tremor/react";
import { useState , ChangeEvent ,FormEvent, useEffect} from "react";
import { useNavigate , useParams} from "react-router-dom";
import { toast } from "react-toastify";
import { Video, VideoToSave } from "../../hooks/types";
import { useApiHook } from "../../hooks/useApi";
import { useUserDataHandler } from "../../hooks/useUserDataHandler";
import { PlaylistStore } from "../../ZustandStore/playlistStore";
import { UserStore } from "../../ZustandStore/userStore";
import { useForm } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

export default function Form(){
  const {userLogged }= UserStore()
 const {addVideoUserDbStore, editedVideoUserDbStore}= useUserDataHandler()
  const {playlists}= PlaylistStore()
  // const {addVideoToList}= PlaylistStore()
  const navigate = useNavigate()
  const params = useParams()
  const initialState : VideoToSave = {
    title: '',
    description: '',
    url: '',
    topyc: '',
    owners: [''],
  }
    const [video, setVideo] = useState<VideoToSave | Video>(initialState)
  const {editedVideo, useAddVideo, getVideo} = useApiHook()

 
 
    useEffect(()=>{
      async function fetchVideoToEditData()  {
        if(params.id){ 
           await getVideo(params.id)
          .then(response => setVideo(response))
        }
      }
       fetchVideoToEditData();
    },[params])

    // const inputHandler =(e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    //     setVideo({...video, [e.target.name] : e.target.value})
    // }

    const handlerTopyc = (value : string)=>{
      setVideo({ ...video , topyc: value})
    }

    // const handlerSubmit = async (e : FormEvent<HTMLFormElement>) =>{
    //    e.preventDefault()
    //    if(!params.id){
    //   // DISPARARLO UNA VEZ QUE SE CARGO TODO EN LADB Y ZUSTAND 
    //     useAddVideo.mutate({...video,  owners :[userLogged._id ]}) // agrega a la db Videos
    //     toast.success('New Video Added')
    //    } else {
    //     editedVideoUserDbStore(video)
    //     // Trabajar aca la edicion del video dentro del usuario
    //      editedVideo.mutate(video)// esto no podria estar. solo con permisos de admin acaso?
    //      toast.success('Video edited whit succes!')
    //    }
    //     setVideo(initialState)
    //     navigate('/')
    // }

//Codigo del form robado 
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
  formState: { isDirty },
} = useForm <VideoToSave | Video> ({
  defaultValues: {
    title: video.title,
    description: video.description,
    url: video.url,
    topyc: video.topyc,
  },
});
// useEffect(()=>{},[userLogged])

const onSubmitEdit : SubmitHandler <EditInputs >  = async (newData : VideoToSave ) => {
  console.log('nuevo form', newData)
  setVideo({ ...newData, topyc:video.topyc,owners :[userLogged._id ] })
  console.log('el video quedo asi', video)
  if(!params.id){
    // DISPARARLO UNA VEZ QUE SE CARGO TODO EN LADB Y ZUSTAND 
      useAddVideo.mutate({...video,  owners :[userLogged._id ]}) // agrega a la db Videos
      toast.success('New Video Added')
     } else {
      editedVideoUserDbStore(video)
      // Trabajar aca la edicion del video dentro del usuario
       editedVideo.mutate(video)// esto no podria estar. solo con permisos de admin acaso?
       toast.success('Video edited whit succes!')
     }
      setVideo(initialState)
      navigate('/')
};



//termina codigo del form robado 
    return(
      <> 
     {/* <Card className="max-w-xs mx-auto my-3" decoration="top" decorationColor="indigo">
      <Text>{video.title ? 'Edit your Video' : 'Add New Video'}</Text>
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
     </Card> */}
     {/* arranca form robado al perfil */}
     <section className='m-auto p-4 bg-rose-50 h-full w-full  md:w-10/12 flex flex-col'>
      <h2 className="hidden md:flex font-semibold text-2xl"> Make our App your App </h2>
      <h3 className=" font-bold text-2xl text-violet-900 mt-2 ml-10 border-b-2">{video.title != '' ? 'Edit your Video' : 'Add your video'}</h3>
				<form className="
				w-full items-center pb-2 md:w-4/6 mx-auto mt-10 flex flex-col gap-4" onSubmit={handleSubmit(onSubmitEdit)}>
				<div className="w-8/12 flex flex-col justify-around">
            <TextField  type='text' label="Video Title"  
             color= "secondary"   {...register("title", {
				required: {
					value: true,
					message: "Debes completar el campo",
				},
			})}
			focused
		/>
		{errors.title && (
			<span
				className='pl-2 pt-2 flex text-xs font-bold text-rose-900'
				
			>
				{errors.title.message}
			</span>
		)}  
            
              </div>
			<div className=" w-8/12 flex flex-col justify-around">
            <TextField  type='text' label="Leave the video description"
             color= "secondary" 
             multiline
             maxRows={4}
             {...register("description", {
				required: {
					value: true,
					message: "Debes completar el campo",
				},
			})}
			focused
		/>
		{errors.description && (
			<span
				className='pl-2 pt-2 flex text-xs font-bold text-rose-900'
				
			>
				{errors.description.message}
			</span>
		)}  
              </div>


              <div className="w-8/12 flex flex-col justify-around">
            <TextField  type='url' label="Url of the Video"
             color= "secondary" 
             {...register("url", {
				required: {
					value: true,
					message: "Debes completar el campo",
				},
			})}
			focused
		/>
		{errors.url && (
			<span
				className='pl-2 pt-2 flex text-xs font-bold text-rose-900'
				
			>
				{errors.url.message}
			</span>
		)}  
    </div>
              {/* 
              <div className=" w-3/5 space-y-6">
							<Select className="w-full bg-transparent border-2 rounded-xl border-violet-600"
               value={video.topyc}
               >
							{ playlists.map(list=>
								<SelectItem className="bg-transparent border-2 rounded-xl border-violet-600" value={list.name} onClick={()=> handlerTopyc(list.name)}>
									{list.name}
								</SelectItem>
							)
      }
      </Select>
      </div> */}

<div className=" w-8/12 flex flex-col justify-around">
      <TextField
        
          id="outlined-select-currency"
          color= "secondary"
          select
          label="Select"
          value={video.topyc}
          helperText="Select one list for your video"
        >
          {userLogged.playlists.map((option, i) => (
            <MenuItem key={i} value={option.name}  onClick={()=> handlerTopyc(option.name)}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
         </div>


			<div className=" w-4/5 gap-2 flex">
        { video.title != '' ? 
			<button type="submit"  className={` block px-3 py-2 rounded-md bg-teal-400 text-white  border-violet-900  hover:bg-violet-900   border-2 font-semibold transition-all items-center mt-1 ${ isDirty ? "bg-teal-400" : "bg-teal-700"
							}`}  
			disabled={!isDirty}> 
			{isDirty ? "Save Changes" : "Edit Video"}
      </button> :
      <button type="submit"  className={` block px-3 py-2 rounded-md bg-teal-400 text-white  border-violet-900  hover:bg-violet-900   border-2 font-semibold transition-all items-center mt-1 ${ isDirty ? "bg-teal-400" : "bg-teal-700"
    }`}  
disabled={!isDirty}> 
Save Video
</button> }
	<button type="reset"  className={` block px-3 py-2 rounded-md bg-rose-400 text-white  border-violet-900  hover:bg-violet-900  hover:border-teal-400 border-2 font-semibold transition-all items-center mt-1  ${ isDirty ? "bg-rose-400" : "bg-rose-700"
							}`}	disabled={!isDirty}
							onClick={() => reset()}> Cancelar
      </button> 
	</div>
				</form>
			</section>
      </>
);
}

