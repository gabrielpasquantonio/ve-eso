import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.Loader} data-testid="Loader">
      <span className="spinner-border spinner-border-sm" />
      Loading...
    </div>
  );
};

export default React.memo(Loader);
