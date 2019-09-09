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
  errorMessage: state.tetris.errorMessage,
  isInRoom: state.tetris.isInRoom,
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
  errorMessage,
  handlePlayerNameSelection,
  handleroomNameSelection,
  isInRoom,
  leaveRoom,
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
          errorMessage={errorMessage}
          handlePlayerNameSelection={handlePlayerNameSelection}
          playerName={playerName}
          submitPlayerName={submitPlayerName}
        />
      );
    case 'roomNameSelection':
      return (
        <RoomNameInput
          currentPlayerType={currentPlayerType}
          errorMessage={errorMessage}
          handleroomNameSelection={handleroomNameSelection}
          isInRoom={isInRoom}
          leaveRoom={leaveRoom}
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
