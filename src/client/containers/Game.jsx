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
import
NextPiece,
{ propTypes as NextPiecePropTypes, defaultProps as NextPieceDefaultProps }
  from '../components/NextPiece';


const mapStateToProps = state => ({
  board: state.game.board,
  currentPlayerType: state.tetris.currentPlayerType,
  currentStep: state.tetris.currentStep,
  gameReport: state.game.gameReport,
  nextPiece: state.game.nextPiece,
  playerName: state.tetris.playerName,
  roomGameMode: state.tetris.roomGameMode,
  roomName: state.tetris.roomName,
  score: state.game.score,
  spectrums: state.game.spectrums,
  startTimer: state.game.startTimer,
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
  gameReport,
  leaveRoom,
  nextPiece,
  playerName,
  resetRoom,
  roomGameMode,
  roomName,
  score,
  spectrums,
  startTimer,
}) => (
  <div className="game-container">
    <PlayerInfo
      playerName={playerName}
      roomName={roomName}
    />
    {currentStep === 'gameReport' ? (
      <GameReport
        currentPlayerType={currentPlayerType}
        gameReport={gameReport}
        leaveRoom={leaveRoom}
        resetRoom={resetRoom}
      />
    ) : (
      <div className="board-stats-container">
        <Board
          board={board}
          currentStep={currentStep}
          startTimer={startTimer}
        />
        <div className="stats-container">
          <Score
            score={score}
            roomGameMode={roomGameMode}
          />
          <NextPiece nextPiece={nextPiece} />
          <Spectrum
            playerName={playerName}
            spectrums={spectrums}
          />
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
  ...NextPiecePropTypes,
  ...PlayerInfoPropTypes,
  ...ScorePropTypes,
  ...SpectrumPropTypes,
};
Game.propTypes = propTypes;

export const defaultProps = {
  ...BoardDefaultProps,
  ...GameReportDefaultProps,
  ...NextPieceDefaultProps,
  ...PlayerInfoDefaultProps,
  ...ScoreDefaultProps,
  ...SpectrumDefaultProps,
};
Game.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
