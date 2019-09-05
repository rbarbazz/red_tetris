import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';


const RoomNameInput = ({
  currentRoomList,
  errorMessage,
  handleroomNameSelection,
  roomName,
  submitRoomName,
}) => {
  const inputElement = useRef(null);

  return (
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
      <form
        className="input-submit-container"
        onSubmit={(event) => {
          event.preventDefault();
          submitRoomName(roomName);
        }}
      >
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
                    tabIndex="-1"
                    key={`room-item-${index.toString()}`}
                    onClick={(event) => {
                      inputElement.current.focus();
                      handleroomNameSelection(event.target.textContent);
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
          ref={inputElement}
          onChange={event => handleroomNameSelection(event.target.value)}
          value={roomName}
        />
        <button
          disabled={roomName === ''}
          type="submit"
        >
          {currentRoomList.includes(roomName) ? 'Enter' : 'Create'}
        </button>
      </form>
    </div>
  );
};

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
