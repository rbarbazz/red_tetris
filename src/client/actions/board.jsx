export const MOVE_TETRIMINO = 'MOVE_TETRIMINO';
export const NEXT_BOARD = 'NEXT_BOARD';

// Send input move to the server
export const moveTetrimino = (key, event) => ({
  type: MOVE_TETRIMINO,
  payload: { key, event },
});
