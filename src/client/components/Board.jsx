import React from 'react';
import _ from 'lodash';

export const colorArray = [
  'green',
];

export const Board = () => (
  <div className="board-container">
    <Tetrimino color={_.sample(colorArray)} />
  </div>
);

export const Tetrimino = (props) => {
  const { color } = props;
  return (
    <div className={`tetrimino ${color}`}>
      <div className="sub-block" />
      <div className="sub-block" />
      <div className="sub-block" />
      <div className="sub-block" />
    </div>
  );
};
