import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <h2>We can't find that page</h2>
      <p>
        Please visit our <Link to="/">home page</Link>
      </p>
    </div>
  );
}
