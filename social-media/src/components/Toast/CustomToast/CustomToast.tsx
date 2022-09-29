/* eslint-disable react/require-default-props */
import classnames from 'classnames';
import React, { useCallback, useEffect } from 'react';
import { Toast, ToastBody, ToastHeader, ToastProps } from 'reactstrap';
import { useAppDispatch } from 'store/hooks';
import { closeToast } from 'store/toaster/toaster.slice';
import styles from './CustomToast.module.scss';

export interface CustomToastProps extends ToastProps {
  timeout?: number;
  toastId?: number;
}

const CustomToast: React.FC<CustomToastProps> = (toastProps) => {
  const dispatch = useAppDispatch();

  const {
    children,
    title,
    toastId,
    className,
    timeout = 5000,
    ...res
  } = toastProps;

  const onDismiss = useCallback(
    (i: number | undefined): void => {
      dispatch(closeToast(i));
    },
    [dispatch]
  );

  useEffect(() => {
    if (res.isOpen && timeout) {
      const timeId = setTimeout(() => {
        onDismiss(toastId);
      }, timeout);

      return () => {
        clearTimeout(timeId);
      };
    }
    return undefined;
  }, [res.isOpen, timeout, onDismiss, toastId]);

  return (
    <Toast
      data-testid="CustomToast"
      className={classnames(styles.CustomToast, className)}
      {...res}
    >
      <ToastHeader toggle={() => onDismiss(toastId)}>{title}</ToastHeader>
      <ToastBody>{children}</ToastBody>
    </Toast>
  );
};

export default React.memo(CustomToast);
