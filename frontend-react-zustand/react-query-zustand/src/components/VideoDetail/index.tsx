import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiHook } from "../../hooks/useApi";
import { CardToRender } from "../Card";
import { Video } from "../../hooks/types";

const initialState : Video = {_id:'', title: '',
description:'', 
url:'', 
topyc:''}
export function VideoDetail(){

    const [videoDetail, setVideoDetail]= useState<Video>(initialState)
    const {getVideo} = useApiHook()
    const params = useParams()


    useEffect(()=>{

      async function fetchVideoDetailData() {
        if(params.id){ 
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const response : Video = await getVideo(params.id)
          .then(response => setVideoDetail(response))
        }
      }
       fetchVideoDetailData();
      
    },[params])

    return(
        <section>
            <CardToRender key={videoDetail._id} item={videoDetail}/>
        </section>
    )
}