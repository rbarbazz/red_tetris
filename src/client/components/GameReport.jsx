import React from 'react';
import PropTypes from 'prop-types';

import GenericButton from './GenericButton';
import * as lobbyActions from '../actions/lobby';
import { playerType } from '../../common/enums';

const finalScores = [{
  name: 'raph',
  lines: 32,
  lvl: 12,
  pts: 3200,
}];

const GameReport = ({ currentPlayerType, resetRoom, leaveRoom }) => {
  finalScores.unshift({
    name: 'Name',
    lines: 'Lines',
    lvl: 'Level',
    pts: 'Score',
  });

  return (
    <div className="game-report-container">
      <div className="final-scores-container">
        {finalScores.map(player => (
          <div className="player-score-container list-item">
            <div className="player-score-name">{player.name}</div>
            <div className="player-score-pts">{player.pts}</div>
            <div className="player-score-lines">{player.lines}</div>
            <div className="player-score-lvl">{player.lvl}</div>
          </div>
        ))}
      </div>
      <div className="button-container">
        <GenericButton
          action={leaveRoom}
          contentText="Leave"
        />
        {currentPlayerType === playerType.MASTER && (
          <GenericButton
            action={resetRoom}
            contentText="Restart"
          />
        )}
      </div>
    </div>
  );
};

export const propTypes = {
  currentPlayerType: PropTypes.string,
  leaveRoom: PropTypes.func,
  resetRoom: PropTypes.func,
};
GameReport.propTypes = propTypes;

export const defaultProps = {
  currentPlayerType: playerType.NONE,
  leaveRoom: lobbyActions.leaveRoom,
  resetRoom: lobbyActions.leaveRoom,
};
GameReport.defaultProps = defaultProps;

export default GameReport;
