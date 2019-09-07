import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';
import { roomState } from '../../common/enums';

const testRoomList = [{
  name: 'room1',
  players: ['raph', 'someoneelse', 'tall guy'],
  slots: [5, 8],
  state: 'FREE',
}, {
  name: 'room2',
  players: ['raph', 'someoneelse', 'tall guy'],
  slots: [5, 8],
  state: 'FREE',
}, {
  name: 'room3',
  players: ['raph', 'someoneelse', 'tall guy'],
  slots: [5, 8],
  state: 'FREE',
}, {
  name: 'room4',
  players: ['raph', 'someoneelse', 'tall guy'],
  slots: [5, 8],
  state: 'BUSY',
}];

const RoomNameInput = ({
  currentRoomList,
  errorMessage,
  handleroomNameSelection,
  roomName,
  submitRoomName,
}) => (
  <div key="room-selection-container" className="room-selection-container">
    <div className="room-selection-left-side">
      {currentRoomList.length > 0
        && (
          <div className="room-list-container">
            <div className="room-list-title">Existing Rooms</div>
            <div className="room-list-items-container">
              {currentRoomList.map((roomItem, index) => {
                const busySlots = roomItem.slots[1] - roomItem.slots[0];

                return (
                  <div
                    value={roomItem.name}
                    className="room-item"
                    key={`room-item-${index.toString()}`}
                    onClick={() => handleroomNameSelection(roomItem.name)}
                    style={roomName === roomItem.name ? { borderColor: '#eb4d4b' } : {}}
                  >
                    <div className="room-item-info-container">
                      <div className="room-item-info">{roomItem.name}</div>
                      <div className="room-item-separator" />
                      <div className="room-item-info">{roomItem.state === roomState.FREE ? 'In Lobby' : 'In Game'}</div>
                      <div className="room-item-separator" />
                      <div className="room-item-info">{`Slots ${busySlots}/${roomItem.slots[1]}`}</div>
                    </div>
                    <button
                      type="submit"
                      className="generic-button"
                      onClick={() => submitRoomName(roomItem.name)}
                    >
                      Join
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      <input
        type="text"
        onChange={event => handleroomNameSelection(event.target.value)}
        value={roomName}
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
    <div className="room-selection-right-side">
    </div>
  </div>
);

RoomNameInput.propTypes = {
  currentRoomList: PropTypes.arrayOf(PropTypes.string),
  errorMessage: PropTypes.string,
  handleroomNameSelection: PropTypes.func,
  roomName: PropTypes.string,
  submitRoomName: PropTypes.func,
};
RoomNameInput.defaultProps = {
  currentRoomList: [],
  errorMessage: '',
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  roomName: '',
  submitRoomName: lobbyActions.submitRoomName,
};

export default RoomNameInput;
