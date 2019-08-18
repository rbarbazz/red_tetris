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
  currentStep: state.tetris.currentStep,
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
  handlePlayerNameSelection,
  handleroomNameSelection,
  currentStep,
  playerName,
  roomName,
  submitPlayerName,
  submitRoom,
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
          submitRoom={submitRoom}
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
  submitRoom: PropTypes.func,
};
Lobby.defaultProps = {
  currentRoomList: [],
  currentStep: 'playerNameSelection',
  handlePlayerNameSelection: lobbyActions.handlePlayerNameSelection,
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  playerName: '',
  roomName: '',
  submitPlayerName: lobbyActions.submitPlayerName,
  submitRoom: lobbyActions.submitRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
