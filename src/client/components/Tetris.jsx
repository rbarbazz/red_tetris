import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Tetris.css';
import Board from './Board';
import Lobby from './Lobby';
import { boardSpace } from '../actions/board';

const mapStateToProps = state => ({ tetris: state.tetris });

const mapDispatchToProps = dispatch => ({
  spaceHandler: () => dispatch(boardSpace()),
});

const Tetris = (props) => {
  const { tetris, spaceHandler } = props;
  const { currentStep } = tetris;
  useEffect(() => {
    const keyDownHandler = (event) => {
      if ([32, 37, 38, 39, 40].includes(event.keyCode) && currentStep === 'game') {
        console.log(`${event.code} ${event.type}`);
        if (event.keyCode === 32 && event.type === 'keydown') {
          spaceHandler();
        }
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyDownHandler);
    };
  });

  switch (currentStep) {
    case 'game':
      return (<Board />);
    default:
      return (<Lobby />);
  }
};

Tetris.propTypes = {
  spaceHandler: PropTypes.func.isRequired,
  tetris: PropTypes.shape({
    currentStep: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);
