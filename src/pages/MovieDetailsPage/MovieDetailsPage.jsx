import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaUsers, FaStar, FaPlay } from "react-icons/fa";
import styles from "./MovieDetailsPage.module.css";
import TrailerModal from "../../components/TrailerModal/TrailerModal";

const API_KEY = "fa1c4d36238c3395415f197ac94e9567";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        setMovie(data);
      } catch (error) {
        console.error("Помилка завантаження деталей фільму:", error);
        setError("Не вдалося завантажити деталі фільму.");
      } finally {
        setLoading(false);
      }
    };

    const fetchTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        const trailers = data.results.filter(
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

  if (loading) return <div className={styles.spinner}></div>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return <p>Фільм не знайдено</p>;

  return (
    <div className={styles.detailsContainer}>
      <Link to={backLinkRef.current} className={styles.goBack}>
        ← Go back
      </Link>

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
        <strong>Рейтинг:</strong> {movie.vote_average.toFixed(1)}
      </p>
      <p>
        <strong>Бюджет:</strong>{" "}
        {movie.budget
          ? `$${movie.budget.toLocaleString()}`
          : "Інформація відсутня"}
      </p>
      <p>
        <strong>Популярність:</strong> {movie.popularity.toFixed(1)}
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
