import React from 'react';
import PropTypes from 'prop-types';
import * as tetrisActions from '../actions/tetris';
import { playerType } from '../../common/enums';

const BoardWaitingScreen = ({ currPlayerType, ownerIsReady }) => (
  <div className="board-waiting-screen">
    {currPlayerType === playerType.MASTER ? (
      <React.Fragment>
        <div className="board-waiting-message owner-message">Ready to start?</div>
        <button
          type="submit"
          onClick={ownerIsReady}
        >
          Start
        </button>
      </React.Fragment>
    ) : (
      <div className="board-waiting-message">Waiting for game to start...</div>
    )}
  </div>
);

BoardWaitingScreen.propTypes = {
  currPlayerType: PropTypes.string,
  ownerIsReady: PropTypes.func,
};
BoardWaitingScreen.defaultProps = {
  currPlayerType: playerType.NONE,
  ownerIsReady: tetrisActions.ownerIsReady,
};

export default BoardWaitingScreen;
