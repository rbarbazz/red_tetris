import React from 'react';
import PropTypes from 'prop-types';
import Block from './Block';


const colors = {
  0: 'white',
  1: 'red',
};

const Board = ({
  board,
  currentStep,
}) => (
  <div className="board-container">
    {currentStep === 'endGame' ? (
      <div className="game-end-screen">
        <h2 className="game-end-title">Game Over</h2>
        <p className="game-end-message">Please wait for all players to finish</p>
      </div>
    ) : (
      board.map((num, index) => (
        <Block
          key={`game-block-${index.toString()}`}
          color={colors[num]}
        />
      ))
    )}
  </div>
);

export const propTypes = {
  board: PropTypes.arrayOf(PropTypes.number),
  currentStep: PropTypes.string,
};
Board.propTypes = propTypes;

export const defaultProps = {
  board: Array(200).fill(0),
  currentStep: 'game',
};
Board.defaultProps = defaultProps;

export default Board;
