import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Tetris from '../components/Tetris';
import ping from '../actions/server';

const mapDispatchToProps = dispatch => ({
  pingServer: () => dispatch(ping()),
});

const App = (props) => {
  const { pingServer } = props;
  const socket = io('http://0.0.0.0:3004/');

  socket.on('action', (action) => {
    if (action.type === 'pong') {
      console.log('pong');
    }
  });
  socket.emit('action', pingServer());

  return (<Tetris />);
};

App.propTypes = {
  pingServer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
