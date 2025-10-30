import { useRef, useEffect, useState, useContext } from "react";
import Card from "../Components/Card/Card";
import "../Styles/Favorites.css";
import { filterMovies } from "../Services/movie_searcher";
import SearchBar from "../Components/SearchBar/SearchBar";
import { motion as Motion } from "framer-motion";
import { WatchedContext } from "../Context/WatchedContext/WatchedContextHook";
import { FavoriteContext } from "../Context/FavoriteContext/FavoriteContextHook";

function WatchedMovies() {
    const { watchedMovies } = useContext(WatchedContext);
    const { isFavorite } = useContext(FavoriteContext);
    const [shownWatchedMovies, setShownWatchedMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [showLiked, setShowLiked] = useState(true);

    useEffect(() => {
        setShownWatchedMovies(
            filterMovies(watchedMovies, {
                title: search,
                voteCount: 10,
                rating: 6,
                cast: [],
                releaseDate: 1950,
                genres: [],
            }),
        );
    }, [search, watchedMovies]);
    const displayedMovies = showLiked
        ? shownWatchedMovies
        : shownWatchedMovies.filter((m) => !isFavorite(m.id));

    return (
        <Motion.div
            initial={{
                x: 20,
                opacity: 0,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
            exit={{
                x: 20,
                opacity: 0,
            }}
            transition={{ duration: 0.4, type: "ease" }}
        >
            <div className="searchBar">
                <SearchBar
                    labelText={"Title"}
                    searchVal={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="like-btn">
                <label htmlFor="switch">Show Liked</label>
                <div className="toggle-btn">
                    <input
                        type="checkbox"
                        id="switch"
                        onChange={() => setShowLiked(!showLiked)}
                        checked={showLiked}
                    />
                    <label htmlFor="switch"></label>
                </div>
            </div>

            <div className="cardList">
                {displayedMovies.map((m) => (
                    <Card key={m.id} movie={m} />
                ))}
            </div>
        </Motion.div>
    );
}

export default WatchedMovies;
