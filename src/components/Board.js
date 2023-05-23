import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Board.module.css';
import NavigationButton from './NavigationButton';
import search from '../assets/search.png'; 
import LeaderboardRow from './LeaderboardRow';

  const Board = ({
    boardImage,
    leftNext2,
    leftNext1,
    rightNext2,
    rightNext1,
  }) => {
    // Add a new state variable to store the leaderboard data
    const [leaderboardData, setLeaderboardData] = useState([]);
  
    // Fetch data from the API when the component mounts
    useEffect(() => {
      fetch('https://leaderboard-api.knightsoftheether.com/leaderboard')
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((entry, index) => ({
            rank: index + 1,
            name: entry[0],
            score: entry[1],
          }));
          setLeaderboardData(formattedData);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
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
    ? leaderboardData.filter((entry) => entry.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : leaderboardData;

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
        <div className={styles.columnTitle} style={{ top: '205px', left: '370px' }}>
          Name
          <img
            src={search}
            alt="search"
            style={{ marginLeft: '30px', height: '35px', top: '0px' }}
            onClick={toggleSearchVisibility}
        />

        </div>
        <div className={styles.columnTitle} style={{ top: '205px', left: '727px' }}>
          Score
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
                    left: '320px',
                    top: '140px',
                    padding: '10px',
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