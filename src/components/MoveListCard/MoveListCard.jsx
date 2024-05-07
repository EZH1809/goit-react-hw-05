import { Link, useLocation } from 'react-router-dom';
import css from './MoveListCard.module.css';

export default function MoviesListCard({ movie }) {
  const location = useLocation();

  return (
    <li key={movie.id} className={css.card}>
      <Link to={`/movies/${movie.id}`} state={location}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />

        <div className={css.title}> {movie.title} </div>
        <div className={css.dataRelease}>
          {' '}
          Date release: {movie.release_date}
        </div>
      </Link>
    </li>
  );
}
