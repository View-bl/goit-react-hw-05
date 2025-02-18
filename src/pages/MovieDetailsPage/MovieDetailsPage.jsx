import { useParams, Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaStar, FaPlay } from "react-icons/fa";
import styles from "./MovieDetailsPage.module.css";
import TrailerModal from "../../components/TrailerModal/TrailerModal";

const API_KEY = "fa1c4d36238c3395415f197ac94e9567";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Помилка завантаження деталей фільму:", error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer"
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      } catch (error) {
        console.error("Помилка завантаження трейлера:", error);
      }
    };

    fetchMovieDetails();
    fetchTrailer();
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

      {trailerKey && (
        <button
          className={styles.trailerButton}
          onClick={() => setIsTrailerOpen(true)}
        >
          <FaPlay /> Дивитися трейлер
        </button>
      )}

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerKey={trailerKey}
      />

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
