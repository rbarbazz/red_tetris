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


const mapStateToProps = state => ({ tetrisCurrentStep: state.tetris.tetrisCurrentStep });
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...boardActions,
  }, dispatch)
);

export const Tetris = ({
  tetrisCurrentStep,
  moveTetrimino,
}) => {
  useEffect(() => {
    const keyDownHandler = (event) => {
      if ([32, 37, 38, 39, 40].includes(event.keyCode) && tetrisCurrentStep === 'game') {
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

  switch (tetrisCurrentStep) {
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
    case 'lobby':
      return (<ConnectedLobby />);
    default:
      return (
        <div className="loading-icon">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      );
  }
};

Tetris.propTypes = {
  moveTetrimino: PropTypes.func,
  tetrisCurrentStep: PropTypes.string,
};
Tetris.defaultProps = {
  moveTetrimino: boardActions.moveTetrimino,
  tetrisCurrentStep: 'loading',
};

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);
