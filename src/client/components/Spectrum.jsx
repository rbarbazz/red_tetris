import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';


const Spectrum = ({ spectrums, playerName }) => (
  <div className="spectrums-container">
    {spectrums.map((spectrum, spectrumIndex) => (
      spectrum.name !== playerName ? (
        <div
          className="spectrum-wrapper"
          key={`spectrum-${spectrumIndex.toString()}`}
        >
          <div className="spectrum-player-name">{spectrum.name}</div>
          <div className="spectrum-container">
            {spectrum.board.map((line, indexLine) => (
              line.map((num, indexBlock) => (
                <Block
                  color={num > 0 ? 'red' : 'white'}
                  key={`spectrum${spectrumIndex.toString()}-block${indexLine.toString()}${indexBlock.toString()}`}
                />
              ))
            ))}
          </div>
        </div>
      ) : (
        null
      )
    ))}
  </div>
);

export const propTypes = {
  playerName: PropTypes.string,
  spectrums: PropTypes.arrayOf(
    PropTypes.shape({
      board: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number),
      ),
    }),
  ),
};
Spectrum.propTypes = propTypes;

export const defaultProps = {
  playerName: '',
  spectrums: [],
};
Spectrum.defaultProps = defaultProps;

export default Spectrum;
