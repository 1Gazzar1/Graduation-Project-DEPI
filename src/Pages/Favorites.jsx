import { useRef, useEffect, useState, useContext } from "react";
import { FavoriteContext } from "../Context/FavoriteContext/FavoriteContextHook";
import Card from "../Components/Card/Card";
import "../Styles/Favorites.css";
import { filterMovies } from "../Services/movie_searcher";
import SearchBar from "../Components/SearchBar/SearchBar";
import { motion as Motion } from "framer-motion";

function Favorites() {
    const { favorites } = useContext(FavoriteContext);
    const [shownFavorites, setShownFavorites] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setShownFavorites(
            filterMovies(favorites, {
                title: search,
                voteCount: 10,
                rating: 6,
                cast: [],
                releaseDate: 1950,
                genres: [],
            }),
        );
    }, [search, favorites]);



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
            <div className="cardList">
                {shownFavorites.map((m) => (
                    <Card key={m.id} movie={m} />
                ))}
            </div>
        </Motion.div>
    );
}

export default Favorites;
