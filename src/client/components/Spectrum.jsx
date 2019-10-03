/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';
import * as gameActions from '../actions/game';
import { playerType } from '../../common/enums';


const Spectrum = ({
  currentPlayerType,
  lookingAt,
  selectPlayerToSpectate,
  spectrums,
  playerName,
}) => {
  let style = {};

  if (currentPlayerType === playerType.SPECTATOR) style = { cursor: 'pointer' };

  return (
    <div className="spectrums-container">
      {spectrums.map((spectrum, spectrumIndex) => (
        spectrum.name !== playerName ? (
          <div
            className="spectrum-wrapper"
            key={`spectrum-${spectrumIndex.toString()}`}
            onClick={() => {
              if (currentPlayerType === playerType.SPECTATOR) selectPlayerToSpectate(spectrum.name);
            }}
            style={spectrum.name === lookingAt ? { ...style, borderColor: '#eb4d4b' } : style}
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
};

export const propTypes = {
  currentPlayerType: PropTypes.string,
  lookingAt: PropTypes.string,
  playerName: PropTypes.string,
  selectPlayerToSpectate: PropTypes.func,
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
  currentPlayerType: playerType.NONE,
  lookingAt: '',
  playerName: '',
  selectPlayerToSpectate: gameActions.selectPlayerToSpectate,
  spectrums: [],
};
Spectrum.defaultProps = defaultProps;

export default Spectrum;
