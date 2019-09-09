import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';
import { roomState } from '../../common/enums';


const RoomList = ({
  currentRoomList,
  isInRoom,
  roomName,
  submitRoomName,
}) => (
  <div className="room-list-container">
    <div className="room-list-title">
      {isInRoom ? (
        'Current Room'
      ) : (
        'Existing Rooms'
      )}
    </div>
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
);

export const propTypes = {
  currentRoomList: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.exact({
      playerName: PropTypes.string,
      playerType: PropTypes.string,
    })),
    slots: PropTypes.arrayOf(PropTypes.number),
    state: PropTypes.string,
  })),
  isInRoom: PropTypes.bool,
  roomName: PropTypes.string,
  submitRoomName: PropTypes.func,
};
RoomList.propTypes = propTypes;

export const defaultProps = {
  currentRoomList: [],
  isInRoom: false,
  roomName: '',
  submitRoomName: lobbyActions.submitRoomName,
};
RoomList.defaultProps = defaultProps;

export default RoomList;
