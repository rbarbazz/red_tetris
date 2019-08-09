import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const colors = {
  0: 'white',
  1: 'green',
  2: 'red',
  3: 'yellow',
  4: 'black',
  5: 'purple',
  6: 'orange',
  7: 'blue',
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

const mapStateToProps = state => ({ board: state.board });

export const Board = ({ board }) => (
  <div className="board-container">
    {
      board.map((num, index) => (
        <Block
          key={`block${index.toString()}`}
          color={colors[num]}
        />
      ))
    }
  </div>
);

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number),
};
Board.defaultProps = {
  board: new Array(200).fill(0),
};

export default connect(mapStateToProps, null)(Board);
