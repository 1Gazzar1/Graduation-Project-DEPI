import { useEffect, useState } from "react";
import { WatchedContext } from "./WatchedContextHook";

export function WatchedProvider({ children }) {
    const [watchedMovies, setWatchedMovies] = useState(
        JSON.parse(localStorage.getItem("watched")) || [],
    );
    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watchedMovies));
    }, [watchedMovies]);

    const isWatched = (id) => {
        return watchedMovies.some((m) => m.id === id);
    };
    const addWatchedMovie = (newMovie) => {
        setWatchedMovies((w) => [...w, newMovie]);
    };
    const removeWatchedMovie = (id) => {
        setWatchedMovies((w) => w.filter((m) => m.id !== id));
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
