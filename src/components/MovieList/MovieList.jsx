import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.listItem}>
          <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
            <div className={styles.posterContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
              <div className={styles.rating}>
                <span>{movie.vote_average}</span>
              </div>
            </div>
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <p className={styles.movieYear}>
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
