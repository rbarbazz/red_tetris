import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import 'normalize.css';
import '../styles/Tetris.css';
import ConnectedTetris from './Tetris';
import MusicToggle from '../components/MusicToggle';
import * as serverActions from '../actions/server';
import * as tetrisActions from '../actions/tetris';
import * as lobbyActions from '../actions/lobby';


const mapStateToProps = state => ({
  clientInit: state.server.clientInit,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...lobbyActions,
  ...serverActions,
  ...tetrisActions,
}, dispatch));

export const App = ({
  clientInit,
  displayLobby,
  handlePlayerNameSelection,
  handleRoomSelection,
  matches,
  ping,
  submitHashBasedData,
}) => {
  if (clientInit && matches && matches[1] && matches[2]) {
    const playerName = matches[2];
    const roomName = matches[1];

    handlePlayerNameSelection(playerName);
    handleRoomSelection(roomName);
    submitHashBasedData(playerName, roomName);
  } else if (clientInit) {
    displayLobby();
  } else {
    ping();
  }
  return (
    <>
      <MusicToggle url="http://23.237.126.42/ost/tetris-gameboy-rip/mpkrawiu/tetris-gameboy-02.mp3" />
      <ConnectedTetris />
    </>
  );
};

App.propTypes = {
  clientInit: PropTypes.bool,
  displayLobby: PropTypes.func,
  handlePlayerNameSelection: PropTypes.func,
  handleRoomSelection: PropTypes.func,
  matches: PropTypes.arrayOf(PropTypes.string),
  ping: PropTypes.func,
  submitHashBasedData: PropTypes.func,
};
App.defaultProps = {
  clientInit: false,
  displayLobby: tetrisActions.displayLobby,
  handlePlayerNameSelection: lobbyActions.handlePlayerNameSelection,
  handleRoomSelection: lobbyActions.handleRoomSelection,
  matches: [],
  ping: serverActions.ping,
  submitHashBasedData: tetrisActions.submitHashBasedData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
