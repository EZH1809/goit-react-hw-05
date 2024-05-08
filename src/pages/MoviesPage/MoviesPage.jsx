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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const movieParam = searchParams.get('query') ?? '';
  console.log('movieParam:', movieParam);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError(false);
        setLoading(true);
        console.log(
          'Fetching movies with query:',
          movieParam,
          'and page:',
          currentPage,
        );

        const response = await searchMovies(movieParam, currentPage);
        console.log('API response:', response);

        // Проверка типа данных response.results
        console.log('Type of response.results:', typeof response.results);
        console.log(
          'Is response.results an array?:',
          Array.isArray(response.results),
        );

        if (response && response.results && Array.isArray(response.results)) {
          console.log('Setting movies with results:', response.results);
          setMovies(response.results);
          setTotalPages(response.total_pages || 1);
        } else {
          console.log('No results found or results is not an array');
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(true);
      } finally {
        console.log('Loading finished');
        setLoading(false);
      }
    }
    fetchMovies();
  }, [searchParams, query, currentPage]);

  const handleSearchMovie = newMovie => {
    console.log('Searching for movie:', newMovie);
    setSearchParams({ query: newMovie });
    setQuery(newMovie);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      console.log('Navigating to next page:', currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      console.log('Navigating to previous page:', currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  console.log(
    'Current state: movies:',
    movies,
    'currentPage:',
    currentPage,
    'totalPages:',
    totalPages,
  );

  return (
    <div>
      <MovieSearchForm onSearch={handleSearchMovie} />
      {error && <p>Sorry, we have some troubles</p>}
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
