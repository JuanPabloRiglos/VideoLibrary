import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PlaylistStore } from "../../ZustandStore/playlistStore"
import { useApiHook } from "../../hooks/useApi"
import { useFiltersPL } from "../../hooks/useFiltersPlaylist"
import { Video } from "../../hooks/types"
import { CardToRender } from "../Card"

//Seccion principal de renderizado de la API
export function SearchResult(){
    const {useFetchVideos} = useApiHook()
    const {filterForPL,getSearchResult} = useFiltersPL()
    const {allVideosDb : data} = PlaylistStore()
    const {isError, error} = useFetchVideos()
    const params = useParams()
    const [filterData , setFilterData] = useState <Video[]>()
   
    useEffect(()=>{
        let newData 
        if(data && params.listName){
        newData = filterForPL(data, params.listName)
        } else if(data && params.list){
         newData = getSearchResult(data, params.list)
        }
      setFilterData(newData)
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params])

    console.log(filterData)
    if(isError) return (<div className=" w-2/3 h-2/3 m-auto">{`Ups an Error : ${error.message}`}</div>) 
    if(filterData != undefined && filterData?.length == 0) return (<h2>No ha videos agregados a esta lista de reproduccion</h2>)

    return( 
    <section className='w-full flex flex-wrap lg:grid grid-cols-2 gap-3  rounded-sm shadow'>
    {filterData?.map((item) => ( 
   <CardToRender item={item}/>
     ))}
</section>)
}