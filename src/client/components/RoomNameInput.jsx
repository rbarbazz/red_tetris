import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';


const RoomNameInput = ({
  currentRoomList,
  handleroomNameSelection,
  roomName,
  submitRoomName,
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
                  onClick={event => handleroomNameSelection(event.target.textContent)}
                >
                  {roomItem}
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
        onClick={() => submitRoomName(roomName)}
        type="submit"
      >
        {currentRoomList.includes(roomName) ? 'Enter' : 'Create'}
      </button>
    </div>
  </div>
);

RoomNameInput.propTypes = {
  currentRoomList: PropTypes.arrayOf(PropTypes.string),
  handleroomNameSelection: PropTypes.func,
  roomName: PropTypes.string,
  submitRoomName: PropTypes.func,
};
RoomNameInput.defaultProps = {
  currentRoomList: [],
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  roomName: '',
  submitRoomName: lobbyActions.submitRoomName,
};

export default RoomNameInput;
