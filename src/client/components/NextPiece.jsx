import React from 'react';
import PropTypes from 'prop-types';


const NextPiece = ({ nextPiece }) => (
  <div className="next-piece-container">
    <div className="next-piece-display">
      {nextPiece}
    </div>
  </div>
);

export const propTypes = {
  nextPiece: PropTypes.string,
};
NextPiece.propTypes = propTypes;

export const defaultProps = {
  nextPiece: '0',
};
NextPiece.defaultProps = defaultProps;

export default NextPiece;
