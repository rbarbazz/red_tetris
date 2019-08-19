import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';


const Spectrum = ({ spectrums }) => (
  <div className="spectrums-container">
    {spectrums.map((spectrum, spectrumIndex) => (
      <div
        className="spectrum-container"
        key={`spectrum-${spectrumIndex.toString()}`}
      >
        {spectrum.map((num, blockIndex) => (
          <Block
            color={num > 0 ? 'red' : 'white'}
            key={`spectrum-${spectrumIndex.toString()}-block-${blockIndex.toString()}`}
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
