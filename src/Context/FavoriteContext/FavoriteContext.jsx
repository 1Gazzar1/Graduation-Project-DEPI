import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "./FavoriteContextHook";
import { MovieContext } from "../MovieContext/MovieContextHook";
import { getMoviesByIds } from "../../Services/movie_searcher";

export function FavoriteProvider({ children }) {
    // this contains the movie ids
    const [favoriteMovieIds, setFavoriteMovieIds] = useState(
        JSON.parse(localStorage.getItem("favorites")) || [],
    );
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    // so i can fetch it through ids
    const { allMovies } = useContext(MovieContext);

    // load local storage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favoriteMovieIds));
    }, [favoriteMovieIds]);

    // fetch the movies through their Ids
    useEffect(() => {
        const movies = getMoviesByIds(allMovies, favoriteMovieIds);
        setFavoriteMovies(movies);
    }, [favoriteMovieIds,allMovies]);

    function isFavorite(id) {
        return favoriteMovieIds.includes(id);

    }
    function addFavorite(id) {
        setFavoriteMovieIds((f) => [...f, id]);
    }
    function removeFavorite(newId) {
        setFavoriteMovieIds((f) => f.filter((id) => id !== newId));
    }

    return (
        <FavoriteContext.Provider
            value={{ favoriteMovies, isFavorite, addFavorite, removeFavorite }}
        >
            {children}
        </FavoriteContext.Provider>
    );
}
