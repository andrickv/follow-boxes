export default {
  NO_ROWS: parseInt(process.env.NO_ROWS, 10),
  NO_COLS: parseInt(process.env.NO_COLS, 10),
  START_LEVEL: parseInt(process.env.START_LEVEL, 10),
  DIRECTIONS: {
    N: 'N',
    S: 'S',
    E: 'E',
    W: 'W',
    NE: 'NE',
    NW: 'NW',
    SE: 'SE',
    SW: 'SW',
  },
};
