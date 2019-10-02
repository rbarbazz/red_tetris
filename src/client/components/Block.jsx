import React from 'react';
import PropTypes from 'prop-types';


const Block = ({ color, shadowPiece }) => (
  <div className={shadowPiece ? `block ${color} shadow-color` : `block ${color}`}>
    <div className="inner-block" />
  </div>
);

Block.propTypes = {
  color: PropTypes.string,
  shadowPiece: PropTypes.bool,
};
Block.defaultProps = {
  color: 'white',
  shadowPiece: false,
};

export default Block;
