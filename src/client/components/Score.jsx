import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  roomName: state.tetris.roomName,
  playerName: state.tetris.playerName,
  score: state.tetris.score,
});

export const Score = ({ roomName, playerName, score }) => (
  <div className="score-container">
    <div className="player-base-info">
      <div className="player-base-info-label">{playerName}</div>
      <div className="player-base-info-label">@</div>
      <div className="player-base-info-label">{roomName}</div>
    </div>
    <div className="score-display">
      <div className="score-label">SCORE</div>
      <div className="score-label">{String(score).padStart(6, '0')}</div>
    </div>
  </div>
);

Score.propTypes = {
  roomName: PropTypes.string,
  playerName: PropTypes.string,
  score: PropTypes.number,
};
Score.defaultProps = {
  roomName: '',
  playerName: '',
  score: 0,
};

export default connect(mapStateToProps, null)(Score);
