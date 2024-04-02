/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState , useEffect} from "react";
import { useNavigate , useParams} from "react-router-dom";
import { toast } from "react-toastify";
import { Video, VideoToSave } from "../../hooks/types";
import { useApiHook } from "../../hooks/useApi";
import { useUserDataHandler } from "../../hooks/useUserDataHandler";
import { PlaylistStore } from "../../ZustandStore/playlistStore";
import { UserStore } from "../../ZustandStore/userStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

interface initialStateType {
  title: string,
  description: string,
  url: string,
  topyc: string,
  owners?: [string],
}

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
    owners: [''] ,
  }
    const [video, setVideo] = useState<VideoToSave | Video>(initialState)
  const {editedVideo, useAddVideo, getVideo} = useApiHook()
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
  formState: { isDirty },
} = useForm ();
 
    useEffect(()=>{
      async function fetchVideoToEditData()  {
        if(params.id){ 
           await getVideo(params.id)
          .then(response => {setVideo(response);
         reset(response)})
        }
      }
    fetchVideoToEditData() ;
    
    },[params, setVideo])
   
console.log('asi esta el video en el form', video)

    const handlerTopyc = (value : string)=>{
      setVideo({ ...video , topyc: value})
    }

const onSubmitVideo : SubmitHandler <initialStateType>= (newData : VideoToSave ) => {
  console.log('nuevo form', newData)
  const videoToDb ={ ...newData, topyc:video.topyc, owners :[userLogged._id ] } 
  console.log('el video quedo asi', videoToDb)
  if(!params.id){
    //lo manda al edit no al useADD, corregir
    console.log('agregaria el video, esta es el video', videoToDb)
     useAddVideo.mutate(videoToDb) // agrega a la db Videos
      toast.success('New Video Added')
     } else {
      console.log('editaria el video, esta es el video', videoToDb)
       editedVideoUserDbStore(videoToDb)
      // Trabajar aca la edicion del video dentro del usuario
        editedVideo.mutate(videoToDb)// esto no podria estar. solo con permisos de admin acaso?
       toast.success('Video edited whit succes!')
     }
      setVideo(initialState)
       navigate('/')
};



//termina codigo del form robado 
    return(
     <section className='m-auto p-4 bg-rose-50 h-full w-full  md:w-10/12 flex flex-col'>
      <h2 className="hidden md:flex font-semibold text-2xl"> Make our App your App </h2>
      <h3 className=" font-bold text-2xl text-violet-900 mt-2 ml-10 border-b-2">{video.title != '' ? 'Edit your Video' : 'Add your video'}</h3>
    <form 
    className="w-full items-center pb-2 md:w-4/6 mx-auto mt-10 flex flex-col gap-4"
         onSubmit={handleSubmit(onSubmitVideo)} 
       >
				<div className="w-8/12 flex flex-col justify-around">
            <TextField
              type='text' label="Video Title"  
             color= "secondary"  
            {...register("title", {
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

<div className=" w-8/12 flex flex-col justify-around">
      <TextField
          id="outlined-select-currency"
          color= "secondary"
          select
          value={video.topyc}
          label="Select"
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
    
);
}

