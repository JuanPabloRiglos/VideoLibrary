import { useApiHook } from "../../hooks/useApi";
// import { Metric,Divider} from '@tremor/react'
import { AccordionPlayList } from "./acordeonPlaylist";
import { MiniCard } from "./miniCard";
import { SercherComponent } from "./sercherComponent";
import { ModalToUserHandler } from "../userForms/loggInForm";
import { UserStore } from "../../ZustandStore/userStore";


export default function PrincipalDashboard (){
    const {userLogged}= UserStore()
    const {useFetchVideos} = useApiHook()
    const {data, isLoading} = useFetchVideos()
  
    console.log('usuario logeado')
    console.log(userLogged)

    return(
        <section className="h-dvh w-4/5 mx-auto flex flex-col md:w-full md:grid grid-cols-2 bg-fuchsia-50">
            <div className="flex flex-col gap-2 alin p-1">
                <div> 
            <SercherComponent/>
            </div>
            <div> 
            <h2 className="m-auto font-bold text-2xl text-violet-900 my-4 text-center" >See the Playlists</h2>
            
            <AccordionPlayList/>
            </div>
            </div>
            <main className="flex flex-col py-2 gap-1 overflow-scroll rounded-xl realitve"> 
                <div className="border-b-2 shadow-sm">
                <h2 className="m-auto font-bold text-2xl text-violet-900 my-4 text-center position" >Ultimos videos Agregados</h2>
                </div>
            <section className="flex flex-col py-2 gap-1 overflow-scroll rounded-xl">
                
                {isLoading? <> Loading Skeletor </>
                :
                data?.map(item=>{
                    return ( 
                        <MiniCard key={item._id} item={item}/>
                    )
                }
            )}
            </section>
            { userLogged.email === '' && < ModalToUserHandler/> }
        </main>
        </section>
    )
}