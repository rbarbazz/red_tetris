import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';


const RoomNameInput = ({
  currentRoomList,
  errorMessage,
  handleroomNameSelection,
  joinRoom,
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
    <div className="input-error-message">{errorMessage}</div>
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
                  onClick={(event) => {
                    handleroomNameSelection(event.target.textContent);
                    joinRoom(event.target.textContent);
                  }}
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
  joinRoom: PropTypes.func,
  roomName: PropTypes.string,
  submitRoomName: PropTypes.func,
};
RoomNameInput.defaultProps = {
  currentRoomList: [],
  errorMessage: '',
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  joinRoom: lobbyActions.joinRoom,
  roomName: '',
  submitRoomName: lobbyActions.submitRoomName,
};

export default RoomNameInput;
