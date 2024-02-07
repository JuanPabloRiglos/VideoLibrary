import { useFetchVideos } from "../../hooks/useApi"
import { FavoritesVideosStore } from "../../ZustandStore/favoritesVideos"
import { Video } from "../../hooks/types"
import { CardToRender } from "../Card"

//Seccion principal de renderizado de la API
export function PrincipalSection(){
    const {data, isError, error} = useFetchVideos()
    const {favoritesVideosId}= FavoritesVideosStore()// despues modificar a playlist

    if(isError) return (<div>{`Ups an Error : ${error.message}`}</div>) 

    return( 
    <section className='w-full grid grid-cols-3 gap-3 rounded-sm shadow'>
    {data?.map((item : Video) => (
    <CardToRender key={item._id} item={item}
    isInFavorites={favoritesVideosId.includes(item._id)}/>
    ))}
</section>)
}