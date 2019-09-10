import React from 'react';
import PropTypes from 'prop-types';

import { playerType } from '../../common/enums';
import * as lobbyActions from '../actions/lobby';
import
GenericButton,
{ propTypes as GenericButtonPropTypes, defaultProps as GenericButtonDefaultProps }
  from './GenericButton';

const PlayerList = ({
  currentPlayerType,
  isInRoom,
  isLoading,
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
        <GenericButton
          action={leaveRoom}
          isLoading={isLoading}
          contentText="Leave"
        />
      )}
      {currentPlayerType === playerType.MASTER && !isLoading
      && (
        <GenericButton
          action={ownerIsReady}
          isLoading={isLoading}
          contentText="Start"
        />
      )}
    </div>
  </div>
);

export const propTypes = {
  ...GenericButtonPropTypes,
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
  ...GenericButtonDefaultProps,
  currentPlayerType: playerType.NONE,
  isInRoom: false,
  leaveRoom: lobbyActions.leaveRoom,
  ownerIsReady: lobbyActions.ownerIsReady,
  playerList: [],
};
PlayerList.defaultProps = defaultProps;

export default PlayerList;
