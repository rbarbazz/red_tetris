import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tetrisActions from '../actions/tetris';
import Block from '../components/Block';
import BoardWaitingScreen from '../components/BoardWaitingScreen';
import { playerType } from '../../common/enums';


const colors = {
  0: 'white',
  1: 'red',
};

const mapStateToProps = state => ({
  board: state.board,
  didGameStart: state.tetris.didGameStart,
  currPlayerType: state.tetris.playerType,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...tetrisActions,
}, dispatch));

export const Board = ({
  board,
  didGameStart,
  currPlayerType,
  ownerIsReady,
}) => (
  <React.Fragment>
    <div className="board-container">
      {!didGameStart ? (
        <BoardWaitingScreen
          currPlayerType={currPlayerType}
          ownerIsReady={ownerIsReady}
        />
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
  didGameStart: PropTypes.bool,
  currPlayerType: PropTypes.string,
  ownerIsReady: PropTypes.func,
};
Board.defaultProps = {
  board: Array(200).fill(0),
  didGameStart: false,
  currPlayerType: playerType.NONE,
  ownerIsReady: tetrisActions.ownerIsReady,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
