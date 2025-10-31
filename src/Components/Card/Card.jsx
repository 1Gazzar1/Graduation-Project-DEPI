import styles from "./Card.module.css";
import { getMovieImg } from "../../Services/movie_searcher";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../../Context/FavoriteContext/FavoriteContextHook";
import { WatchedContext } from "../../Context/WatchedContext/WatchedContextHook";
function Card({ movie }) {
    const { isFavorite, addFavorite, removeFavorite } =
        useContext(FavoriteContext);
    const { isWatched, addWatchedMovie, removeWatchedMovie } =
        useContext(WatchedContext);

    return (
        <div className={styles.card}>
            <Link to={`/movie/${movie.id}`} className={styles.poster}>
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
                        : addFavorite(movie.id)
                }
                className={`${styles.heart} ${
                    isFavorite(movie.id) ? styles.active : ""
                }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
            </button>
            <button
                onClick={() =>
                    isWatched(movie.id)
                        ? removeWatchedMovie(movie.id)
                        : addWatchedMovie(movie.id)
                }
                className={`${styles.watched} 
                ${isWatched(movie.id) ? styles.active : ""}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M96 160L96 400L544 400L544 160L96 160zM32 160C32 124.7 60.7 96 96 96L544 96C579.3 96 608 124.7 608 160L608 400C608 435.3 579.3 464 544 464L96 464C60.7 464 32 435.3 32 400L32 160zM192 512L448 512C465.7 512 480 526.3 480 544C480 561.7 465.7 576 448 576L192 576C174.3 576 160 561.7 160 544C160 526.3 174.3 512 192 512z" />
                </svg>
            </button>
        </div>
    );
}

export default Card;
