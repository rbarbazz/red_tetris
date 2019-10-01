import React from 'react';
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
};

const Board = ({
  board,
  currentStep,
}) => (
  <div className="board-container">
    {currentStep === 'endGame' && (
      <div className="game-end-screen">
        <h2 className="game-end-title">Game Over</h2>
        <p className="game-end-message">Please wait for all players to finish</p>
      </div>
    )}
    {board.map((line, indexLine) => (
      line.map((num, indexBlock) => (
        <Block
          key={`game-block-${indexLine.toString()}${indexBlock.toString()}`}
          color={colors[num] || colors[num - 10]}
          shadowPiece={num > 10}
        />
      ))
    ))
    }
  </div>
);

export const propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  currentStep: PropTypes.string,
};
Board.propTypes = propTypes;

export const defaultProps = {
  board: Array(20).fill(Array(10).fill(0)),
  currentStep: 'game',
};
Board.defaultProps = defaultProps;

export default Board;
