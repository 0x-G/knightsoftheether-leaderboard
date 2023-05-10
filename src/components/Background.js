//Background.js
import React from 'react';
import styles from '../styles/Background.module.css';
import bgImage from '../assets/BG.png';

const Background = ({ children }) => {
  return (
    <div
      className={styles.backgroundContainer}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {children}
    </div>
  );
};

export default Background;

