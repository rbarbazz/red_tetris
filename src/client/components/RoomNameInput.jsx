import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';
import { GAME_TYPE } from '../../common/enums';
import PlayerInfo from './PlayerInfo';
import
RoomList,
{ propTypes as RoomListPropTypes, defaultProps as RoomListDefaultProps }
  from './RoomList';
import
PlayerList,
{ propTypes as PlayerListPropTypes, defaultProps as PlayerListDefaultProps }
  from './PlayerList';
import GenericButton from './GenericButton';


const RoomNameInput = ({
  currentPlayerType,
  handleRoomSelection,
  isInRoom,
  isLoading,
  leaveRoom,
  message,
  ownerIsReady,
  playerList,
  playerName,
  roomGameMode,
  roomList,
  roomName,
  roomObject,
  submitRoom,
}) => (
  <div className="room-selection-wrapper">
    <PlayerInfo
      playerName={playerName}
      roomName={isInRoom ? roomName : ''}
    />
    <div key="room-selection-container" className="room-selection-container">
      <div className="room-selection-left-side">
        {roomList.length > 0 && (
          <RoomList
            isInRoom={isInRoom}
            isLoading={isLoading}
            roomList={roomObject === undefined ? roomList : [roomObject]}
            submitRoom={submitRoom}
          />
        )}
        {!isInRoom
        && (
          <div className="room-creation-container">
            <div className="room-creation-title">Create New Room</div>
            <form
              className="room-creation-input-container"
              onSubmit={(event) => {
                event.preventDefault();
                submitRoom(roomName, roomGameMode);
              }}
            >
              <input
                className="room-creation-text-input"
                onChange={event => handleRoomSelection(event.target.value, roomGameMode)}
                placeholder="Room Name"
                style={roomName === '' ? {} : { border: 'solid 3px #eb4d4b' }}
                type="text"
                value={roomName}
              />
              <select
                className="game-mode-select"
                onChange={event => handleRoomSelection(roomName, event.target.value)}
                value={roomGameMode}
              >
                <option value={GAME_TYPE.CLASSIC}>Classic</option>
                <option value={GAME_TYPE.TOURNAMENT}>Tournament</option>
              </select>
              <GenericButton
                action={() => submitRoom(roomName, roomGameMode)}
                contentText="Create"
                disabled={roomName === ''}
                isLoading={isLoading}
              />
            </form>
          </div>
        )}
      </div>
      <div className="room-selection-right-side">
        <PlayerList
          currentPlayerType={currentPlayerType}
          isInRoom={isInRoom}
          isLoading={isLoading}
          leaveRoom={leaveRoom}
          ownerIsReady={ownerIsReady}
          playerList={playerList}
        />
      </div>
    </div>
    <div className="message-bar">{message}</div>
  </div>
);

export const propTypes = {
  ...PlayerListPropTypes,
  ...RoomListPropTypes,
  handleRoomSelection: PropTypes.func,
  message: PropTypes.string,
  playerName: PropTypes.string,
  roomGameMode: PropTypes.string,
};
RoomNameInput.propTypes = propTypes;

export const defaultProps = {
  ...PlayerListDefaultProps,
  ...RoomListDefaultProps,
  handleRoomSelection: lobbyActions.handleRoomSelection,
  message: '',
  playerName: '',
  roomGameMode: GAME_TYPE.CLASSIC,
};
RoomNameInput.defaultProps = defaultProps;

export default RoomNameInput;
