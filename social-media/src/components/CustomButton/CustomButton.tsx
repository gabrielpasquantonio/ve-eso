/* eslint-disable react/require-default-props */
import classnames from 'classnames';
import React from 'react';

import styles from './CustomButton.module.scss';

interface ButtonProps {
  text?: string;
  onClick?: any;
  className?: any;
  disabled?: boolean;
}

const defaultProps = { disabled: false };

const CustomButton: React.FC<ButtonProps> = (props) => {
  const { text, onClick, className, disabled, ...res } = props;
  return (
    <button
      className={classnames(styles.CustomButton, className)}
      data-testid="CustomButton"
      type="submit"
      onClick={onClick}
      {...res}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

CustomButton.defaultProps = defaultProps;

export default React.memo(CustomButton);
