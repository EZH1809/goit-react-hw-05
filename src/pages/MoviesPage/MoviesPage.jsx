import { useEffect, useState } from 'react';
import MovieSearchForm from '../../components/MovieSearchForm/MovieSearchForm';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../movies-api';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [movies, setmovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const movieParam = searchParams.get('query') ?? '';

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError(false);
        setLoading(true);

        const response = await searchMovies(movieParam, currentPage);

   
        if (response && response.results && Array.isArray(response.results)) {
          setmovies(response.results);
          setTotalPages(response.total_pages || 1);
        } else {
          setmovies([]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [searchParams, query, currentPage]);

  const handleSearchMovie = newMovie => {
    setSearchParams({ query: newMovie });
    setQuery(newMovie);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <MovieSearchForm onSearch={handleSearchMovie} />
      {error && <p>Sorry, we have some troubles</p>}
      {loading && <p>Loading movies</p>}
      {movies.length > 0 && (
        <>
          <MovieList movies={movies} />
          <div>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}
