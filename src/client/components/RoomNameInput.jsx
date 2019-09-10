import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';
import PlayerInfo from './PlayerInfo';
import
RoomList,
{ propTypes as RoomListPropTypes, defaultProps as RoomListDefaultProps }
  from './RoomList';
import
PlayerList,
{ propTypes as PlayerListPropTypes, defaultProps as PlayerListDefaultProps }
  from './PlayerList';


const RoomNameInput = ({
  currentPlayerType,
  roomList,
  playerList,
  isInRoom,
  errorMessage,
  handleroomNameSelection,
  leaveRoom,
  ownerIsReady,
  playerName,
  roomName,
  roomObject,
  submitRoomName,
}) => (
  <div className="room-selection-wrapper">
    <PlayerInfo
      playerName={playerName}
      roomName={isInRoom ? roomName : ''}
    />
    <div key="room-selection-container" className="room-selection-container">
      <div className="room-selection-left-side">
        <RoomList
          roomList={roomObject === undefined ? roomList : [roomObject]}
          isInRoom={isInRoom}
          roomName={roomName}
          submitRoomName={submitRoomName}
        />
        {!isInRoom
        && (
          <div className="room-creation-container">
            <div className="room-creation-title">Create New Room</div>
            <div className="room-creation-input-container">
              <input
                type="text"
                className="room-creation-text-input"
                onChange={event => handleroomNameSelection(event.target.value)}
                value={roomName}
                placeholder="Room Name"
                style={roomName === '' ? {} : { border: 'solid 3px #eb4d4b' }}
              />
              <button
                disabled={roomName === ''}
                type="submit"
                className="generic-button"
                onClick={() => submitRoomName(roomName)}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="room-selection-right-side">
        <PlayerList
          currentPlayerType={currentPlayerType}
          isInRoom={isInRoom}
          leaveRoom={leaveRoom}
          ownerIsReady={ownerIsReady}
          playerList={playerList}
        />
      </div>
    </div>
  </div>
);

export const propTypes = {
  ...PlayerListPropTypes,
  ...RoomListPropTypes,
  errorMessage: PropTypes.string,
  handleroomNameSelection: PropTypes.func,
  playerName: PropTypes.string,
};
RoomNameInput.propTypes = propTypes;

export const defaultProps = {
  ...PlayerListDefaultProps,
  ...RoomListDefaultProps,
  errorMessage: '',
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  playerName: '',
};
RoomNameInput.defaultProps = defaultProps;

export default RoomNameInput;
