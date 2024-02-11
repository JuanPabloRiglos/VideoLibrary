import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useApiHook } from "./hooks/useApi.ts";
import { PlaylistStore } from "./ZustandStore/playlistStore.ts";
import { Nav } from "./components/Nav/index.tsx";
import {PrincipalDashboard} from './components/PrincipalDashboard'
import { Form } from "./components/Form/index.tsx";
import { PrincipalSection } from "./components/PrincipalSection/index.tsx";
import { SearchResult } from "./components/SearchResult/index.tsx";
import { VideoDetail } from "./components/VideoDetail/index.tsx";
function App() {
	const {sincronizeListsInStoreWhitDb}= PlaylistStore()
	const {useFetchVideos}= useApiHook()
	const {data, isLoading } = useFetchVideos();
	useEffect(()=>{
	data && sincronizeListsInStoreWhitDb(data);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[data])
	if (isLoading) return <h2>Cargando ...</h2>;
	
	return (
		<>
			<BrowserRouter>
				<Nav />
				<main className='container box-content m-auto p-2'>
					<Routes>
						<Route  path='/' element={<PrincipalDashboard />} />
						<Route path='/seAll' element={<PrincipalSection />} />
						<Route path='/search/list/:listName' element={<SearchResult />} />
						<Route path='/search/:list' element={<SearchResult />} />
						<Route path='/form' element={<Form />} />
						<Route path='/update/:id' element={<Form />} />
						<Route path='/detail/:id' element={<VideoDetail />} />
					</Routes>
          <ToastContainer/>
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;
