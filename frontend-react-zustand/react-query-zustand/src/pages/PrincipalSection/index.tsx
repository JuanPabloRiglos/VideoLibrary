// import { useApiHook } from "../../hooks/useApi"
// import { FavoritesVideosStore } from "../../ZustandStore/favoritesVideos"
import { Video } from "../../hooks/types"
import { CardToRender } from "../../components/Card"
import { PlaylistStore } from "../../ZustandStore/playlistStore"
import { memo, useEffect, useState } from "react"

//Seccion principal de renderizado de la API
export default function PrincipalSection(){
    const {allVideosDb} = PlaylistStore() //sincronizeListsInStoreWhitDb
    const [videoToRender, setVideoToRender] = useState (allVideosDb)
    console.log('en el padre, todos los videos',allVideosDb)
    //  if(isError) return (<div>{`Ups an Error : ${error.message}`}</div>) 
    const MemoCardToRender = memo(CardToRender)
useEffect(()=>{
    setVideoToRender(allVideosDb)
},[allVideosDb])

    return( 
    <section className='bg-rose-50 border-2 mt-auto w-full h-screen flex flex-wrap lg:grid grid-cols-3 gap-1 rounded-sm shadow overflow-scroll'>
    {videoToRender?.map((item : Video) => (
    <MemoCardToRender key={item._id} item={item}
    //  setChange={setChange}
    
    />
    ))}
</section>)
}