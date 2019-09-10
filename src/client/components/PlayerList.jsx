import React from 'react';
import PropTypes from 'prop-types';

import { playerType } from '../../common/enums';
import * as lobbyActions from '../actions/lobby';


const PlayerList = ({
  currentPlayerType,
  isInRoom,
  leaveRoom,
  ownerIsReady,
  playerList,
}) => (
  <div className="player-list-container">
    <div className="player-list-title">Player List</div>
    <div className="player-list">
      {playerList.length > 0
      && (
        playerList.map((element, index) => (
          <div
            key={`player-item-${index.toString()}`}
            className="player-item"
          >
            {element.name}
          </div>
        ))
      )}
    </div>
    <div className="room-action-buttons-container">
      {isInRoom
      && (
        <button
          type="button"
          className="generic-button"
          onClick={leaveRoom}
        >
          Leave
        </button>
      )}
      {currentPlayerType === playerType.MASTER
      && (
        <button
          type="button"
          className="generic-button"
          onClick={ownerIsReady}
        >
          Start
        </button>
      )}
    </div>
  </div>
);

export const propTypes = {
  currentPlayerType: PropTypes.string,
  isInRoom: PropTypes.bool,
  leaveRoom: PropTypes.func,
  ownerIsReady: PropTypes.func,
  playerList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  })),
};
PlayerList.propTypes = propTypes;

export const defaultProps = {
  currentPlayerType: playerType.NONE,
  isInRoom: false,
  leaveRoom: lobbyActions.leaveRoom,
  ownerIsReady: lobbyActions.ownerIsReady,
  playerList: [],
};
PlayerList.defaultProps = defaultProps;

export default PlayerList;
