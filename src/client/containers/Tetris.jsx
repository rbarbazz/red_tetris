import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/Tetris.css';
import * as gameActions from '../actions/game';
import ConnectedGame from './Game';
import ConnectedLobby from './Lobby';
import LoadingIcon from '../components/LoadingIcon';


const useKeyboardEvent = (callback) => {
  useEffect(() => {
    window.addEventListener('keydown', callback);
    window.addEventListener('keyup', callback);
    return () => {
      window.removeEventListener('keydown', callback);
      window.removeEventListener('keyup', callback);
    };
  }, [callback]);
};

const mapStateToProps = state => ({
  currentStep: state.tetris.currentStep,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...gameActions,
  }, dispatch)
);

export const Tetris = ({
  currentStep,
  sendGameInput,
}) => {
  useKeyboardEvent((event) => {
    const { keyCode, type } = event;
    const inputCodes = [32, 37, 38, 39, 40];

    if (currentStep === 'game' && inputCodes.includes(keyCode)) {
      sendGameInput(keyCode, type);
    }
  });

  switch (currentStep) {
    case 'playerNameSelection':
    case 'roomNameSelection':
      return <ConnectedLobby />;
    case 'game':
    case 'endGame':
    case 'gameReport':
      return <ConnectedGame />;
    default:
      return <LoadingIcon />;
  }
};

Tetris.propTypes = {
  currentStep: PropTypes.string,
  sendGameInput: PropTypes.func,
};
Tetris.defaultProps = {
  currentStep: 'loading',
  sendGameInput: gameActions.sendGameInput,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);
