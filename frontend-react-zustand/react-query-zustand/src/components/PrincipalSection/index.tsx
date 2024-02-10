import { useApiHook } from "../../hooks/useApi"
// import { FavoritesVideosStore } from "../../ZustandStore/favoritesVideos"
import { Video } from "../../hooks/types"
import { CardToRender } from "../Card"

//Seccion principal de renderizado de la API
export function PrincipalSection(){
    const {useFetchVideos} = useApiHook()
    const {data, isError, error} = useFetchVideos()
   

    if(isError) return (<div>{`Ups an Error : ${error.message}`}</div>) 

    return( 
    <section className='w-full flex flex-wrap lg:grid grid-cols-3 gap-2 rounded-sm shadow'>
    {data?.map((item : Video) => (
    <CardToRender key={item._id} item={item}
    
    />
    ))}
</section>)
}