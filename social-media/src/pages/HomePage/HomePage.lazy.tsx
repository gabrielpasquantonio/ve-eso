import Loader from 'components/Loader/Loader';
import React, { lazy, Suspense } from 'react';

const HomePageLazy = lazy(() => import('./HomePage'));

const defaultProps = { children: '' };

const HomePage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
): JSX.Element => (
  <Suspense fallback={<Loader />}>
    <HomePageLazy {...props} />
  </Suspense>
);

HomePage.defaultProps = defaultProps;

export default HomePage;
