import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Tetris.css';
import ConnectedBoard from './Board';
import ConnectedLobby from './Lobby';
import PlayerInfo from '../components/PlayerInfo';
import Score from '../components/Score';
import Spectrum from '../components/Spectrum';
import LoadingIcon from '../components/LoadingIcon';
import * as boardActions from '../actions/board';


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
  didGameStart: state.tetris.didGameStart,
  playerName: state.lobby.playerName,
  roomName: state.lobby.roomName,
  score: state.tetris.score,
  spectrums: state.tetris.spectrums,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...boardActions,
  }, dispatch)
);

export const Tetris = ({
  currentStep,
  didGameStart,
  moveTetrimino,
  playerName,
  roomName,
  score,
  spectrums,
}) => {
  useKeyboardEvent((event) => {
    if (didGameStart && currentStep === 'game' && [32, 37, 38, 39, 40].includes(event.keyCode)) {
      moveTetrimino(event.code, event.type);
    }
  });

  switch (currentStep) {
    case 'game':
      return (
        <div className="game-container">
          <PlayerInfo
            playerName={playerName}
            roomName={roomName}
          />
          <div className="board-stats-container">
            <ConnectedBoard />
            <div className="stats-container">
              <Score score={score} />
              <Spectrum spectrums={spectrums} />
            </div>
          </div>
        </div>
      );
    case 'lobby':
      return (<ConnectedLobby />);
    default:
      return <LoadingIcon />;
  }
};

Tetris.propTypes = {
  currentStep: PropTypes.string,
  didGameStart: PropTypes.bool,
  moveTetrimino: PropTypes.func,
  playerName: PropTypes.string,
  roomName: PropTypes.string,
  score: PropTypes.number,
  spectrums: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};
Tetris.defaultProps = {
  currentStep: 'loading',
  didGameStart: false,
  moveTetrimino: boardActions.moveTetrimino,
  roomName: '',
  playerName: '',
  score: 0,
  spectrums: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);