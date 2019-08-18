import React from 'react';
import PropTypes from 'prop-types';


const Score = ({ score }) => (
  <div className="score-container">
    <div className="score-display">
      <div className="score-label">SCORE</div>
      <div className="score-label">{String(score).padStart(6, '0')}</div>
    </div>
  </div>
);

Score.propTypes = {
  score: PropTypes.number,
};
Score.defaultProps = {
  score: 0,
};

export default Score;
