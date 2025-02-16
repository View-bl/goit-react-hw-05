// HomePage.js
import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=fa1c4d36238c3395415f197ac94e9567"
      )
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return <MovieList movies={movies} />;
}

export default HomePage;
