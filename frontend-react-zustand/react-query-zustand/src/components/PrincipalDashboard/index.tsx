import { useApiHook } from "../../hooks/useApi";
import { Metric,Divider} from '@tremor/react'
import { AccordionPlayList } from "./acordeonPlaylist";
import { MiniCard } from "./miniCard";
import { SercherComponent } from "./sercherComponent";

export default function PrincipalDashboard (){
    const {useFetchVideos} = useApiHook()
    const {data, isLoading} = useFetchVideos()

    return(
        <section className="h-dvh w-4/5 mx-auto flex flex-col md:w-full md:grid grid-cols-2 ">
            <div className="grid gird-row-2 p-1">
            <SercherComponent/>
            <div> 
            <Metric className="m-auto" color="indigo">See the Playlists</Metric>
                <Divider className="m-auto md:hidden lg:hidden" />
            <AccordionPlayList/>
            </div>
            </div>
            <section className="flex flex-col py-2 gap-1 overflow-scroll">
                <Metric className="m-auto" color="indigo">Ultimos videos Agregados</Metric>
                <Divider className="w-3/5 mx-auto"/>
                
                {isLoading? <>Loading Skeletor</>
                :
                data?.map(item=>{
                    return ( 
                        <MiniCard key={item._id} item={item}/>
                    )
                }
            )}
            </section>
        </section>
    )
}