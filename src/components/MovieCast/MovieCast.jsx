import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fa1c4d36238c3395415f197ac94e9567`
      )
      .then((response) => setCast(response.data.cast))
      .catch((error) => console.error(error));
  }, [movieId]);

  return (
    <div className={styles.castContainer}>
      {cast.length > 0 ? (
        cast.map((actor) => (
          <div key={actor.id} className={styles.actorItem}>
            <div className={styles.actorImageWrapper}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className={styles.actorImage}
                />
              ) : (
                <div className={styles.noImage}>Без фото</div>
              )}
            </div>
            <div className={styles.actorDetails}>
              <div className={styles.actorName}>{actor.name}</div>
              <div className={styles.characterRole}>
                Роль: {actor.character || "Не визначено"}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noCast}>Інформація про акторів відсутня</p>
      )}
    </div>
  );
}

export default MovieCast;
