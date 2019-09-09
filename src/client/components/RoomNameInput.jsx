import React from 'react';
import PropTypes from 'prop-types';

import { playerType } from '../../common/enums';
import * as lobbyActions from '../actions/lobby';
import PlayerInfo from './PlayerInfo';
import
RoomList,
{ propTypes as RoomListPropTypes, defaultProps as RoomListDefaultProps }
  from './RoomList';


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
        <div className="room-info-container">
          <div className="room-info-title">Player List</div>
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
      </div>
    </div>
  </div>
);

export const propTypes = {
  ...RoomListPropTypes,
  currentPlayerType: PropTypes.string,
  playerList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
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
  playerList: [],
  errorMessage: '',
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  leaveRoom: lobbyActions.leaveRoom,
  ownerIsReady: lobbyActions.ownerIsReady,
  playerName: '',
};
RoomNameInput.defaultProps = defaultProps;

export default RoomNameInput;
