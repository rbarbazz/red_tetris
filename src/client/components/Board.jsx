import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const colors = {
  0: 'white',
  1: 'red',
};

export const Block = ({ color }) => (
  <div className={`block ${color}`} />
);

Block.propTypes = {
  color: PropTypes.string,
};
Block.defaultProps = {
  color: 'white',
};

const mapStateToProps = state => ({
  board: state.board,
  didGameStart: state.tetris.didGameStart,
});

export const Board = ({ board, didGameStart }) => (
  <React.Fragment>
    <div className="board-container">
      {didGameStart
        && (
          <div className="board-waiting-screen">
            <div className="board-waiting-message">Waiting for game to start...</div>
          </div>
        )
      }
      {
        board.map((num, index) => (
          <Block
            key={`game-block-${index.toString()}`}
            color={colors[num]}
          />
        ))
      }
    </div>
    <div className="window-size-error">Window too small, please resize to minimum 500x720</div>
  </React.Fragment>
);

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number),
  didGameStart: PropTypes.bool,
};
Board.defaultProps = {
  board: new Array(200).fill(0),
  didGameStart: false,
};

export default connect(mapStateToProps, null)(Board);
