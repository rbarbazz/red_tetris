import React from 'react';
import PropTypes from 'prop-types';

import GenericButton from './GenericButton';
import * as lobbyActions from '../actions/lobby';
import { playerType } from '../../common/enums';


const GameReport = ({
  currentPlayerType,
  gameReport,
  resetRoom,
  leaveRoom,
}) => {
  gameReport.unshift({
    name: 'Name',
    score: {
      lines: 'Lines',
      lvl: 'Level',
      pts: 'Score',
    },
  });

  return (
    <div className="game-report-container">
      <div className="final-scores-container">
        {gameReport.map((player, index) => (
          <div
            className="player-score-container list-item"
            key={`player-score${index.toString()}`}
          >
            <div className="player-score-name">{player.name}</div>
            <div className="player-score-pts">{player.score.pts}</div>
            <div className="player-score-lines">{player.score.lines}</div>
            <div className="player-score-lvl">{player.score.lvl}</div>
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
  gameReport: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.shape({
      lines: PropTypes.number,
      lvl: PropTypes.number,
      pts: PropTypes.number,
    }),
  })),
  leaveRoom: PropTypes.func,
  resetRoom: PropTypes.func,
};
GameReport.propTypes = propTypes;

export const defaultProps = {
  currentPlayerType: playerType.NONE,
  gameReport: {
    name: '',
    score: {
      lvl: 1,
      lines: 0,
      pts: 0,
    },
  },
  leaveRoom: lobbyActions.leaveRoom,
  resetRoom: lobbyActions.leaveRoom,
};
GameReport.defaultProps = defaultProps;

export default GameReport;
