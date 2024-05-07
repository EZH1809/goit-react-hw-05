import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getTrendingMovies } from '../../movies-api';
import Loader from '../../components/Loader/Loader';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <h2>Trending today</h2>

      {loading && <Loader />}
      {error && <b>Sorry, we have a problem</b>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
