import { useEffect, useState, useContext } from "react";
import { WatchedContext } from "./WatchedContextHook";
import { MovieContext } from "../MovieContext/MovieContextHook";
import { getMoviesByIds } from "../../Services/movie_searcher";

export function WatchedProvider({ children }) {
    const [watchedMovieIds, setWatchedMovieIds] = useState(
        JSON.parse(localStorage.getItem("watched")) || [],
    );
    const [watchedMovies, setWatchedMovies] = useState([]);
    // so i can fetch it through ids
    const { allMovies } = useContext(MovieContext);

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watchedMovieIds));
    }, [watchedMovieIds]);

    useEffect(() => {
        const movies = getMoviesByIds(allMovies, watchedMovieIds);
        setWatchedMovies(movies);
    }, [watchedMovieIds, allMovies]);

    const isWatched = (id) => {
        return watchedMovieIds.includes(id);
    };
    const addWatchedMovie = (id) => {
        setWatchedMovieIds((w) => [...w, id]);
    };
    const removeWatchedMovie = (newId) => {
        setWatchedMovieIds((w) => w.filter((id) => id !== newId));
    };

    const contextValue = {
        isWatched,
        addWatchedMovie,
        removeWatchedMovie,
        watchedMovies,
    };
    return (
        <WatchedContext.Provider value={contextValue}>
            {children}
        </WatchedContext.Provider>
    );
}
