import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';
import { roomState } from '../../common/enums';
import
GenericButton,
{ propTypes as GenericButtonPropTypes, defaultProps as GenericButtonDefaultProps }
  from './GenericButton';


const RoomList = ({
  isInRoom,
  isLoading,
  roomList,
  submitRoom,
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
      {roomList.map((roomItem, index) => (
        <div
          className="room-item list-item"
          key={`room-item-${index.toString()}`}
        >
          <div className="room-item-info-container">
            <div className="room-item-info" style={{ color: '#eb4d4b' }}>{roomItem.name}</div>
            <div className="room-item-info">{roomItem.state === roomState.FREE ? 'In Lobby' : 'In Game'}</div>
            <div className="room-item-info">{`Slots ${roomItem.slots[1]}/${roomItem.slots[2]}`}</div>
          </div>
          {!isInRoom && (
            <GenericButton
              action={() => submitRoom(roomItem.name)}
              isLoading={isLoading}
              disabled={roomItem.slots[0] === 0 && roomItem.state === roomState.FREE}
              contentText={roomItem.state === roomState.BUSY ? (
                'Join as spectator'
              ) : (
                'Join'
              )}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export const propTypes = {
  ...GenericButtonPropTypes,
  isInRoom: PropTypes.bool,
  roomList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    })),
    slots: PropTypes.arrayOf(PropTypes.number),
    state: PropTypes.string,
  })),
  submitRoom: PropTypes.func,
};
RoomList.propTypes = propTypes;

export const defaultProps = {
  ...GenericButtonDefaultProps,
  isInRoom: false,
  roomList: [],
  submitRoom: lobbyActions.submitRoom,
};
RoomList.defaultProps = defaultProps;

export default RoomList;
