import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=fa1c4d36238c3395415f197ac94e9567`
        );
        setReviews(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading)
    return <div className={styles.loading}>Завантаження відгуків...</div>;
  if (error) return <p className={styles.error}>Помилка: {error.message}</p>;

  return (
    <div className={styles.reviewsContainer}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={styles.review}>
            <h3 className={styles.author}>{review.author}</h3>
            <p className={styles.content}>{review.content}</p>
          </div>
        ))
      ) : (
        <p className={styles.noReviews}>Відгуки відсутні для цього фільму.</p>
      )}
    </div>
  );
};

export default MovieReviews;
