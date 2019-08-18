import React from 'react';
import PropTypes from 'prop-types';


const Block = ({ color }) => (
  <div className={`block ${color}`} />
);

Block.propTypes = {
  color: PropTypes.string,
};
Block.defaultProps = {
  color: 'white',
};

export default Block;
