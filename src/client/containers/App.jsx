import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConnectedTetris from './Tetris';
import * as serverActions from '../actions/server';
import * as tetrisActions from '../actions/tetris';


const mapStateToProps = state => ({
  clientInit: state.server.clientInit,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...serverActions,
  ...tetrisActions,
}, dispatch));

export const App = ({
  displayLobby,
  matches,
  ping,
  clientInit,
  submitHashBasedData,
}) => {
  if (clientInit && matches && matches[1] && matches[2]) {
    const playerName = matches[2];
    const roomName = matches[1];

    submitHashBasedData(playerName, roomName);
  } else if (clientInit) {
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
  clientInit: PropTypes.bool,
  submitHashBasedData: PropTypes.func,
};
App.defaultProps = {
  displayLobby: tetrisActions.displayLobby,
  matches: [],
  ping: serverActions.ping,
  clientInit: false,
  submitHashBasedData: tetrisActions.submitHashBasedData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
