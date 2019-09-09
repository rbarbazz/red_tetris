import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Tetris.css';
import ConnectedBoard from './Board';
import ConnectedLobby from './Lobby';
import
PlayerInfo,
{ propTypes as PlayerInfoPropTypes, defaultProps as PlayerInfoDefaultProps }
  from '../components/PlayerInfo';
import
Score,
{ propTypes as ScorePropTypes, defaultProps as ScoreDefaultProps }
  from '../components/Score';
import
Spectrum,
{ propTypes as SpectrumPropTypes, defaultProps as SpectrumDefaultProps }
  from '../components/Spectrum';
import LoadingIcon from '../components/LoadingIcon';
import * as boardActions from '../actions/board';
import * as lobbyActions from '../actions/lobby';


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
  playerName: state.tetris.playerName,
  roomName: state.tetris.roomName,
  score: state.tetris.score,
  spectrums: state.tetris.spectrums,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...boardActions,
    ...lobbyActions,
  }, dispatch)
);

export const Tetris = ({
  currentStep,
  leaveRoom,
  moveTetrimino,
  playerName,
  roomName,
  score,
  spectrums,
}) => {
  if (currentStep === 'game') {
    useKeyboardEvent((event) => {
      if ([32, 37, 38, 39, 40].includes(event.keyCode)) {
        moveTetrimino(event.code, event.type);
      }
    });
  }

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
          <button
            type="button"
            className="generic-button"
            onClick={leaveRoom}
          >
            Leave
          </button>
        </div>
      );
    case 'playerNameSelection':
      return <ConnectedLobby />;
    case 'roomNameSelection':
      return <ConnectedLobby />;
    default:
      return <LoadingIcon />;
  }
};

Tetris.propTypes = {
  ...PlayerInfoPropTypes,
  ...ScorePropTypes,
  ...SpectrumPropTypes,
  currentStep: PropTypes.string,
  leaveRoom: PropTypes.func,
  moveTetrimino: PropTypes.func,
};
Tetris.defaultProps = {
  ...PlayerInfoDefaultProps,
  ...ScoreDefaultProps,
  ...SpectrumDefaultProps,
  currentStep: 'loading',
  leaveRoom: lobbyActions.leaveRoom,
  moveTetrimino: boardActions.moveTetrimino,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);
