/*
  Test if a piece can be translate

  field: 2D array of the field
  shape: shape of a piece
  to: [x, y] destination position

  Return the new position if possible, else null
*/
export function tryTranslate(field, shape, to) {
  // Top left to bottom right
  for (let y = 0; y < shape.length; ++y) {
    const yPos = to[1] - y;
    for (let x = 0; x < shape.length; ++x) {
      const xPos = to[0] + x;
      // Tile to test
      if (shape[y][x] === '1') {
        // First check bound, then free slot
        if (!(xPos >= 0 && xPos < field.size.width)) return null;
        if (!(yPos >= 0 && yPos < field.size.height)) return null;
        if (field.field[yPos][xPos] !== 0) return null;
      }
    }
  }
  return to;
}

/*
  Test if a piece can be rotate

  field: Field instance
  tetros: Piece istance
  to: rotation asked

  Return the new position and rotation if possible, else null
*/
export function tryRotate(field, tetros, toOr) {
  const shape = tetros.shapes[toOr];
  let { kicks } = tetros;
  // If no kicks for this tetros
  if (kicks === null) return null;
  kicks = kicks[tetros.orientation][toOr];
  for (const kick of kicks) {
    const to = [field.pos[0] + kick[0], field.pos[1] + kick[1]];
    const r = tryTranslate(field, shape, to);
    if (r !== null) return { pos: r, orientation: toOr };
  }
  return null;
}
