import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Board.module.css';
import NavigationButton from './NavigationButton';
import search from '../assets/search.png'; 
import LeaderboardRow from './LeaderboardRow';

const fillerData = [
  { rank: 1, name: 'Maurice', score: 57740 },
  { rank: 2, name: 'Dear Sweet Comrade', score: 51765 },
  { rank: 3, name: 'This is Fine', score: 51435 },
  { rank: 4, name: 'Will', score: 51325 },
  { rank: 5, name: 'Khaim', score: 51225 },
  { rank: 6, name: 'Oklem', score: 51130 },
  { rank: 7, name: 'user05643687', score: 51050 },
  { rank: 8, name: 'chengtian', score: 50970 },
  { rank: 9, name: 'Azydlion', score: 50805 },
  { rank: 10, name: 'Thor97', score: 50795 },
  { rank: 11, name: 'Brianna', score: 50790 },
  { rank: 12, name: 'Zara', score: 50780 },
  { rank: 13, name: 'Kian', score: 50770 },
  { rank: 14, name: 'Emmeline', score: 50760 },
  { rank: 15, name: 'Nikolai', score: 50750 },
  { rank: 16, name: 'Anika', score: 50740 },
  { rank: 17, name: 'Ezio', score: 50730 },
  { rank: 18, name: 'Nova', score: 50720 },
  { rank: 19, name: 'Vesper', score: 50710 },
  { rank: 20, name: 'Orion', score: 50700 },
  { rank: 21, name: 'Zane', score: 50690 },
  { rank: 22, name: 'Livia', score: 50680 },
  { rank: 23, name: 'Atlas', score: 50670 },
  { rank: 24, name: 'Kaida', score: 50660 },
  { rank: 25, name: 'Kian', score: 50650 },
  { rank: 26, name: 'Cassius', score: 50640 },
  { rank: 27, name: 'Aria', score: 50630 },
  { rank: 28, name: 'Soren', score: 50620 },
  { rank: 29, name: 'Nova', score: 50610 },
  { rank: 30, name: 'Athena', score: 50600 },
  { rank: 31, name: 'Zora', score: 50590 },
  { rank: 32, name: 'Lachlan', score: 50580 },
  { rank: 33, name: 'Nikolai', score: 50570 },
  { rank: 34, name: 'Evangeline', score: 50560 },
  { rank: 35, name: 'Ezra', score: 50550 },
  { rank: 36, name: 'Elodie', score: 50540 },
  { rank: 37, name: 'Ansel', score: 50530 },
  { rank: 38, name: 'Peter', score: 50520 },
  { rank: 39, name: 'Gemma', score: 50520 },
{ rank: 40, name: 'Jaxon', score: 50510 },
{ rank: 41, name: 'Zuri', score: 50500 },
{ rank: 42, name: 'Oscar', score: 50490 },
{ rank: 43, name: 'Althea', score: 50480 },
{ rank: 44, name: 'Zane', score: 50470 },
{ rank: 45, name: 'Elio', score: 50460 },
{ rank: 46, name: 'Sarai', score: 50450 },
{ rank: 47, name: 'Joaquin', score: 50440 },
{ rank: 48, name: 'Cosima', score: 50430 },
{ rank: 49, name: 'Eamon', score: 50420 },
{ rank: 50, name: 'Ariadne', score: 50410 },
{ rank: 51, name: 'Zayn', score: 50400 },
{ rank: 52, name: 'Livia', score: 50390 },
{ rank: 53, name: 'Ginevra', score: 50380 },
{ rank: 54, name: 'Salem', score: 50370 },
{ rank: 55, name: 'Axl', score: 50360 },
{ rank: 56, name: 'Elara', score: 50350 },
{ rank: 57, name: 'Kaiden', score: 50340 },
{ rank: 58, name: 'Adira', score: 50330 },
{ rank: 59, name: 'Orlando', score: 50320 },
{ rank: 60, name: 'Ayaan', score: 50310 },
{ rank: 61, name: 'Bryony', score: 50300 },
{ rank: 62, name: 'Ilya', score: 50290 },
{ rank: 63, name: 'Kaia', score: 50280 },
{ rank: 64, name: 'Thalia', score: 50270 },
{ rank: 65, name: 'Niko', score: 50260 },
{ rank: 66, name: 'Bodhi', score: 50250 },
{ rank: 67, name: 'Lysandra', score: 50240 },
{ rank: 68, name: 'Avery', score: 50230 },
{ rank: 69, name: 'Nash', score: 50220 },
{ rank: 70, name: 'Lydia', score: 50210 },
{ rank: 71, name: 'Emrys', score: 50200 },
{ rank: 72, name: 'Zephyr', score: 50190 },
{ rank: 73, name: 'Felicity', score: 50180 },
{ rank: 74, name: 'Jaxton', score: 50170 },
{ rank: 75, name: 'Arabella', score: 50160 },
{ rank: 76, name: 'Clio', score: 50150 },
{ rank: 77, name: 'Luca', score: 50140 },
{ rank: 78, name: 'Delaney', score: 50130 },
{ rank: 79, name: 'Elio', score: 50120 },
{ rank: 80, name: 'Zora', score: 50110 },
];

const Board = ({
  boardImage,
  leftNext2,
  leftNext1,
  rightNext2,
  rightNext1,
}) => {
  const calculateScale = () => {
    const widthScale = window.innerWidth / 1280;
    const heightScale = window.innerHeight / 1024;
    return Math.min(widthScale, heightScale);
  };

  const [searchVisible, setSearchVisible] = useState(false);
  const [scaleValue, setScaleValue] = useState(calculateScale());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);  

  const filteredData = searchQuery
  ? fillerData.filter((entry) => entry.name.toLowerCase().includes(searchQuery.toLowerCase()))
  : fillerData;


  const toggleSearchVisibility = () => {
    if (!searchVisible) {
      setSearchQuery('');
      setCurrentPage(0);
    }
    setSearchVisible(!searchVisible);
  };

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      if (searchVisible && searchQuery) {
        setSearchVisible(false);
      } else {
        toggleSearchVisibility();
      }
    }
  }, [searchVisible, searchQuery]);

  useEffect(() => {
    const handleResize = () => {
      setScaleValue(calculateScale());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyPress); 

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyPress); 
    };
  }, [handleKeyPress]);

  const [currentPage, setCurrentPage] = useState(0);

  const entriesPerPage = 10;

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

    const startIndex = currentPage * entriesPerPage;
    const currentPageData = filteredData.slice(startIndex, startIndex + entriesPerPage);

    const handleFirstPage = () => {
        setCurrentPage(0);
    };
      
    const handleLastPage = () => {
        const totalPages = Math.ceil(filteredData.length / entriesPerPage);
        setCurrentPage(totalPages - 1);
    };

  return (
    <div className={styles.boardWrapper}>
      <div
        className={styles.boardContainer}
        style={{
          backgroundImage: `url(${boardImage})`,
          transform: `scale(${scaleValue})`,
        }}
      >
        <div className={styles.leaderboardTitle} style={{ top: '66px' }}>
          LEADERBOARD
        </div>

        <div className={styles.columnTitle} style={{ top: '205px', left: '50px' }}>
          Rank
        </div>
        <div className={styles.columnTitle} style={{ top: '205px', left: '350px' }}>
          Name
        </div>
        <div className={styles.columnTitle} style={{ top: '205px', left: '727px' }}>
          Score
          <img
            src={search}
            alt="search"
            style={{ position: 'absolute', left: '100px', height: '40px' }}
            onClick={toggleSearchVisibility}
            />

        </div>

        {currentPageData.map((row, index) => (
        <LeaderboardRow
          key={index}
          index={index}
          rank={row.rank}
          name={row.name}
          score={row.score}
        />
      ))}


        {searchVisible && (
                <div
                style={{
                    position: 'absolute',
                    left: '727px',
                    top: '150px',
                    padding: '5px',
                    borderRadius: '5px',
                }}
                >

                <input
                  type="text"
                  placeholder="Search"
                  autoFocus
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(0);
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    handleKeyPress(e);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      if (searchQuery) {
                        setSearchSubmitted(true);
                      }
                      setSearchVisible(false);
                    }, 200);
                  }}
                />
                </div>
            )}

      <div className={styles.buttonsWrapper}>
    <NavigationButton
      buttonImage={leftNext2}
      className={styles.buttonContainer}
      style={{ left: '124px' }}
      onClick={handleFirstPage}
    />
    <NavigationButton
      buttonImage={leftNext1}
      className={styles.buttonContainer}
      style={{ left: '318px' }}
      onClick={handlePreviousPage}
    />
    <NavigationButton
      buttonImage={rightNext1}
      className={styles.buttonContainer}
      style={{ left: '526px' }}
      onClick={handleNextPage}
    />
    <NavigationButton
      buttonImage={rightNext2}
      className={styles.buttonContainer}
      style={{ left: '720px' }}
      onClick={handleLastPage}
    />
  </div>
      </div>
    </div>
  );
};

export default Board;