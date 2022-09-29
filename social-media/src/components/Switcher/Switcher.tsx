import React, { ChangeEvent, Fragment } from 'react';
import styles from './Switcher.module.scss';

export interface SwitcherProps {
  options: any;
  optionChecked: any;
  onChange: any;
}
const Switcher: React.FC<SwitcherProps> = (props) => {
  const { options, optionChecked, onChange } = props;
  const handleOnChangeFilter = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };
  return (
    <div className={styles.Switcher} data-testid="Switcher">
      {options.map((currentOption: any, index: any) => {
        return (
          <Fragment key={index}>
            <input
              type="radio"
              id={currentOption.value}
              value={currentOption.value}
              onChange={handleOnChangeFilter}
              checked={optionChecked === index}
            />
            <label htmlFor={currentOption.value}>{currentOption.label}</label>
          </Fragment>
        );
      })}
    </div>
  );
};

export default React.memo(Switcher);
