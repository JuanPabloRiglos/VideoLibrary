import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { CardToRender } from "../Card";
import { toast } from "react-toastify";
import { Badge, Card, Metric, Select, SelectItem, Text } from "@tremor/react";
import ReactPlayer from "react-player";

import { Video } from "../../hooks/types.ts";
import { useApiHook } from "../../hooks/useApi.ts";
import { useUserDataHandler } from "../../hooks/useUserDataHandler.ts";
import { useSweetAlert } from "../../hooks/useSweetAlert.ts";
import { PlaylistStore } from "../../ZustandStore/playlistStore.ts";
import { UserStore } from "../../ZustandStore/userStore.ts";

const initialState : Video = {_id:'', title: '',
description:'', 
url:'', 
topyc:''}


export default function VideoDetail(){
  const{userLogged} = UserStore()
	const {canDeleteVideo, addVideoToUsrPl} = useUserDataHandler()
  const [canDelete, setCanDelete]= useState <boolean>(false)
  const [playListSelect, setPlayListSelect] = useState<string>('')
    const [videoDetail, setVideoDetail]= useState<Video>(initialState)
    const {getVideo, editedVideo} = useApiHook()
    const params = useParams()
    console.log('params', params)
    const navigate = useNavigate()
    const {SweetAlertForDelete} = useSweetAlert()

    //trabajo de zustand
	const {addVideoToList, removeVideoToList} = PlaylistStore() 


  async function fetchVideoDetailData() {
    if(params.id){ 
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response : Promise<Video> = await getVideo(params.id) //ignore
      .then(response => setVideoDetail(response))

    }
  }
    useEffect(()=>{
       fetchVideoDetailData();
    },[params, userLogged])

    useEffect(()=>{
      if(videoDetail._id != ''){ 
        const userCan = canDeleteVideo(videoDetail)
        setCanDelete(userCan)     
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[videoDetail, setCanDelete])

   
    const addtPlayListHandler =  async (listName:string, item : Video) =>{
	
      const videoForEdit : Video = { ...item, topyc:listName}
      addVideoToUsrPl(listName, item._id!)// edita al usuario agregando y borrando de la lista. Tambien Modifica el video poniendole o sacandole el topyc
       editedVideo.mutate(videoForEdit)//edita al video para que quede en sincronia con el user.video
       toast.success('Video edited whit succes!')
       addVideoToList(listName, item._id!)
     }
    
    
     const deletePlayListHandler =  async (listName:string, id : string) =>{
      
    
      addVideoToUsrPl(listName, id!)// edita al usuario agregando y borrando de la lista. Tambien Modifica el video poniendole o sacandole el topyc
       editedVideo.mutate({...videoDetail, topyc:''})//edita al video para que quede en sincronia con el user.video
      toast.success('Video edited whit succes!')
      removeVideoToList(listName, id!)
     }


const deleteVideo=(id: string)=>{
  SweetAlertForDelete(id)
  navigate('/')
}
    return(
      <>
        <section key={videoDetail._id} className="w-4/5 m-auto mt-1 md:w-full md:mt-4 min-w-80">
			<Card className='flex flex-col gap-2 lg:flex-row' >
				<div className="w-full lg:w-1/2 h-full overflow-hidden rounded-md">
        <Metric className="h-1/6 align-top mb-3">{videoDetail.title}</Metric>
				<ReactPlayer style={{maxWidth:'100%'}} url={videoDetail.url}/>	
        </div>
			
				<section className="w-4/5 m-auto lg:w-2/5 h-full flex flex-col gap-10"> 
	
				<Text className="h-3/6 align-top mb-3">{videoDetail.description}</Text>
        <div className=" h-fit flex flex-wrap lg:h-2/6 align-top gap-3 justify-around "> 
				{videoDetail.topyc ?  <Badge className="w-fit rounded-lg">{`In ${videoDetail.topyc} playlist`}</Badge> :
						<div className="w-full md:w-1/2 space-y-6">{userLogged.email != ''?
							<Select className="w-full" value={playListSelect} onValueChange={setPlayListSelect}>
							{ userLogged.playlists.map(list=>
								<SelectItem value={list.name} onClick={()=> addtPlayListHandler(list.name, videoDetail)}>
									{list.name}
								</SelectItem>
							)
						}
						</Select>:
            <span className="p-2 border-2 border-violet-900 bg-rose-700 text-white rounded-xl">Login for more Actions</span>}
						</div>}
				<button className={`${canDelete == true ? 'block': 'hidden'} w-full md:w-1/3 rounded-lg p-2 bg-teal-600 text-white border-2 border-teal-700 hover:bg-teal-400`}  onClick={() => navigate(`/update/${videoDetail._id}`)}>
								Edit Video
							</button>
							
              <button className={`${canDelete && videoDetail.topyc ? 'block': 'hidden'} w-full md:w-1/3 lg:w-11/12 rounded-lg p-2 lg:mt-2 bg-rose-600 text-white border-2 border-rose-800 hover:bg-rose-900`}  color="red" onClick={()=> deletePlayListHandler(videoDetail.topyc! ,videoDetail._id !)}>
					Remove from playlist
				</button>      

        </div>
				<button className={`${canDelete == true ? 'block': 'hidden'} self-center -mt-6 md:-ml-6 w-full md:w-1/3 rounded-lg lg:-ml-0 lg:w-11/12 p-2 bg-rose-600 text-white border-2 border-rose-800 hover:bg-rose-900`}  color="red" onClick={()=> deleteVideo(videoDetail._id !)}>
					Delete
				</button>
				</section>
			</Card> 
      
		</section> 
     <section>
          {/* {samePl?.map((item)=>{

            <MiniCard key={item._id} item={item}>}
          )
          } */}
         </section>
       </>
    )
}