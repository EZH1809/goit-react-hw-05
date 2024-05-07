import { useEffect, useState } from 'react';
import MovieSearchForm from '../../components/MovieSearchForm/MovieSearchForm';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../movies-api';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError(false);
        setLoading(true);
        const movieParam = searchParams.get('query') ?? '';
        const data = await searchMovies(movieParam);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [searchParams]);

  const handleSearchMovie = newMovie => {
    setSearchParams({ query: newMovie });
    setQuery(newMovie);
  };

  return (
    <div>
      <MovieSearchForm onSearch={handleSearchMovie} />
      {error && <p>Sorry, we have some troubles</p>}
      {loading && <p>Loading movies</p>}
      {movies.length > 0 && <MovieList data={movies} />}
    </div>
  );
}
