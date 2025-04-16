import { useRef, useEffect, useState, useContext } from "react";
import { FavoriteContext } from "../Context/FavoriteContext/FavoriteContextHook";
import Card from "../Components/Card/Card";
import "../Styles/Favorites.css";
import { filterMovies } from "../Services/movie_searcher";
import SearchBar from "../Components/SearchBar/SearchBar";

function Favorites() {
	const { favorites } = useContext(FavoriteContext);
	const [ shownFavorites, setShownFavorites ]= useState([]);
	const [search, setSearch] = useState("");
	const textRef = useRef();

	useEffect(() => {
		setShownFavorites(
			filterMovies(favorites, {
				title: search,
				voteCount: 10,
				rating: 6,
				cast: [],
				releaseDate: 1950,
				genres: [],
			})
		);
	}, [search,favorites]);

	useEffect(() => {
		const handleFocus = (e) => {
			if (e.key === "/") {
				e.preventDefault();
				textRef.current.focus();
			}
		};

		window.addEventListener("keydown", handleFocus);

		return () => {
			window.removeEventListener("keydown", handleFocus);
		};
	}, []);

	return (
		<>
			<div className="searchBar">
				<SearchBar labelText={'Title'}
							ref={textRef}
							searchVal={search}
							onChange={(e) => setSearch(e.target.value)} />
			</div>
			<div className="cardList">
				{shownFavorites.map((m) => (
					<Card key={m.id} movie={m} />
				))}
			</div>
		</>
	);
}

export default Favorites;
