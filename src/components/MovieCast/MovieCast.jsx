import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../movies-api';
import css from '../MovieCast/MovieCast';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setError(false);
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (error) {
        setError(true);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={css.castList}>
      {error && <p>Sorry, we have a problem</p>}
      {cast && cast.length > 0 ? (
        <ul className={css.castItem}>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt="actor photo"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We did not find any information about the actors.</p>
      )}
    </div>
  );
}
