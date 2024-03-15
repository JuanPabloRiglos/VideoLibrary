import { useApiHook } from "../../hooks/useApi"
// import { FavoritesVideosStore } from "../../ZustandStore/favoritesVideos"
import { Video } from "../../hooks/types"
import { CardToRender } from "../../components/Card"

//Seccion principal de renderizado de la API
export default function PrincipalSection(){
    const {useFetchVideos} = useApiHook()
    const {data, isError, error} = useFetchVideos()
   

    if(isError) return (<div>{`Ups an Error : ${error.message}`}</div>) 

    return( 
    <section className='mt-auto w-full h-screen flex flex-wrap lg:grid grid-cols-3 gap-1 rounded-sm shadow overflow-scroll'>
    {data?.map((item : Video) => (
    <CardToRender key={item._id} item={item}
    
    />
    ))}
</section>)
}