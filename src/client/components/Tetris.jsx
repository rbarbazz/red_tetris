import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Tetris.css';
import ConnectedBoard from './Board';
import ConnectedLobby from './Lobby';
import Spectrum from './Spectrum';
import Score from './Score';
import * as boardActions from '../actions/board';


const mapStateToProps = state => ({ tetris: state.tetris });

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...boardActions,
  }, dispatch)
);

export const Tetris = ({ tetris, moveTetrimino }) => {
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
          <ConnectedBoard />
          <div className="stats-container">
            <Spectrum />
            <Score />
          </div>
        </div>
      );
    default:
      return (<ConnectedLobby />);
  }
};

Tetris.propTypes = {
  moveTetrimino: PropTypes.func,
  tetris: PropTypes.shape({
    currentStep: PropTypes.string,
  }),
};
Tetris.defaultProps = {
  moveTetrimino: boardActions.moveTetrimino,
  tetris: {
    currentStep: 'lobby',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);
