import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tetrisActions from '../actions/tetris';
import Block from '../components/Block';


const colors = {
  0: 'white',
  1: 'red',
};

const mapStateToProps = state => ({
  board: state.board,
  currentStep: state.tetris.currentStep,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...tetrisActions,
}, dispatch));

export const Board = ({
  board,
  currentStep,
}) => (
  <React.Fragment>
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
    <div className="window-size-error">Window too small, please resize to minimum 400x740</div>
  </React.Fragment>
);

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number),
  currentStep: PropTypes.string,
};
Board.defaultProps = {
  board: Array(200).fill(0),
  currentStep: 'game',
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
