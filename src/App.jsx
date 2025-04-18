import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Error from "./Pages/Error";
import { MovieProvider } from "./Context/MovieContext/MovieContext";
import { FavoriteProvider } from "./Context/FavoriteContext/FavoriteContext";
import Favorites from "./Pages/Favorites";
import DropdownMenu from "./Components/DropdownMenu/DropdownMenu";
import { AnimatePresence } from "framer-motion";
import Credits from "./Pages/Credits";
function App() {
	return (
		<>
						<AnimatePresence mode="wait">
			<BrowserRouter>
				<MovieProvider>
					<FavoriteProvider>
							<DropdownMenu />
							<Routes>
								<Route key={'home'} path="/" element={<Home />} />
								<Route key={'movieDetails'}
									path="/movie/:id"
									element={<MovieDetails />}
								/>
								<Route key={'favorites'}
									path="favorites"
									element={<Favorites />}
								/>
								<Route key={'credits'} path="/credits" element={<Credits />} />
								<Route path="*" element={<Error />} />
							</Routes>
					</FavoriteProvider>
				</MovieProvider>
			</BrowserRouter>
						</AnimatePresence>
		</>
	);
}

export default App;
