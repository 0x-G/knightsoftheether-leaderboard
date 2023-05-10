// NavigationButton.js
import React from 'react';
import styles from '../styles/NavigationButton.module.css';

const NavigationButton = ({ buttonImage, className, style, onClick }) => {
  return (
    <button
      className={`${styles.buttonContainer} ${className}`}
      style={{
        backgroundImage: `url(${buttonImage})`,
        ...style,
      }}
      onClick={onClick}
    />
  );
};

export default NavigationButton;
