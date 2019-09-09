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
  currentPlayerType: state.lobby.currentPlayerType,
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
  currentPlayerType,
  currentRoomList,
  currentRoomPlayerList,
  currentStep,
  handlePlayerNameSelection,
  handleroomNameSelection,
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
          currentPlayerType={currentPlayerType}
          currentRoomList={currentRoomList}
          currentRoomPlayerList={currentRoomPlayerList}
          errorMessage={errorMessage}
          handleroomNameSelection={handleroomNameSelection}
          isInRoom={isInRoom}
          leaveRoom={leaveRoom}
          ownerIsReady={ownerIsReady}
          playerName={playerName}
          roomName={roomName}
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
