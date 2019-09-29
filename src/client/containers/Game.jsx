import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as lobbyActions from '../actions/lobby';
import GenericButton from '../components/GenericButton';
import
Board,
{ propTypes as BoardPropTypes, defaultProps as BoardDefaultProps }
  from '../components/Board';
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
import
GameReport,
{ propTypes as GameReportPropTypes, defaultProps as GameReportDefaultProps }
  from '../components/GameReport';


const mapStateToProps = state => ({
  board: state.game.board,
  currentPlayerType: state.tetris.currentPlayerType,
  currentStep: state.tetris.currentStep,
  playerName: state.tetris.playerName,
  roomName: state.tetris.roomName,
  score: state.game.score,
  spectrums: state.game.spectrums,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...lobbyActions,
  }, dispatch)
);

export const Game = ({
  board,
  currentPlayerType,
  currentStep,
  leaveRoom,
  playerName,
  resetRoom,
  roomName,
  score,
  spectrums,
}) => (
  <div className="game-container">
    <PlayerInfo
      playerName={playerName}
      roomName={roomName}
    />
    {currentStep === 'gameReport' ? (
      <GameReport
        currentPlayerType={currentPlayerType}
        leaveRoom={leaveRoom}
        resetRoom={resetRoom}
      />
    ) : (
      <div className="board-stats-container">
        <Board
          board={board}
          currentStep={currentStep}
        />
        <div className="stats-container">
          <Score score={score} />
          <Spectrum spectrums={spectrums} />
          <GenericButton
            action={leaveRoom}
            contentText="Leave"
          />
        </div>
      </div>
    )}
  </div>
);

export const propTypes = {
  ...BoardPropTypes,
  ...GameReportPropTypes,
  ...PlayerInfoPropTypes,
  ...ScorePropTypes,
  ...SpectrumPropTypes,
};
Game.propTypes = propTypes;

export const defaultProps = {
  ...BoardDefaultProps,
  ...GameReportDefaultProps,
  ...PlayerInfoDefaultProps,
  ...ScoreDefaultProps,
  ...SpectrumDefaultProps,
};
Game.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
