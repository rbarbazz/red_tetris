import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tetris from '../components/Tetris';
import ping from '../actions/server';

const mapDispatchToProps = dispatch => ({
  initialPing: () => dispatch(ping()),
});

const App = (props) => {
  const { initialPing } = props;

  initialPing();

  return (<Tetris />);
};

App.propTypes = {
  initialPing: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
