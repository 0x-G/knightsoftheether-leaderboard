import React from 'react';
import styles from '../styles/LeaderboardRow.module.css';
import trophy from '../assets/trophy.png'; 

const formatRank = (rank) => {
  return rank.toString().padStart(2, '0');
};

const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const LeaderboardRow = ({ index, rank, name, score }) => {
  const formattedScore = formatNumberWithCommas(score);
  return (
    <div
      className={`${styles.leaderboardRow} ${index % 2 === 0 ? styles.rowEven : styles.rowOdd}`}
      style={{
        top: 252.1 + index * 50.3,
        zIndex: index + 1,
      }}
    >
      <span className={styles.rank}>{formatRank(rank)}</span>
      <span className={styles.name}>{name}</span>
      <div className={styles.score}>{formattedScore}</div>
      {rank <= 10 && <img src={trophy} alt="trophy" className={styles.trophyIcon} />}
    </div>
  );
};

export default LeaderboardRow;
