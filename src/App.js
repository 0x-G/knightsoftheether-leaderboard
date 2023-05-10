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

function App() {
  return (
    <Background bgImage={bgImage}>
      <Board
        boardImage={boardImage}
        leftNext2={leftNext2Image}
        leftNext1={leftNext1Image}
        rightNext2={rightNext2Image}
        rightNext1={rightNext1Image}
        star={starImage}
      />
    </Background>
  );
}

export default App;
