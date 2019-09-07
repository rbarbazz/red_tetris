import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';

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
  state: 'FREE',
}];

const RoomNameInput = ({
  currentRoomList,
  errorMessage,
  handleroomNameSelection,
  roomName,
  submitRoomName,
}) => (
  <div key="room-selection-container" className="room-selection-container">
    <div className="input-submit-container">
      {currentRoomList.length > 0
        && (
          <div className="room-list-container">
            <div className="room-list-title">Existing rooms</div>
            <div className="room-list-items-container">
              {currentRoomList.map((roomItem, index) => (
                <button
                  type="button"
                  value={roomItem.name}
                  className="room-item"
                  key={`room-item-${index.toString()}`}
                  onClick={(event) => {
                    handleroomNameSelection(event.target.textContent);
                  }}
                >
                  {roomItem.name}
                </button>
              ))}
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
        onClick={() => submitRoomName(roomName)}
      >
        Create
      </button>
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
