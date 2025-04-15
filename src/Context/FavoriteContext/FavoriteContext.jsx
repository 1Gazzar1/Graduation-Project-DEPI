import { useEffect, useState } from "react";
import { FavoriteContext } from "./FavoriteContextHook";

export function FavoriteProvider({ children }) {
	const [favorites, setFavorites] = useState(
		JSON.parse(localStorage.getItem("favorites")) || []
	);

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);
	function isFavorite(id) {
		return favorites.some((m) => m.id === id);
	}
	function addFavorite(movie) {
		setFavorites((f) => [...f, movie]);
	}
	function removeFavorite(id) {
		setFavorites((f) => f.filter((m) => m.id !== id));
	}

	return (
		<FavoriteContext.Provider
			value={{ favorites, isFavorite, addFavorite, removeFavorite }}
		>
			{children}
		</FavoriteContext.Provider>
	);
}
