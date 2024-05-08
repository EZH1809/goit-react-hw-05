import { useEffect, useState } from 'react';
import MovieSearchForm from '../../components/MovieSearchForm/MovieSearchForm';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../movies-api';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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

        if (response && Array.isArray(response.results)) {
          setMovies(response.results);
          setTotalPages(response.total_pages || 1);
        } else {
          setMovies([]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [movieParam, currentPage]);

  const handleSearchMovie = newMovie => {
    setSearchParams({ query: newMovie });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      console.log(`Navigating to next page: ${nextPage}`);
      setCurrentPage(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      console.log(`Navigating to previous page: ${previousPage}`);
      setCurrentPage(previousPage);
    }
  };

  return (
    <div>
      <MovieSearchForm onSearch={handleSearchMovie} />
      {error && <p>Sorry, we have a problem</p>}
      {loading && <p>Loading movies...</p>}
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
