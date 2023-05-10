import React from 'react';
import styles from '../styles/StarButton.module.css';
import starImage from '../assets/star.png';

const StarButton = () => {
  return (
    <button
      className={styles.starButtonContainer}
      style={{ backgroundImage: `url(${starImage})` }}
    />
  );
};

export default StarButton;
