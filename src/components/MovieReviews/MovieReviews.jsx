import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../movies-api';
import Loader from '../Loader/Loader';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && (
        <p>Sorry, we have a little problem. Try again a few minutes.</p>
      )}
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        'We don`t have any reviews for tis movie'
      )}
    </div>
  );
}
