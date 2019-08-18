import React from 'react';
import PropTypes from 'prop-types';

import * as tetrisActions from '../actions/tetris';

const BoardWaitingScreen = ({ isRoomOwner, ownerIsReady }) => (
  <div className="board-waiting-screen">
    {isRoomOwner ? (
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
  isRoomOwner: PropTypes.bool,
  ownerIsReady: PropTypes.func,
};
BoardWaitingScreen.defaultProps = {
  isRoomOwner: false,
  ownerIsReady: tetrisActions.ownerIsReady,
};

export default BoardWaitingScreen;
