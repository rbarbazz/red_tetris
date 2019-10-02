import React from 'react';
import PropTypes from 'prop-types';


const Score = ({ score }) => (
  <div className="score-container">
    <div className="score-display">
      <div className="score-label">SCORE</div>
      <div className="score-label">{String(score.pts)}</div>
    </div>
    <div className="score-display">
      <div className="score-label">LINES</div>
      <div className="score-label">{String(score.lines)}</div>
    </div>
    <div className="score-display">
      <div className="score-label">LEVEL</div>
      <div className="score-label">{String(score.lvl)}</div>
    </div>
  </div>
);

export const propTypes = {
  score: PropTypes.shape({
    lines: PropTypes.number,
    lvl: PropTypes.number,
    pts: PropTypes.number,
  }),
};
Score.propTypes = propTypes;

export const defaultProps = {
  score: {
    lines: 0,
    lvl: 1,
    pts: 0,
  },
};
Score.defaultProps = defaultProps;

export default Score;
