import { useApiHook } from "../../hooks/useApi";
import { Metric,Divider} from '@tremor/react'
import { AccordionPlayList } from "./acordeonPlaylist";
import { MiniCard } from "./miniCard";
import { SercherComponent } from "./sercherComponent";

export function PrincipalDashboard (){
    const {useFetchVideos} = useApiHook()
    const {data, isLoading} = useFetchVideos()

    return(
        <section className="h-dvh w-4/5 mx-auto flex flex-col md:w-full md:grid grid-cols-2 ">
            <div className="grid gird-row-3 p-1">
            <SercherComponent/>
            <Metric className="m-auto row-start-2 row-end-3" color="indigo">See the Playlists</Metric>
                <Divider className="m-auto sm:row-start-3 md:hidden lg:hidden" />
            <AccordionPlayList/>
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