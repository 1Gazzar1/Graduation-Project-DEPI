import styles from "./Card.module.css";
import { getMovieImg } from "../../Services/movie_searcher";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../../Context/FavoriteContext/FavoriteContextHook";
function Card({ movie }) {
	const {isFavorite, addFavorite, removeFavorite } =
		useContext(FavoriteContext);

	return (
		<div className={styles.card}>
			<Link to={`movie/${movie.id}`} className={styles.poster}>
				<img
					className={styles.poster}
					alt="moviePhoto"
					src={getMovieImg(movie.poster_path)}
					loading="lazy"
				></img>
			</Link>
			<h3 className={styles.title}>{movie.title}</h3>

			<p className={styles.releaseDate}>
				{movie.release_date.split("-")[0]}
			</p>
			<button
				onClick={() => 
					isFavorite(movie.id)
						? removeFavorite(movie.id)
						: addFavorite(movie)
				}
				className={`${styles.heart} ${
					isFavorite(movie.id) ? styles.active : ""
				}`}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
				</svg>
			</button>
		</div>
	);
}

export default Card;
