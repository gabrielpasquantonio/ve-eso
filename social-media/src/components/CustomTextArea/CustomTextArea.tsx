import React from 'react';
import styles from './CustomTextArea.module.scss';

interface TextAreaProps {
  value: any;
  onChange: any;
}
const CustomTextArea: React.FC<TextAreaProps> = (props) => {
  const { value, onChange } = props;

  return (
    <div className={styles.CustomTextArea} data-testid="CustomTextArea">
      <textarea maxLength={777} onChange={onChange} value={value} />
      <p>{value.length}/777</p>
    </div>
  );
};

export default React.memo(CustomTextArea);
