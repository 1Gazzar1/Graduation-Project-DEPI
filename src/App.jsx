import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Error from "./Pages/Error";
import { MovieProvider } from "./Context/MovieContext/MovieContext";
import { FavoriteProvider } from "./Context/FavoriteContext/FavoriteContext";
import Favorites from "./Pages/Favorites";
import WatchedMovies from "./Pages/Watched";
import DropdownMenu from "./Components/DropdownMenu/DropdownMenu";
import { AnimatePresence } from "framer-motion";
import { WatchedProvider } from "./Context/WatchedContext/WatchedContext";
function App() {
    return (
        <>
            <AnimatePresence mode="wait">
                <BrowserRouter>
                    <MovieProvider>
                        <WatchedProvider>
                            <FavoriteProvider>
                                <DropdownMenu />
                                <Routes>
                                    <Route
                                        key={"home"}
                                        path="/"
                                        element={<Home />}
                                    />
                                    <Route
                                        key={"movieDetails"}
                                        path="/movie/:id"
                                        element={<MovieDetails />}
                                    />
                                    <Route
                                        key={"favorites"}
                                        path="/favorites"
                                        element={<Favorites />}
                                    />
                                    <Route
                                        key={"watched"}
                                        path="/watched"
                                        element={<WatchedMovies />}
                                    />
                                    <Route path="*" element={<Error />} />
                                </Routes>
                            </FavoriteProvider>
                        </WatchedProvider>
                    </MovieProvider>
                </BrowserRouter>
            </AnimatePresence>
        </>
    );
}

export default App;
