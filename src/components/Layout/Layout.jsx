import { Suspense } from 'react';
// import layoutStyles from '../Layout/Layout.module.css';
import Navigation from '../Navigation/Navigation';
import Loader from '../Loader/Loader';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
}
