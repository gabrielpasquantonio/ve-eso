/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import classnames from 'classnames';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { selectToast } from 'store/toaster/toaster.slice';
import CustomToast from '../CustomToast/CustomToast';

import styles from './ContainerToast.module.scss';

interface CustomContainerProps {
  className?: string;
}

const ContainerToast: React.FC<CustomContainerProps> = (Containerprops) => {
  const toastArray = useAppSelector(selectToast);
  const { className } = Containerprops;
  return (
    <div
      data-testid="ContainerToast"
      className={classnames(
        styles.CustomContainer,
        className,
        'toast-container position-fixed top-0 right-0 p-3 '
      )}
    >
      {toastArray.map(
        ({ color, title, description, timeout, toastId }): any => {
          return (
            <CustomToast
              color={color}
              isOpen
              title={title}
              toastId={toastId}
              key={toastId}
              timeout={timeout}
            >
              {description}
            </CustomToast>
          );
        }
      )}
    </div>
  );
};

export default React.memo(ContainerToast);
