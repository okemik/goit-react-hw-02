import React from 'react';
import styles from './options.module.css';

const Options = ({ options, onLeaveFeedback, onReset, showReset }) => {
  return (
    <div className={styles.container}>
      {options.map((option) => (
        <button
          key={option}
          className={styles.button}
          onClick={() => onLeaveFeedback(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}

      {showReset && (
        <button className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Options;
