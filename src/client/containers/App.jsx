import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConnectedTetris from '../components/Tetris';
import ping from '../actions/server';
import { displayLobby, submitHashBasedData } from '../actions/tetris';


const hashRegex = /^#(.+)\[(.+)\]$/;
const matches = hashRegex.exec(window.location.hash);

const mapStateToProps = state => ({
  receivedPong: state.tetris.receivedPong,
});
const mapDispatchToProps = dispatch => ({
  initialPing: () => dispatch(ping()),
  initialDisplayLobby: () => dispatch(displayLobby()),
  initialSubmitHashBasedData: (playerName, roomName) => dispatch(
    submitHashBasedData(playerName, roomName),
  ),
});

export const App = ({
  receivedPong,
  initialPing,
  initialDisplayLobby,
  initialSubmitHashBasedData,
}) => {
  if (!receivedPong) {
    initialPing();
  } else if (receivedPong && matches && matches[1] && matches[2]) {
    const playerName = matches[2];
    const roomName = matches[1];

    initialSubmitHashBasedData(playerName, roomName);
  } else if (receivedPong) {
    initialDisplayLobby();
  }

  return (<ConnectedTetris />);
};

App.propTypes = {
  receivedPong: PropTypes.bool,
  initialPing: PropTypes.func,
  initialDisplayLobby: PropTypes.func,
  initialSubmitHashBasedData: PropTypes.func,
};
App.defaultProps = {
  receivedPong: false,
  initialPing: ping,
  initialDisplayLobby: displayLobby,
  initialSubmitHashBasedData: submitHashBasedData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
