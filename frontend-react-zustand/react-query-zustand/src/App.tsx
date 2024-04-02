import  { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useApiHook } from "./hooks/useApi.ts";
import { useApiUsersHook } from "./hooks/useApiUsers.ts";
import { PlaylistStore } from "./ZustandStore/playlistStore.ts";
import { UserStore } from "./ZustandStore/userStore.ts";
import { Nav } from "./components/Nav/index.tsx";

// elimino las importaciones explicitas como la de nav (que esta siempre) y las convierto en importaciones a demanda, para optimizar el renderizado. Importante, los componentes TIENEN que exportarse como DEFOULT, sino no se renderizan
const PrincipalDashboard = lazy(()=> import("./pages/PrincipalDashboard/index.tsx"));
const SearchResult = lazy(()=> import("./pages/SearchResult/index.tsx"));
const PrincipalSection = lazy(()=>import("./pages/PrincipalSection/index.tsx"));
const Form = lazy(()=>import("./components/Form/index.tsx"));
const VideoDetail = lazy(()=>import("./pages/VideoDetail/index.tsx"));
const UserPerfilEdit = lazy(()=> import("./pages/UserPerfilEditForm/index.tsx"))
const RestUserProfile = lazy(()=> import("./pages/RestUsersProfile/index.tsx"))

function App() {

	const {sincronizeListsInStoreWhitDb}= PlaylistStore()
	const {getAllUserFromDb} = UserStore()
	const {useFetchVideos}= useApiHook()
	const {data, isLoading } = useFetchVideos();
	const {useGetAllUsers}= useApiUsersHook()
    const {data : userData} = useGetAllUsers()
	useEffect(()=>{
		userData && getAllUserFromDb(userData)
		data && sincronizeListsInStoreWhitDb(data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[data, userData])
	if (isLoading) return <h2>Cargando ...</h2>;
	

	// Palet color sky-400 blue-400 indigo-400 violet-500 fuchsia-700 pink-700

	return (
		<>
			<BrowserRouter>
				<main className='container box-content m-auto py-2 h-screen w-screen overflow-scroll overflow-hidden'>
				<Nav />
					<Suspense fallback={<div className=" bg-slate-700 w-2/3 h-2/3 m-auto"> Loading... </div>}>
					<Routes>
						<Route  path='/' element={<PrincipalDashboard/>} />
						<Route path='/seAll' element={<PrincipalSection />} />
						<Route path='/search/list/:listName' element={<SearchResult />} />
						<Route path='/search/:list' element={<SearchResult />} />
						<Route path='/form' element={<Form />} />
						<Route path='/update/:id' element={<Form />} />
						<Route path='/detail/:id' element={<VideoDetail />} />
						<Route path='/userPerfil' element={<UserPerfilEdit />} />
						<Route path='/user/:id' element={< RestUserProfile/>} />
					</Routes>
          <ToastContainer/>
		</Suspense>
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;
