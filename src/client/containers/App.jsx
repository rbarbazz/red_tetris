import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConnectedTetris from '../components/Tetris';
import ping from '../actions/server';


const mapDispatchToProps = dispatch => ({
  initialPing: () => dispatch(ping()),
});

export const App = ({ initialPing }) => {
  initialPing();
  return (<ConnectedTetris />);
};

App.propTypes = {
  initialPing: PropTypes.func,
};
App.defaultProps = {
  initialPing: ping,
};

export default connect(null, mapDispatchToProps)(App);
