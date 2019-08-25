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
  displayLobby,
  matches,
  ping,
  receivedPong,
  submitHashBasedData,
}) => {
  if (receivedPong && matches && matches[1] && matches[2]) {
    const playerName = matches[2];
    const roomName = matches[1];

    submitHashBasedData(playerName, roomName);
  } else if (receivedPong) {
    displayLobby();
  } else {
    ping();
  }

  return <ConnectedTetris />;
};

App.propTypes = {
  displayLobby: PropTypes.func,
  matches: PropTypes.arrayOf(PropTypes.string),
  ping: PropTypes.func,
  receivedPong: PropTypes.bool,
  submitHashBasedData: PropTypes.func,
};
App.defaultProps = {
  displayLobby: tetrisActions.displayLobby,
  matches: [],
  ping: serverActions.ping,
  receivedPong: false,
  submitHashBasedData: tetrisActions.submitHashBasedData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
