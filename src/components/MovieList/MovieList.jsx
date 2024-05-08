import MovieListCard from '../MoveListCard/MoveListCard.jsx';
import css from './MovieList.module.css';

export default function MoviesList({ movies }) {
  return (
    <div>
      <ul className={css.card}>
        {movies.map(movie => (
          <MovieListCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
