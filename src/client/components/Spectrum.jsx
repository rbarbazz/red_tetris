import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Block } from './Board';

const mapStateToProps = state => ({
  spectrums: state.tetris.spectrums,
});

export const Spectrum = ({ spectrums }) => (
  <div className="spectrums-container">
    {spectrums.map((spectrum, spectrumIndex) => (
      <div
        key={`block${spectrumIndex.toString()}`}
        className="spectrum-container"
      >
        {spectrum.map((num, blockIndex) => (
          <Block
            key={`block${blockIndex.toString()}`}
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

export default connect(mapStateToProps, null)(Spectrum);
