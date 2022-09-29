import React from 'react';
import styles from './CustomHeader.module.scss';

const CustomHeader: React.FC = () => {
  return (
    <div className={styles.CustomHeader} data-testid="CustomHeader">
      <h1>
        p<span>o</span>sterr<span>.</span>
      </h1>
    </div>
  );
};

export default React.memo(CustomHeader);
