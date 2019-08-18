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


const mapStateToProps = state => ({
  playerName: state.tetris.playerName,
  roomName: state.tetris.roomName,
  score: state.tetris.score,
  spectrums: state.tetris.spectrums,
  tetrisCurrentStep: state.tetris.tetrisCurrentStep,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...boardActions,
  }, dispatch)
);

export const Tetris = ({
  moveTetrimino,
  playerName,
  roomName,
  score,
  spectrums,
  tetrisCurrentStep,
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
          <PlayerInfo
            playerName={playerName}
            roomName={roomName}
          />
          <div className="board-stats-container">
            <ConnectedBoard />
            <div className="stats-container">
              <Score
                score={score}
              />
              <Spectrum
                spectrums={spectrums}
              />
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
  moveTetrimino: PropTypes.func,
  playerName: PropTypes.string,
  roomName: PropTypes.string,
  score: PropTypes.number,
  spectrums: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  tetrisCurrentStep: PropTypes.string,
};
Tetris.defaultProps = {
  moveTetrimino: boardActions.moveTetrimino,
  tetrisCurrentStep: 'loading',
  roomName: '',
  playerName: '',
  score: 0,
  spectrums: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);
