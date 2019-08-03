import React from 'react';
import { connect } from 'react-redux';
import Tetris from '../components/Tetris';

const App = () => <Tetris />;

const mapStateToProps = state => ({ board: state.board });

export default connect(mapStateToProps, null)(App);
