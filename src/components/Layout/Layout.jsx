import { Suspense } from 'react';
import css from '../Layout/Layout.module.css';
import Navigation from '../Navigation/Navigation';
import Loader from '../Loader/Loader';

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
}
