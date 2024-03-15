import { useApiHook } from "../../hooks/useApi";
// import { Metric,Divider} from '@tremor/react'
import { AccordionPlayList } from "../../components/acordeonPlaylist";
import { MiniCard } from "../../components/miniCard";
import { SercherComponent } from "./sercherComponent";
import { ModalToUserHandler } from "../../components/userForms/loggInForm";
import { UserStore } from "../../ZustandStore/userStore";
import { PlaylistStore } from "../../ZustandStore/playlistStore";
import{ useUserDataHandler} from '../../hooks/useUserDataHandler'
import { useEffect } from "react";

export default function PrincipalDashboard (){
    const {addVideoUserDbStore} = useUserDataHandler()
    const {allVideosDb,playlists }= PlaylistStore()
    const {userLogged}= UserStore()
    const {useFetchVideos} = useApiHook()
    const {data, isLoading} = useFetchVideos()
  

    useEffect(()=>{
       
        addVideoUserDbStore(allVideosDb)
      
    },[allVideosDb, playlists])
    return(
        <section className="h-dvh w-4/5 mx-auto flex flex-col md:w-full md:grid grid-cols-2 bg-fuchsia-50">
            <div className="flex flex-col gap-1 alin p-1">
                <div> 
            <SercherComponent/>
            </div>
            <div> 
            <h2 className="m-auto font-bold text-2xl  my-2 text-center" >{userLogged.email? ' See your Playlists' : ' See all ours Playlists' }</h2>
            
            <AccordionPlayList/>
            </div>
            </div>
            <main className="flex flex-col py-2 gap-1 overflow-scroll rounded-xl realitve"> 
                <div className="border-b-2 shadow-sm">
                <h2 className="m-auto font-bold text-2xl my-4 text-center position" >{userLogged.email != '' ? 'See all your videos' : 'Se all ours videos' }</h2>
                </div>
            <section className="flex flex-col py-2 gap-1 overflow-scroll rounded-xl">
                
                {isLoading? <> Loading Skeletor </>
                :
                (userLogged.email != '' ?
                userLogged.videos?.map(item=>{
                    return ( 
                        <MiniCard key={item._id} item={item}/>
                    )
                }
            )
           :
           data?.map(item=>{
            return ( 
                <MiniCard key={item._id} item={item}/>
            )
        }
    )
            )
            
            }
            </section>
            { userLogged.email === '' && < ModalToUserHandler/> }
        </main>
        </section>
    )
}