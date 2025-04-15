import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../Services/movie_searcher";
import "../Styles/MovieDetails.css";
import { getMovieImg } from "../Services/movie_searcher";
import { MovieContext } from "../Context/MovieContext/MovieContextHook.jsx";
import { FavoriteContext } from "../Context/FavoriteContext/FavoriteContextHook.jsx";
import styles from "../Components/Card/Card.module.css";
function MovieDetails() {
	const params = useParams();
	const [movie, setMovie] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { allMovies } = useContext(MovieContext);
	const { isFavorite, addFavorite, removeFavorite } =
		useContext(FavoriteContext);

	useEffect(() => {
		const loadstuff = async () => {
			setLoading(true);
			const movie = await getMovieById(allMovies, params.id);
			if (movie) {
				setMovie(movie);
			} else {
				setError("there is no movie here 😞😞");
			}
			setLoading(false);
		};

		loadstuff();
	}, [allMovies, params]);

	return (
		<>
			{error.length > 0 && <h1>{error}</h1>}
			{loading && "LOADING"}
			{!loading && movie && (
				<div className="movieContainer">
					<div className="movieImg">
						<div className="aboveImg">
							<div>
							<h1 className="ml-20">{movie.title}</h1>
							<h3 className="ml-20">{movie.release_date}</h3>
							</div>
							<button
								onClick={() =>
									isFavorite(movie.id)
										? removeFavorite(movie.id)
										: addFavorite(movie)
								}
								className={`heart ${
									isFavorite(movie.id) ? styles.active : ""
								}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
								</svg>
							</button>
						</div>
						<img src={getMovieImg(movie.poster_path)} />
					</div>
					<div className="movieDetails">
						<h3 className="mb-20">Rating : <span className="red">{movie.vote_average}</span> </h3>
						<h3 className="mb-20">
							Vote Count : {movie.vote_count}
						</h3>

						<div>
							<h3 className="mb-20">Overview : </h3>
							<p className="ml-20">{movie.overview}</p>
						</div>

						<div>
							<h3 className="mb-20">Genres :</h3>
							<ul className="mb-20 ml-40">
								{movie.genres.map((g) => (
									<li> {g}</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className="mb-20">Main Cast Members :</h3>
							<ul className="mb-20 ml-40">
								{movie.cast.map((c) => (
									<li>{c}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default MovieDetails;
