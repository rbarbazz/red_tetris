import React from 'react';
import PropTypes from 'prop-types';


const Score = ({ score }) => (
  <div className="score-container">
    <div className="score-display">
      <div className="score-label">SCORE</div>
      <div className="score-label">{String(score.pts).padStart(6, '0')}</div>
    </div>
  </div>
);

export const propTypes = {
  score: PropTypes.shape({
    pts: PropTypes.number,
  }),
};
Score.propTypes = propTypes;

export const defaultProps = {
  score: {
    pts: 0,
  },
};
Score.defaultProps = defaultProps;

export default Score;
