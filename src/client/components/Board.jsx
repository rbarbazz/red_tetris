import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Block from './Block';


const colors = {
  0: 'white',
  1: 'cyan',
  2: 'yellow',
  3: 'purple',
  4: 'green',
  5: 'red',
  6: 'blue',
  7: 'orange',
  10: 'black',
};

const Board = ({
  board,
  currentStep,
  startTimer,
}) => {
  const [timeLeft, setTimeLeft] = useState(startTimer / 1000);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div className="board-container">
      {currentStep === 'endGame' && (
        <div className="game-end-screen">
          <h2 className="game-end-title">Game Over</h2>
          <p className="game-end-message">Please wait for all players to finish</p>
        </div>
      )}
      {currentStep === 'game' && timeLeft > 0 && (
        <div className="game-end-screen">
          <h2 className="game-end-title">{timeLeft}</h2>
        </div>
      )}
      {board.map((line, indexLine) => (
        line.map((num, indexBlock) => (
          <Block
            color={colors[num] || colors[num - 10]}
            isOnLeftSide={indexBlock === 0}
            isOnRightSide={indexBlock === 9}
            key={`game-block-${indexLine.toString()}${indexBlock.toString()}`}
            shadowPiece={num > 10}
          />
        ))
      ))
      }
    </div>
  );
};

export const propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  currentStep: PropTypes.string,
  startTimer: PropTypes.number,
};
Board.propTypes = propTypes;

export const defaultProps = {
  board: Array(20).fill(Array(10).fill(0)),
  currentStep: 'game',
  startTimer: 3000,
};
Board.defaultProps = defaultProps;

export default Board;
