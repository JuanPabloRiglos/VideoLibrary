import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useFetchVideos } from './hooks/useApi.ts'
import { Nav } from './components/Nav/index.tsx'
import { Form } from './components/Form/index.tsx'
import { PrincipalSection } from './components/PrincipalSection/index.tsx'
function App() {
const { isLoading} = useFetchVideos()
if(isLoading) return( <h2>Cargando ...</h2>)


  return (
    <>
  <Nav/> 
  <BrowserRouter>
  <main className='container box-content p-4'>
    <Routes>
<Route path='/' element={<PrincipalSection/>}/>
<Route path='/form' element={<Form/>}/>
    </Routes>
</main> 
</BrowserRouter>
    </>
  )
}

export default App
