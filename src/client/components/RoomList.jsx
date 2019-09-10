import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';
import { roomState } from '../../common/enums';
import LoadingIcon from './LoadingIcon';


const RoomList = ({
  isInRoom,
  isLoading,
  roomList,
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
      {roomList.length > 0
      && (
        roomList.map((roomItem, index) => (
          <div
            className="room-item"
            key={`room-item-${index.toString()}`}
            style={roomName === roomItem.name ? { borderColor: '#eb4d4b' } : {}}
          >
            <div className="room-item-info-container">
              <div className="room-item-info" style={{ color: '#eb4d4b' }}>{roomItem.name}</div>
              <div className="room-item-info">{roomItem.state === roomState.FREE ? 'In Lobby' : 'In Game'}</div>
              <div className="room-item-info">{`Slots ${roomItem.slots[1]}/${roomItem.slots[2]}`}</div>
            </div>
            {!isInRoom && roomItem.slots[0] > 0 && !isLoading
            && (
            <button
              type="submit"
              className="generic-button"
              onClick={() => submitRoomName(roomItem.name)}
            >
              {roomItem.state === roomState.BUSY ? (
                'Join as spectator'
              ) : (
                'Join'
              )}
            </button>
            )}
            {!isInRoom && roomItem.slots[0] > 0 && isLoading
            && (
              <LoadingIcon />
            )}
          </div>
        ))
      )}
      {roomList.length === 0
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
  isInRoom: PropTypes.bool,
  isLoading: PropTypes.bool,
  roomList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    })),
    slots: PropTypes.arrayOf(PropTypes.number),
    state: PropTypes.string,
  })),
  roomName: PropTypes.string,
  submitRoomName: PropTypes.func,
};
RoomList.propTypes = propTypes;

export const defaultProps = {
  isInRoom: false,
  isLoading: false,
  roomList: [],
  roomName: '',
  submitRoomName: lobbyActions.submitRoomName,
};
RoomList.defaultProps = defaultProps;

export default RoomList;
