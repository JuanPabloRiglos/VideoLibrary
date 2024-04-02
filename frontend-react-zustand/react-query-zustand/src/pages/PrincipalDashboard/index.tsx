import { useApiHook } from "../../hooks/useApi";

import { AccordionPlayList } from "../../components/acordeonPlaylist";
import {UserItem} from "../../components/UserItem/index.jsx";
import { MiniCard } from "../../components/miniCard";
import { SercherComponent } from "./sercherComponent";
import { ModalToUserHandler } from "../../components/userForms/loggInForm";
import { UserStore } from "../../ZustandStore/userStore";
import { PlaylistStore } from "../../ZustandStore/playlistStore";
import{ useUserDataHandler} from '../../hooks/useUserDataHandler'
import { useEffect, memo } from "react";

export default function PrincipalDashboard (){
    const {addVideoUserDbStore} = useUserDataHandler()
    const {allVideosDb,playlists}= PlaylistStore()
    const {userLogged, allUser}= UserStore()
    const {useFetchVideos} = useApiHook()
    const {data, isLoading} = useFetchVideos()
  
    const MemoMiniCard = memo(MiniCard)
    console.log('en el dashboard todos los usuarios son ', allUser)
    useEffect(()=>{
       
        addVideoUserDbStore(allVideosDb)
      
    },[allVideosDb, playlists])
    return(
        <section className="h-fit md:h-dvh w-full mx-auto flex flex-col xl:w-4/5 md:grid grid-cols-2 bg-rose-50 border-2 overflow-hidden">
            <div className="flex flex-col gap-1 alin p-1">
                <div> 
            <SercherComponent/>
            </div>
            <div> 
            <h2 className="m-auto font-bold text-2xl  my-2 text-center" >{userLogged.email? ' See your Playlists' : 'Take a look at our users' }</h2>
            
            {userLogged.email !='' ? <AccordionPlayList/>:
            <section style={{maxHeight:'350px'}}  className=" border-2 p-1 overflow-scroll rounded-2xl shadow-2xl"> 
                {
                    allUser.length >0 ?

                    allUser.map(user =>{
                       return <div> 
                            <UserItem key={user._id} user={user} /> 
                        </div>
                    }) : <span> Cargando Usuarios, espere por favor... </span>
                }
            </section>
            }
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
                        <MemoMiniCard key={item._id} item={item}/>
                    )
                }
            )
           :
           data?.map(item=>{
            return ( 
                <MemoMiniCard key={item._id} item={item}/>
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