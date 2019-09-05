import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as lobbyActions from '../actions/lobby';
import PlayerNameInput from '../components/PlayerNameInput';
import RoomNameInput from '../components/RoomNameInput';
import LoadingIcon from '../components/LoadingIcon';


const mapStateToProps = state => ({
  currentRoomList: state.lobby.currentRoomList,
  currentStep: state.lobby.currentStep,
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
  handlePlayerNameSelection,
  handleroomNameSelection,
  currentStep,
  errorMessage,
  joinRoom,
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
          errorMessage={errorMessage}
          handleroomNameSelection={handleroomNameSelection}
          roomName={roomName}
          submitRoomName={submitRoomName}
          joinRoom={joinRoom}
        />
      );
    default:
      return <LoadingIcon />;
  }
};

Lobby.propTypes = {
  currentRoomList: PropTypes.arrayOf(PropTypes.string),
  currentStep: PropTypes.string,
  errorMessage: PropTypes.string,
  handlePlayerNameSelection: PropTypes.func,
  handleroomNameSelection: PropTypes.func,
  joinRoom: PropTypes.func,
  playerName: PropTypes.string,
  roomName: PropTypes.string,
  submitPlayerName: PropTypes.func,
  submitRoomName: PropTypes.func,
};
Lobby.defaultProps = {
  currentRoomList: [],
  currentStep: 'playerNameSelection',
  errorMessage: '',
  handlePlayerNameSelection: lobbyActions.handlePlayerNameSelection,
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  joinRoom: lobbyActions.joinRoom,
  playerName: '',
  roomName: '',
  submitPlayerName: lobbyActions.submitPlayerName,
  submitRoomName: lobbyActions.submitRoomName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
