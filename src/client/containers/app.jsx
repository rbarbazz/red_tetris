import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tetris from '../components/Tetris';
import ping from '../actions/server';

const mapDispatchToProps = dispatch => ({
  pingServer: () => dispatch(ping()),
});

const App = (props) => {
  const { pingServer } = props;

  pingServer();

  return (<Tetris />);
};

App.propTypes = {
  pingServer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
