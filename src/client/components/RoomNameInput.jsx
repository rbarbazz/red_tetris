import React from 'react';
import PropTypes from 'prop-types';

import { playerType } from '../../common/enums';
import * as lobbyActions from '../actions/lobby';
import PlayerInfo from './PlayerInfo';
import
RoomList,
{ propTypes as RoomListPropTypes, defaultProps as RoomListDefaultProps }
  from './RoomList';

const testRoomList = [{
  name: 'short',
  players: ['raph', 'someoneelse', 'tall guy'],
  slots: [3, 8],
  state: 'FREE',
}, {
  name: 'wwwwwwwwwwwwwww',
  players: ['raph', 'someoneelse', 'tall guy'],
  slots: [6, 8],
  state: 'FREE',
}, {
  name: 'inbetween',
  players: ['raph', 'someoneelse', 'tall guy'],
  slots: [1, 8],
  state: 'BUSY',
}];

const RoomNameInput = ({
  currentPlayerType,
  currentRoomList,
  currentRoomPlayerList,
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
          currentRoomList={roomObject === undefined ? currentRoomList : [roomObject]}
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
        <div className="room-info-container">
          <div className="room-info-title">Player List</div>
          <div className="player-list">
            {currentRoomPlayerList.length > 0
            && (
              currentRoomPlayerList.map((element, index) => (
                <div
                  key={`player-item-${index.toString()}`}
                  className="player-item"
                >
                  {element.playerName}
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
      </div>
    </div>
  </div>
);

export const propTypes = {
  ...RoomListPropTypes,
  currentPlayerType: PropTypes.string,
  currentRoomPlayerList: PropTypes.arrayOf(PropTypes.exact({
    playerName: PropTypes.string,
    playerType: PropTypes.string,
  })),
  errorMessage: PropTypes.string,
  handleroomNameSelection: PropTypes.func,
  leaveRoom: PropTypes.func,
  ownerIsReady: PropTypes.func,
  playerName: PropTypes.string,
};
RoomNameInput.propTypes = propTypes;

export const defaultProps = {
  ...RoomListDefaultProps,
  currentPlayerType: playerType.NONE,
  currentRoomPlayerList: [],
  errorMessage: '',
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  leaveRoom: lobbyActions.leaveRoom,
  ownerIsReady: lobbyActions.ownerIsReady,
  playerName: '',
};
RoomNameInput.defaultProps = defaultProps;

export default RoomNameInput;
