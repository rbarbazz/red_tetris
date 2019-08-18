import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';


const Spectrum = ({ spectrums }) => (
  <div className="spectrums-container">
    {spectrums.map((spectrum, spectrumIndex) => (
      <div
        key={`spectrum-${spectrumIndex.toString()}`}
        className="spectrum-container"
      >
        {spectrum.map((num, blockIndex) => (
          <Block
            key={`spectrum-${spectrumIndex.toString()}-block-${blockIndex.toString()}`}
            color={num > 0 ? 'red' : 'white'}
          />
        ))}
      </div>
    ))}
  </div>
);

Spectrum.propTypes = {
  spectrums: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};
Spectrum.defaultProps = {
  spectrums: [],
};

export default Spectrum;
