import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as lobbyActions from '../actions/lobby';
import PlayerNameInput from '../components/PlayerNameInput';
import RoomNameInput from '../components/RoomNameInput';
import LoadingIcon from '../components/LoadingIcon';


const mapStateToProps = state => ({
  currentRoomList: state.tetris.currentRoomList,
  lobbyCurrentStep: state.tetris.lobbyCurrentStep,
  playerName: state.tetris.playerName,
  roomName: state.tetris.roomName,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...lobbyActions,
  }, dispatch)
);

export const Lobby = ({
  currentRoomList,
  handlePlayerName,
  handleRoomSelection,
  lobbyCurrentStep,
  playerName,
  roomName,
  submitPlayerName,
  submitRoom,
}) => {
  switch (lobbyCurrentStep) {
    case 'playerNameSelection':
      return (
        <PlayerNameInput
          handlePlayerName={handlePlayerName}
          playerName={playerName}
          submitPlayerName={submitPlayerName}
        />
      );
    case 'roomSelection':
      return (
        <RoomNameInput
          currentRoomList={currentRoomList}
          handleRoomSelection={handleRoomSelection}
          roomName={roomName}
          submitRoom={submitRoom}
        />
      );
    default:
      return <LoadingIcon />;
  }
};

Lobby.propTypes = {
  currentRoomList: PropTypes.arrayOf(PropTypes.string),
  handlePlayerName: PropTypes.func,
  handleRoomSelection: PropTypes.func,
  lobbyCurrentStep: PropTypes.string,
  playerName: PropTypes.string,
  roomName: PropTypes.string,
  submitPlayerName: PropTypes.func,
  submitRoom: PropTypes.func,
};
Lobby.defaultProps = {
  currentRoomList: [],
  handlePlayerName: lobbyActions.handlePlayerName,
  handleRoomSelection: lobbyActions.handleRoomSelection,
  lobbyCurrentStep: 'playerName',
  playerName: '',
  roomName: '',
  submitPlayerName: lobbyActions.submitPlayerName,
  submitRoom: lobbyActions.submitRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
