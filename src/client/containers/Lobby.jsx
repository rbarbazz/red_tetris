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
        />
      );
    case 'roomNameSelection':
      return (
        <RoomNameInput
          currentRoomList={currentRoomList}
          handleroomNameSelection={handleroomNameSelection}
          roomName={roomName}
          submitRoomName={submitRoomName}
        />
      );
    default:
      return <LoadingIcon />;
  }
};

Lobby.propTypes = {
  currentRoomList: PropTypes.arrayOf(PropTypes.string),
  currentStep: PropTypes.string,
  handlePlayerNameSelection: PropTypes.func,
  handleroomNameSelection: PropTypes.func,
  playerName: PropTypes.string,
  roomName: PropTypes.string,
  submitPlayerName: PropTypes.func,
  submitRoomName: PropTypes.func,
};
Lobby.defaultProps = {
  currentRoomList: [],
  currentStep: 'playerNameSelection',
  handlePlayerNameSelection: lobbyActions.handlePlayerNameSelection,
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  playerName: '',
  roomName: '',
  submitPlayerName: lobbyActions.submitPlayerName,
  submitRoomName: lobbyActions.submitRoomName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
