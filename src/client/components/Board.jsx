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

const mapStateToProps = state => ({ board: state.board });

const Board = (props) => {
  const { board } = props;

  return (
    <div className="board-container">
      {
        board.map((num, index) => (
          <Block
            key={`block${index.toString()}`}
            num={num}
          />
        ))
      }
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps, null)(Board);

const Block = (props) => {
  const { num } = props;
  const color = colors[num];

  return (
    <div className={`block ${color}`} />
  );
};

Block.propTypes = {
  num: PropTypes.number.isRequired,
};

export { Block };
