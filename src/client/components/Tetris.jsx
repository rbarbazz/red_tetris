import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Tetris.css';
import Board from './Board';
import Lobby from './Lobby';
import Spectrum from './Spectrum';
import Score from './Score';
import * as boardActions from '../actions/board';

const mapStateToProps = state => ({ tetris: state.tetris });

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...boardActions,
  }, dispatch)
);

const Tetris = (props) => {
  const { tetris, moveTetrimino } = props;
  const { currentStep } = tetris;

  useEffect(() => {
    const keyDownHandler = (event) => {
      if ([32, 37, 38, 39, 40].includes(event.keyCode) && currentStep === 'game') {
        moveTetrimino(event.code, event.type);
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
      return (
        <div className="game-container">
          <Board />
          <div className="stats-container">
            <Spectrum />
            <Score />
          </div>
        </div>
      );
    default:
      return (<Lobby />);
  }
};

Tetris.propTypes = {
  moveTetrimino: PropTypes.func.isRequired,
  tetris: PropTypes.shape({
    currentStep: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);
