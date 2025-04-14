import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../Services/movie_searcher";
import "../Styles/MovieDetails.css";
import { getMovieImg } from "../Services/movie_searcher";
import { MovieContext } from '../Context/MovieContext/MovieContextHook.jsx';

function MovieDetails() {
  const params = useParams();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("");
  const { allMovies } = useContext(MovieContext);

  useEffect(() => {
    const loadstuff = async () => {
      setLoading(true);
      const movie = await getMovieById(allMovies, params.id);
      if (movie){
        setMovie(movie);
      } 
      else{
        setError("there is no movie here 😞😞")
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
            <h1 className="ml-20">{movie.title}</h1>
            <h3 className="ml-20">{movie.release_date}</h3>
            <img src={getMovieImg(movie.poster_path)} />
          </div>
          <div className="movieDetails">
            <h3 className="mb-20">Rating : {movie.vote_average}</h3>
            <h3 className="mb-20">Vote Count : {movie.vote_count}</h3>

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
