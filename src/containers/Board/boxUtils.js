import Constants from '../App/constants';


export const checkAndMerge = (box1, box2) => {
  if (box1 !== undefined && box2 !== undefined
        && box1.rowIndex === box2.rowIndex && box1.colIndex === box2.colIndex) {
    return {
      ...box1,
      ...box2,
    };
  }
  return false;
};

export const calculateBox = (box, direction, directionStep) => {
  let calculatedBox;
  switch (direction) {
    case Constants.DIRECTIONS.N:
      if (box.rowIndex - directionStep >= 0) {
        calculatedBox = {
          rowIndex: box.rowIndex - directionStep,
          colIndex: box.colIndex,
          status: 'predict',
        };
      }
      break;
    case Constants.DIRECTIONS.S:
      if (box.rowIndex + directionStep <= Constants.NO_ROWS - 1) {
        calculatedBox = {
          rowIndex: box.rowIndex + directionStep,
          colIndex: box.colIndex,
          status: 'predict',
        };
      }
      break;
    case Constants.DIRECTIONS.W:
      if (box.colIndex - directionStep >= 0) {
        calculatedBox = {
          colIndex: box.colIndex - directionStep,
          rowIndex: box.rowIndex,
          status: 'predict',
        };
      }
      break;
    case Constants.DIRECTIONS.E:
      if (box.colIndex + directionStep <= Constants.NO_COLS - 1) {
        calculatedBox = {
          colIndex: box.colIndex + directionStep,
          rowIndex: box.rowIndex,
          status: 'predict',
        };
      }
      break;
    case Constants.DIRECTIONS.NW:
      if (box.rowIndex - directionStep >= 0 && box.colIndex - directionStep >= 0) {
        calculatedBox = {
          colIndex: box.colIndex - directionStep,
          rowIndex: box.rowIndex - directionStep,
          status: 'predict',
        };
      }
      break;
    case Constants.DIRECTIONS.NE:
      if (box.rowIndex - directionStep >= 0
                && box.colIndex + directionStep <= Constants.NO_COLS - 1) {
        calculatedBox = {
          colIndex: box.colIndex + directionStep,
          rowIndex: box.rowIndex - directionStep,
          status: 'predict',
        };
      }
      break;
    case Constants.DIRECTIONS.SW:
      if (box.rowIndex + directionStep <= Constants.NO_ROWS - 1
                && box.colIndex - directionStep >= 0) {
        calculatedBox = {
          colIndex: box.colIndex - directionStep,
          rowIndex: box.rowIndex + directionStep,
          status: 'predict',
        };
      }
      break;
    case Constants.DIRECTIONS.SE:
      if (box.rowIndex + directionStep <= Constants.NO_ROWS - 1
                && box.colIndex + directionStep <= Constants.NO_COLS - 1) {
        calculatedBox = {
          colIndex: box.colIndex + directionStep,
          rowIndex: box.rowIndex + directionStep,
          status: 'predict',
        };
      }
      break;
    default:
      break;
  }
  return calculatedBox;
};
