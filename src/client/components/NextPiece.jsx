import React from 'react';
import PropTypes from 'prop-types';
import { TETROS_SHAPE } from '../../common/enums';

import Block from './Block';


const colors = {
  O: 'cyan',
  I: 'yellow',
  T: 'purple',
  L: 'green',
  J: 'red',
  Z: 'blue',
  S: 'orange',
};

const NextPiece = ({ nextPiece }) => {
  if (nextPiece !== 'X') {
    const pieceLength = TETROS_SHAPE[nextPiece][0][0].length;

    return (
      <div className="next-piece-container">
        <div
          className="next-piece-display"
          style={{ width: pieceLength * 30, height: 2 * 30 }}
        >
          {TETROS_SHAPE[nextPiece][0].slice(0, 2).map((line, indexLine) => (
            [...line].map((col, indexBlock) => (
              <Block
                key={`next-piece-block-${indexLine.toString()}${indexBlock.toString()}`}
                color={col === '0' ? 'dark' : colors[nextPiece]}
              />
            ))
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const propTypes = {
  nextPiece: PropTypes.string,
};
NextPiece.propTypes = propTypes;

export const defaultProps = {
  nextPiece: 'X',
};
NextPiece.defaultProps = defaultProps;

export default NextPiece;
