import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useApiHook } from "./hooks/useApi.ts";
import { PlaylistStore } from "./ZustandStore/playlistStore.ts";
import { Nav } from "./components/Nav/index.tsx";
// elimino las importaciones explicitas como la de nav (que esta siempre) y las convierto en importaciones a demanda, para optimizar el renderizado. Importante, los componentes TIENEN que exportarse como DEFOULT, sino no se renderizan
const PrincipalDashboard = lazy(()=> import("./components/PrincipalDashboard"))
const SearchResult = lazy(()=> import("./components/SearchResult/index.tsx"))
const PrincipalSection = lazy(()=>import("./components/PrincipalSection/"));
const Form = lazy(()=>import("./components/Form/index.tsx"));
const VideoDetail = lazy(()=>import("./components/VideoDetail/index.tsx"));

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
					<Suspense fallback={<div className=" bg-slate-700 w-2/3 h-2/3 m-auto"> Loading... </div>}>
					<Routes>
						<Route  path='/' element={<PrincipalDashboard/>} />
						<Route path='/seAll' element={<PrincipalSection />} />
						<Route path='/search/list/:listName' element={<SearchResult />} />
						<Route path='/search/:list' element={<SearchResult />} />
						<Route path='/form' element={<Form />} />
						<Route path='/update/:id' element={<Form />} />
						<Route path='/detail/:id' element={<VideoDetail />} />
					</Routes>
          <ToastContainer/>
		</Suspense>
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;
