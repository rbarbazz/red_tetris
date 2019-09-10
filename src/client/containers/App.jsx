import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConnectedTetris from './Tetris';
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
  handleroomNameSelection,
  matches,
  ping,
  submitHashBasedData,
}) => {
  if (clientInit && matches && matches[1] && matches[2]) {
    const playerName = matches[2];
    const roomName = matches[1];

    handlePlayerNameSelection(playerName);
    handleroomNameSelection(roomName);
    submitHashBasedData(playerName, roomName);
  } else if (clientInit) {
    displayLobby();
  } else {
    ping();
  }
  return <ConnectedTetris />;
};

App.propTypes = {
  clientInit: PropTypes.bool,
  displayLobby: PropTypes.func,
  handlePlayerNameSelection: PropTypes.func,
  handleroomNameSelection: PropTypes.func,
  matches: PropTypes.arrayOf(PropTypes.string),
  ping: PropTypes.func,
  submitHashBasedData: PropTypes.func,
};
App.defaultProps = {
  clientInit: false,
  displayLobby: tetrisActions.displayLobby,
  handlePlayerNameSelection: lobbyActions.handlePlayerNameSelection,
  handleroomNameSelection: lobbyActions.handleroomNameSelection,
  matches: [],
  ping: serverActions.ping,
  submitHashBasedData: tetrisActions.submitHashBasedData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
