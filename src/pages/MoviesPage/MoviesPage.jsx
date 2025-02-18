import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=fa1c4d36238c3395415f197ac94e9567`
      )
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const newQuery = form.elements.search.value.trim();
    setSearchParams(newQuery ? { query: newQuery } : {});
  };

  return (
    <div className={s.pageContainer}>
      <form onSubmit={handleSearch} className={s.searchWrapper}>
        <input
          name="search"
          defaultValue={query}
          placeholder="Шукати фільми..."
          className={s.input}
        />
        <button type="submit" className={s.searchButton}>
          Пошук
        </button>
      </form>

      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
