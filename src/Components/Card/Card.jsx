import styles from './Card.module.css'
import { getMovieImg } from '../../Services/movie_searcher';
import { Link } from 'react-router-dom';
function Card({movie}) {

    return (
                    <Link to={`movie/${movie.id}`} className={styles.card}>
                        <img className={styles.poster} alt="moviePhoto" src={getMovieImg(movie.poster_path)}></img>
                        <h3 className={styles.title}>{movie.title}</h3>
                        
                        <p className={styles.releaseDate}>{movie.release_date.split('-')[0]}</p>
                    </Link>
    );
            
            
}

export default Card;