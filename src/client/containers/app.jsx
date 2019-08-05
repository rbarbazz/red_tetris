import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tetris from '../components/Tetris';
import { board } from '../actions/board';


const getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(200));
};

const mapDispatchToProps = dispatch => ({
  randColor: boardArr => dispatch(board(boardArr)),
});


const App = (props) => {
  const { randColor } = props;

  useEffect(() => {
    const keyDownHandler = (event) => {
      const boardArr = new Array(200).fill(0);
      boardArr[getRandomInt()] = 1;
      if (event.keyCode === 32) {
        randColor(boardArr);
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  });

  return (
    <Tetris />
  );
};

App.propTypes = {
  randColor: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
