import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css"; 

function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = () => {
    if (query.trim() !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=fa1c4d36238c3395415f197ac94e9567`
        )
        .then((response) => setMovies(response.data.results))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className={s.pageContainer}>
      <div className={s.searchWrapper}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Шукати фільми..."
          className={s.input}
        />
        <button onClick={searchMovies} className={s.searchButton}>
          Пошук
        </button>
      </div>

      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
