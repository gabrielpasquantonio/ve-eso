import Loader from 'components/Loader/Loader';
import React, { lazy, Suspense } from 'react';

const TwitterPageLazy = lazy(() => import('./TwitterPage'));

const defaultProps = { children: '' };

const TwitterPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
): JSX.Element => (
  <Suspense fallback={<Loader />}>
    <TwitterPageLazy {...props} />
  </Suspense>
);

TwitterPage.defaultProps = defaultProps;

export default TwitterPage;
