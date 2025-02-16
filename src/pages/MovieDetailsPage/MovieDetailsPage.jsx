// MovieDetailsPage.js
import { useParams, Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaStar } from "react-icons/fa";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=fa1c4d36238c3395415f197ac94e9567`
      )
      .then((response) => setMovie(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  if (!movie) return <div className={styles.spinner}></div>;

  return (
    <div className={styles.detailsContainer}>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={styles.movieImage}
      />
      <p>
        <strong>Опис:</strong> {movie.overview}
      </p>
      <p>
        <strong>Дата випуску:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Рейтинг:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Бюджет:</strong>{" "}
        {movie.budget ? movie.budget : "Інформація відсутня"}
      </p>
      <p>
        <strong>Популярність:</strong> {movie.popularity}
      </p>

      <div className={styles.links}>
        <Link to="cast">
          <FaUsers /> Актори
        </Link>
        <Link to="reviews">
          <FaStar /> Рецензії
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
