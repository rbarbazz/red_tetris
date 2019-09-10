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
  handleroomNameSelection,
  isInRoom,
  isLoading,
  leaveRoom,
  message,
  ownerIsReady,
  playerList,
  playerName,
  roomList,
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
          isInRoom={isInRoom}
          isLoading={isLoading}
          roomList={roomObject === undefined ? roomList : [roomObject]}
          roomName={roomName}
          submitRoomName={submitRoomName}
        />
        {!isInRoom
        && (
          <div className="room-creation-container">
            <div className="room-creation-title">Create New Room</div>
            <div className="room-creation-input-container">
              <input
                className="room-creation-text-input"
                onChange={event => handleroomNameSelection(event.target.value)}
                placeholder="Room Name"
                style={roomName === '' ? {} : { border: 'solid 3px #eb4d4b' }}
                type="text"
                value={roomName}
              />
              <button
                className="generic-button"
                disabled={roomName === ''}
                onClick={() => submitRoomName(roomName)}
                type="submit"
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
    <div className="message-bar">{message}</div>
  </div>
);

export const propTypes = {
  ...PlayerListPropTypes,
  ...RoomListPropTypes,
  handleroomNameSelection: PropTypes.func,
  message: PropTypes.string,
  playerName: PropTypes.string,
};
RoomNameInput.propTypes = propTypes;

export const defaultProps = {
  ...PlayerListDefaultProps,
  ...RoomListDefaultProps,
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  message: '',
  playerName: '',
};
RoomNameInput.defaultProps = defaultProps;

export default RoomNameInput;
