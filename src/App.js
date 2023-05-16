import React from 'react';
import Background from './components/Background';
import Board from './components/Board';

// Import your images here
import bgImage from './assets/BG.png';
import boardImage from './assets/board.png';
import leftNext2Image from './assets/leftnext2.png';
import leftNext1Image from './assets/leftnext1.png';
import rightNext2Image from './assets/rightnext2.png';
import rightNext1Image from './assets/rightnext1.png';
import starImage from './assets/star.png';
import homeIcon from './assets/home.png';
import styles from './App.module.css';

function App() {
  return (
    <div style={{ position: 'relative' }}>
      <Background bgImage={bgImage}>
        <a href="https://knightsoftheether.com/">
          <img
            src={homeIcon}
            alt="Home"
            className={styles.homeIcon}          />
        </a>
        <Board
          boardImage={boardImage}
          leftNext2={leftNext2Image}
          leftNext1={leftNext1Image}
          rightNext2={rightNext2Image}
          rightNext1={rightNext1Image}
          star={starImage}
        />
      </Background>
    </div>
  );
}

export default App;
