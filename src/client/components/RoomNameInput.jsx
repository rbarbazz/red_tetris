import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';


const RoomNameInput = ({
  currentRoomList,
  handleRoomSelection,
  roomName,
  submitRoom,
}) => (
  <div key="room-selection-container" className="room-selection-container">
    <div className="input-label">
      <div className="three-dots-container">
        <div />
        <div />
        <div />
      </div>
      Provide a room name
    </div>
    <div className="input-submit-container">
      {currentRoomList.length > 0
        && (
          <div className="room-list-container">
            <div className="room-list-title">Existing rooms</div>
            <div className="room-list-items-container">
              {currentRoomList.map((roomItem, index) => (
                <button
                  type="button"
                  value={roomItem}
                  className="room-item"
                  key={`room-item-${index.toString()}`}
                  onClick={event => handleRoomSelection(event.target.textContent)}
                >
                  {roomItem}
                </button>
              ))}
            </div>
          </div>
        )}
      <input
        type="text"
        onChange={event => handleRoomSelection(event.target.value)}
        value={roomName}
      />
      <button
        type="submit"
        onClick={() => submitRoom(roomName)}
        disabled={roomName === ''}
      >
        {currentRoomList.includes(roomName) ? 'Enter' : 'Create'}
      </button>
    </div>
  </div>
);

RoomNameInput.propTypes = {
  currentRoomList: PropTypes.arrayOf(PropTypes.string),
  handleRoomSelection: PropTypes.func,
  roomName: PropTypes.string,
  submitRoom: PropTypes.func,
};
RoomNameInput.defaultProps = {
  currentRoomList: [],
  handleRoomSelection: lobbyActions.handleRoomSelection,
  roomName: '',
  submitRoom: lobbyActions.submitRoom,
};

export default RoomNameInput;
