import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConnectedTetris from './Tetris';
import * as serverActions from '../actions/server';
import * as tetrisActions from '../actions/tetris';


const mapStateToProps = state => ({
  receivedPong: state.server.receivedPong,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...serverActions,
  ...tetrisActions,
}, dispatch));

export const App = ({
  receivedPong,
  ping,
  displayLobby,
  submitHashBasedData,
  matches,
}) => {
  if (!receivedPong) {
    ping();
  } else if (receivedPong && matches && matches[1] && matches[2]) {
    const playerName = matches[2];
    const roomName = matches[1];

    submitHashBasedData(playerName, roomName);
  } else if (receivedPong) {
    displayLobby();
  }

  return <ConnectedTetris />;
};

App.propTypes = {
  receivedPong: PropTypes.bool,
  ping: PropTypes.func,
  displayLobby: PropTypes.func,
  submitHashBasedData: PropTypes.func,
  matches: PropTypes.arrayOf(PropTypes.string),
};
App.defaultProps = {
  receivedPong: false,
  ping: serverActions.ping,
  displayLobby: tetrisActions.displayLobby,
  submitHashBasedData: tetrisActions.submitHashBasedData,
  matches: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
