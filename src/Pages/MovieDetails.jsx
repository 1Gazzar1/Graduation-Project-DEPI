import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/MovieDetails.css";
import { getMovieById, getMovieImg } from "../Services/movie_searcher";
import { MovieContext } from "../Context/MovieContext/MovieContextHook.jsx";
import { FavoriteContext } from "../Context/FavoriteContext/FavoriteContextHook.jsx";
import styles from "../Components/Card/Card.module.css";
import { motion as Motion } from "framer-motion";
function MovieDetails() {
	const params = useParams();
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { allMovies } = useContext(MovieContext);
	const { isFavorite, addFavorite, removeFavorite } =
		useContext(FavoriteContext);
	const [_secretKey, setSecretKey] = useState([]);
	const [_pirate,setPirate] = useState(false);

	useEffect(() => {
		const loadstuff = async () => {
			setLoading(true);
			const mv = await getMovieById(allMovies, params.id);
			if (!mv) return setError("There is no movie here 😞😞");
			setError("")
			setMovie(mv);

			setLoading(false);
		};

		loadstuff();
	}, [allMovies, params]);

	useEffect(() => {
		const handler = (e) => {
			const key = e.key.toLowerCase();
			setSecretKey((prevKeys) => {
				const updated = [...prevKeys, key].slice(-6); // keep last 6 keys
	
				if (updated.join("") === "pirate") {
					alert("you are a pirate");
					setPirate(true)
				}
	
				return updated;
			});
		};
	
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler); 
	}, []); 

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
							{/* {pirate && (
								<a
									className="downloadBtn"
									target="_blank"
									href={getMovieytsURL(movie)}
								>
									<svg
										aria-hidden="true"
										focusable="false"
										data-prefix="fas"
										data-icon="arrow-down-to-line"
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 384 512"
										class="svg-inline--fa fa-arrow-down-to-line fa-fw fa-lg"
									>
										<path
											fill="orange"
											d="M32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480zM214.6 342.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 242.7 160 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 178.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128z"
											class=""
										></path>
									</svg>
								</a>
							)} */}
							<a
								className="downloadBtn"
								rel="noopener noreferrer"
								target="_blank"
								href={searchIMDB(movie)}
							>
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="arrow-down-to-line"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 384 512"
									class="svg-inline--fa fa-arrow-down-to-line fa-fw fa-lg"
								>
									<path
										d="M32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480zM214.6 342.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 242.7 160 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 178.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128z"
										class=""
									></path>
								</svg>
							</a>
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
						<h3 className="mb-20">
							Rating :{" "}
							<span className="red">{movie.vote_average}</span>{" "}
						</h3>
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
								{movie.genres.map((g, i) => (
									<li key={i}> {g}</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className="mb-20">Main Cast Members :</h3>
							<ul className="mb-20 ml-40">
								{movie.cast.map((c, i) => (
									<li key={i}>{c}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</Motion.div>
	);
}

export default MovieDetails;

// function getMovieytsURL(movie) {
// 	const movieName = movie.title.toLowerCase();
// 	const movieYear = movie.release_date.split("-")[0];
// 	const fullMovie = movieName.split(" ").join("-") + "-" + movieYear;
// 	return `https://www.yts.mx/movies/${fullMovie}`;
// }
function searchIMDB(movie) {
	if (!movie.title) return;
	const query = encodeURIComponent(
		`${movie.title} ${movie.release_date.split("-")[0]}`
	);
	return `https://www.imdb.com/find?q=${query}&s=tt`;
}
