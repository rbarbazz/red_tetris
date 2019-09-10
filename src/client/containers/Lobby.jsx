import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as lobbyActions from '../actions/lobby';
import
RoomNameInput,
{ propTypes as RoomNameInputPropTypes, defaultProps as RoomNameInputDefaultProps }
  from '../components/RoomNameInput';
import
PlayerNameInput,
{ propTypes as PlayerNameInputPropTypes, defaultProps as PlayerNameInputDefaultProps }
  from '../components/PlayerNameInput';
import LoadingIcon from '../components/LoadingIcon';


const mapStateToProps = state => ({
  currentPlayerType: state.tetris.currentPlayerType,
  currentStep: state.tetris.currentStep,
  isInRoom: state.tetris.isInRoom,
  isLoading: state.tetris.isLoading,
  message: state.tetris.message,
  playerList: state.tetris.playerList,
  playerName: state.tetris.playerName,
  roomList: state.tetris.roomList,
  roomName: state.tetris.roomName,
  roomObject: state.tetris.roomObject,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...lobbyActions,
  }, dispatch)
);

export const Lobby = ({
  currentPlayerType,
  currentStep,
  handlePlayerNameSelection,
  handleroomNameSelection,
  isInRoom,
  isLoading,
  leaveRoom,
  message,
  ownerIsReady,
  playerList,
  playerName,
  roomList,
  roomName,
  roomObject,
  submitPlayerName,
  submitRoomName,
}) => {
  switch (currentStep) {
    case 'playerNameSelection':
      return (
        <PlayerNameInput
          handlePlayerNameSelection={handlePlayerNameSelection}
          isLoading={isLoading}
          message={message}
          playerName={playerName}
          submitPlayerName={submitPlayerName}
        />
      );
    case 'roomNameSelection':
      return (
        <RoomNameInput
          currentPlayerType={currentPlayerType}
          handleroomNameSelection={handleroomNameSelection}
          isInRoom={isInRoom}
          isLoading={isLoading}
          leaveRoom={leaveRoom}
          message={message}
          ownerIsReady={ownerIsReady}
          playerList={playerList}
          playerName={playerName}
          roomList={roomList}
          roomName={roomName}
          roomObject={roomObject}
          submitRoomName={submitRoomName}
        />
      );
    default:
      return <LoadingIcon />;
  }
};

Lobby.propTypes = {
  ...RoomNameInputPropTypes,
  ...PlayerNameInputPropTypes,
  currentStep: PropTypes.string,
};
Lobby.defaultProps = {
  ...RoomNameInputDefaultProps,
  ...PlayerNameInputDefaultProps,
  currentStep: 'playerNameSelection',
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
