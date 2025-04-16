import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Error from "./Pages/Error";
import { MovieProvider } from "./Context/MovieContext/MovieContext";
import { FavoriteProvider } from "./Context/FavoriteContext/FavoriteContext";
import Favorites from "./Pages/Favorites";
import DropdownMenu from "./Components/DropdownMenu/DropdownMenu";
import { AnimatePresence } from "framer-motion";
function App() {
	return (
		<>
			<BrowserRouter>
				<MovieProvider>
					<FavoriteProvider>
						<AnimatePresence mode="wait">
							<DropdownMenu />
							<Routes>
								<Route path="/" element={<Home />} />
								<Route
									path="/movie/:id"
									element={<MovieDetails />}
								/>
								<Route
									path="favorites"
									element={<Favorites />}
								/>
								<Route path="*" element={<Error />} />
							</Routes>
						</AnimatePresence>
					</FavoriteProvider>
				</MovieProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
