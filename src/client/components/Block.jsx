import React from 'react';
import PropTypes from 'prop-types';


const Block = ({
  color,
  isOnLeftSide,
  isOnRightSide,
  shadowPiece,
}) => {
  let style = {};
  // if (isOnLeftSide) style = { ...style, borderLeftWidth: 0 };
  // if (isOnRightSide) style = { ...style, borderRightWidth: 0 };

  return (
    <div
      className={shadowPiece ? `block ${color} shadow-color` : `block ${color}`}
      style={style}
    >
      <div className="inner-block" />
    </div>
  );
};

Block.propTypes = {
  color: PropTypes.string,
  isOnLeftSide: PropTypes.bool,
  isOnRightSide: PropTypes.bool,
  shadowPiece: PropTypes.bool,
};
Block.defaultProps = {
  color: 'white',
  isOnLeftSide: false,
  isOnRightSide: false,
  shadowPiece: false,
};

export default Block;
