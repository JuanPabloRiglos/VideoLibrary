import { useApiHook } from "../../hooks/useApi"
import { useFiltersPL } from "../../hooks/useFiltersPlaylist"
import { Video } from "../../hooks/types"
import { CardToRender } from "../Card"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//Seccion principal de renderizado de la API
export function SearchResult(){
    const {useFetchVideos} = useApiHook()
    const {filterForPL} = useFiltersPL()
    const {data, isError, error} = useFetchVideos()
    const params = useParams()
    const [filterData , setFilterData] = useState <Video[]>()
   
    useEffect(()=>{
        let newData 
        if(data && params.list){
        newData = filterForPL(data, params.list)
        }
      setFilterData(newData)
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params.list])
    console.log(filterData)
    if(isError) return (<div>{`Ups an Error : ${error.message}`}</div>) 
    if(filterData != undefined && filterData?.length == 0) return (<h2>No ha videos agregados a esta lista de reproduccion</h2>)

    return( 
    <section className='w-full flex flex-wrap lg:grid grid-cols-2 gap-3  rounded-sm shadow'>
    {filterData?.map((item) => ( 
   <CardToRender item={item}/>
     ))}
</section>)
}