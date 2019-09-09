import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';
import { roomState, playerType } from '../../common/enums';
import PlayerInfo from './PlayerInfo';

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
  currentRoomList,
  currentRoomPlayerList,
  isInRoom,
  errorMessage,
  handleroomNameSelection,
  leaveRoom,
  ownerIsReady,
  playerName,
  currPlayerType,
  roomName,
  submitRoomName,
}) => (
  <div className="room-selection-wrapper">
    <PlayerInfo
      playerName={playerName}
      roomName={isInRoom ? roomName : ''}
    />
    <div key="room-selection-container" className="room-selection-container">
      <div className="room-selection-left-side">
        <div className="room-list-container">
          <div className="room-list-title">Existing Rooms</div>
          <div className="room-list-items-container">
            {currentRoomList.length > 0
              && (
                currentRoomList.map((roomItem, index) => {
                  const busySlots = roomItem.slots[1] - roomItem.slots[0];
                  const roomStatus = roomItem.state === roomState.FREE ? 'In Lobby' : 'In Game ';
                  return (
                    <div
                      className="room-item"
                      key={`room-item-${index.toString()}`}
                      style={roomName === roomItem.name ? { borderColor: '#eb4d4b' } : {}}
                    >
                      <div className="room-item-info-container">
                        <div className="room-item-info" style={{ color: '#eb4d4b' }}>{roomItem.name}</div>
                        <div className="room-item-info">{roomStatus}</div>
                        <div className="room-item-info">{`Slots ${busySlots}/${roomItem.slots[1]}`}</div>
                      </div>
                      {!isInRoom && roomItem.slots[0] > 0
                      && (
                      <button
                        type="submit"
                        className="generic-button"
                        onClick={() => submitRoomName(roomItem.name)}
                      >
                        Join
                      </button>
                      )}
                    </div>
                  );
                })
              )}
            {currentRoomList.length === 0
              && (
                <div className="room-item">
                  <div className="room-item-info-container">
                    <div className="room-item-info">No Room available</div>
                  </div>
                </div>
              )}
          </div>
        </div>
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
            {isInRoom && currentRoomPlayerList.length > 0 ? (
              currentRoomPlayerList.map((element, index) => (
                <div
                  key={`player-item-${index.toString()}`}
                  className="player-item"
                >
                  {element}
                </div>
              ))
            ) : (
              <div className="player-item">You are not in a room</div>
            )}
          </div>
          <React.Fragment>
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
            {currPlayerType === playerType.MASTER
              && (
              <button
                type="button"
                className="generic-button"
                onClick={ownerIsReady}
              >
                Start
              </button>
              )}
          </React.Fragment>
        </div>
      </div>
    </div>
  </div>
);

RoomNameInput.propTypes = {
  currentRoomList: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.string),
    slots: PropTypes.arrayOf(PropTypes.number),
    state: PropTypes.string,
  })),
  currentRoomPlayerList: PropTypes.arrayOf(PropTypes.string),
  errorMessage: PropTypes.string,
  handleroomNameSelection: PropTypes.func,
  isInRoom: PropTypes.bool,
  leaveRoom: PropTypes.func,
  roomName: PropTypes.string,
  playerName: PropTypes.string,
  submitRoomName: PropTypes.func,
};
RoomNameInput.defaultProps = {
  currentRoomList: [],
  currentRoomPlayerList: [],
  errorMessage: '',
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  isInRoom: false,
  leaveRoom: lobbyActions.leaveRoom,
  roomName: '',
  playerName: '',
  submitRoomName: lobbyActions.submitRoomName,
};

export default RoomNameInput;
