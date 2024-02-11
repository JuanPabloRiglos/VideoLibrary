import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { CardToRender } from "../Card";
import { toast } from "react-toastify";
import { Badge, Button, Card, Metric, Select, SelectItem, Text } from "@tremor/react";
import ReactPlayer from "react-player";


import { Video } from "../../hooks/types";
import { useApiHook } from "../../hooks/useApi";
import { useSweetAlert } from "../../hooks/useSweetAlert.ts";
import { PlaylistStore } from "../../ZustandStore/playlistStore.ts";

const initialState : Video = {_id:'', title: '',
description:'', 
url:'', 
topyc:''}


export function VideoDetail(){

  const [playListSelect, setPlayListSelect] = useState<string>('')
    const [videoDetail, setVideoDetail]= useState<Video>(initialState)
    const {getVideo, editedVideo} = useApiHook()
    const params = useParams()
    const navigate = useNavigate()
    const {SweetAlertForDelete} = useSweetAlert()

    //trabajo de zustand
	const {addVideoToList} = PlaylistStore() 
	const {playlists} =PlaylistStore()

    useEffect(()=>{

      async function fetchVideoDetailData() {
        if(params.id){ 
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const response : Video = await getVideo(params.id) //ignore
          .then(response => setVideoDetail(response))
        }
      }
       fetchVideoDetailData();
      
    },[params])

    const addToPlayListHandler = (listName:string, item : Video) =>{
      const videoForEdit : Video = { ...item, topyc:listName}
     editedVideo.mutate(videoForEdit)
       toast.success('Video edited whit succes!')
     addVideoToList(listName, item._id)
   }

    return(
      <>
        <section key={videoDetail._id} className="w-4/5 m-auto md:w-full min-w-80">
			<Card className='flex flex-col lg:flex-row' >
				<div className="w-full lg:w-1/2 h-full overflow-hidden rounded-md">
				<ReactPlayer style={{maxWidth:'100%'}} url={videoDetail.url}/>	
        </div>
				
				<section className="w-4/5 m-auto lg:w-2/5 h-full m-auto flex flex-col gap-10"> 
				<Metric className="h-1/6 align-top mb-3">{videoDetail.title}</Metric>
				<Text className="h-3/6 align-top mb-3">{videoDetail.description}</Text>
        <div className=" h-fit flex flex-wrap lg:h-2/6 align-top gap-3  justify-around"> 
				{videoDetail.topyc ?  <Badge className="w-fit rounded-lg">{`In ${videoDetail.topyc} playlist`}</Badge> :
						<div className="w-1/2 space-y-6">
							<Select className="w-full" value={playListSelect} onValueChange={setPlayListSelect}>
                
							{ playlists.map(list=>
								<SelectItem value={list.name} onClick={()=> addToPlayListHandler(list.name, videoDetail)}>
									{list.name}
								</SelectItem>
							)
						}
						</Select>
						</div>}
				<Button size="sm" variant="primary" className=" w-1/3 rounded-lg" onClick={() => navigate(`/update/${videoDetail._id}`)}>
								Edit Video
							</Button>
							
				<Button size="sm" variant="primary" className=" w-1/3 rounded-lg" color="red" onClick={()=> SweetAlertForDelete(videoDetail._id)}>
					Delete
				</Button>
        </div>
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