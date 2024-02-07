
import {useFetchVideos } from './hooks/useApi.ts'
import { CardToRender } from './components/Card'
import { FavoritesVideosStore } from './ZustandStore/favoritesVideos.ts'
import { Nav } from './components/Nav/index.tsx'
function App() {
const {data, isLoading} = useFetchVideos()
const {favoritesVideosId} = FavoritesVideosStore()
if(isLoading) return( <h2>Cargando ...</h2>)

 console.log(data)
  return (
    <>
  <Nav/> 
  <main className='container box-content p-4'>
  <section className='w-full grid grid-cols-3 gap-3 rounded-sm shadow'>
			{data?.map((item) => (
        <CardToRender key={item._id} item={item}
        isInFavorites={favoritesVideosId.includes(item._id)}/>
			))}
		</section>
</main>
    </>
  )
}

export default App
