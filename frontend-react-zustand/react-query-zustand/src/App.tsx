import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useFetchVideos } from "./hooks/useApi.ts";
import { Nav } from "./components/Nav/index.tsx";
import { Form } from "./components/Form/index.tsx";
import { PrincipalSection } from "./components/PrincipalSection/index.tsx";
import { ToastContainer } from "react-toastify";
function App() {
	const { isLoading } = useFetchVideos();
	if (isLoading) return <h2>Cargando ...</h2>;

	return (
		<>
			<BrowserRouter>
				<Nav />
				<main className='container box-content m-auto p-4'>
					<Routes>
						<Route path='/' element={<PrincipalSection />} />
						<Route path='/form' element={<Form />} />
            <Route path='/update/:id' element={<Form />} />
					</Routes>
          <ToastContainer/>
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;
