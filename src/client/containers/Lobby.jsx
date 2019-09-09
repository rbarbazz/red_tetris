import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as lobbyActions from '../actions/lobby';
import PlayerNameInput from '../components/PlayerNameInput';
import RoomNameInput from '../components/RoomNameInput';
import LoadingIcon from '../components/LoadingIcon';


const mapStateToProps = state => ({
  currPlayerType: state.tetris.playerType,
  currentRoomList: state.lobby.currentRoomList,
  currentRoomPlayerList: state.lobby.currentRoomPlayerList,
  currentStep: state.lobby.currentStep,
  isInRoom: state.lobby.isInRoom,
  playerName: state.lobby.playerName,
  roomName: state.lobby.roomName,
  errorMessage: state.lobby.errorMessage,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...lobbyActions,
  }, dispatch)
);

export const Lobby = ({
  currentRoomList,
  currentRoomPlayerList,
  handlePlayerNameSelection,
  handleroomNameSelection,
  currPlayerType,
  currentStep,
  errorMessage,
  isInRoom,
  leaveRoom,
  ownerIsReady,
  playerName,
  roomName,
  submitPlayerName,
  submitRoomName,
}) => {
  switch (currentStep) {
    case 'playerNameSelection':
      return (
        <PlayerNameInput
          handlePlayerNameSelection={handlePlayerNameSelection}
          playerName={playerName}
          submitPlayerName={submitPlayerName}
          errorMessage={errorMessage}
        />
      );
    case 'roomNameSelection':
      return (
        <RoomNameInput
          currentRoomList={currentRoomList}
          currentRoomPlayerList={currentRoomPlayerList}
          errorMessage={errorMessage}
          handleroomNameSelection={handleroomNameSelection}
          isInRoom={isInRoom}
          leaveRoom={leaveRoom}
          ownerIsReady={ownerIsReady}
          playerName={playerName}
          currPlayerType={currPlayerType}
          roomName={roomName}
          submitRoomName={submitRoomName}
        />
      );
    default:
      return <LoadingIcon />;
  }
};

Lobby.propTypes = {
  currentRoomList: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.string),
    slots: PropTypes.arrayOf(PropTypes.number),
    state: PropTypes.string,
  })),
  currentRoomPlayerList: PropTypes.arrayOf(PropTypes.string),
  currentStep: PropTypes.string,
  errorMessage: PropTypes.string,
  handlePlayerNameSelection: PropTypes.func,
  handleroomNameSelection: PropTypes.func,
  isInRoom: PropTypes.bool,
  leaveRoom: PropTypes.func,
  playerName: PropTypes.string,
  roomName: PropTypes.string,
  submitPlayerName: PropTypes.func,
  submitRoomName: PropTypes.func,
};
Lobby.defaultProps = {
  currentRoomList: [],
  currentRoomPlayerList: [],
  currentStep: 'playerNameSelection',
  errorMessage: '',
  handlePlayerNameSelection: lobbyActions.handlePlayerNameSelection,
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  isInRoom: false,
  leaveRoom: lobbyActions.leaveRoom,
  playerName: '',
  roomName: '',
  submitPlayerName: lobbyActions.submitPlayerName,
  submitRoomName: lobbyActions.submitRoomName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
