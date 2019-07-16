import Constants from '../App/constants';
import Box from './Box';


export const checkAndReplace = (box1, box2) => {
  if (box1 !== null && box2 !== null
    && box1.rowIndex === box2.rowIndex && box1.colIndex === box2.colIndex) {
    return box2;
  }
  return false;
};

export const calculateBox = (box, direction, directionStep) => {
  switch (direction) {
    case Constants.DIRECTIONS.N:
      if (box.rowIndex - directionStep >= 0) {
        return new Box(box.rowIndex - directionStep, box.colIndex);
      }
      break;
    case Constants.DIRECTIONS.S:
      if (box.rowIndex + directionStep <= Constants.NO_ROWS - 1) {
        return new Box(box.rowIndex + directionStep, box.colIndex);
      }
      break;
    case Constants.DIRECTIONS.W:
      if (box.colIndex - directionStep >= 0) {
        return new Box(box.rowIndex, box.colIndex - directionStep);
      }
      break;
    case Constants.DIRECTIONS.E:
      if (box.colIndex + directionStep <= Constants.NO_COLS - 1) {
        return new Box(box.rowIndex, box.colIndex + directionStep);
      }
      break;
    case Constants.DIRECTIONS.NW:
      if (box.rowIndex - directionStep >= 0 && box.colIndex - directionStep >= 0) {
        return new Box(box.rowIndex - directionStep, box.colIndex - directionStep);
      }
      break;
    case Constants.DIRECTIONS.NE:
      if (box.rowIndex - directionStep >= 0
        && box.colIndex + directionStep <= Constants.NO_COLS - 1) {
        return new Box(box.rowIndex - directionStep, box.colIndex + directionStep);
      }
      break;
    case Constants.DIRECTIONS.SW:
      if (box.rowIndex + directionStep <= Constants.NO_ROWS - 1
        && box.colIndex - directionStep >= 0) {
        return new Box(box.rowIndex + directionStep, box.colIndex - directionStep);
      }
      break;
    case Constants.DIRECTIONS.SE:
      if (box.rowIndex + directionStep <= Constants.NO_ROWS - 1
        && box.colIndex + directionStep <= Constants.NO_COLS - 1) {
        return new Box(box.rowIndex + directionStep, box.colIndex + directionStep);
      }
      break;
    default:
      break;
  }
  return null;
};
