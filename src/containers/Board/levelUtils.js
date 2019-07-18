
import Constants from '../App/constants';

import { calculateBox } from './boxUtils';

export const getRandomDirection = () => {
  const directionKeys = Object.keys(Constants.DIRECTIONS);
  return directionKeys[Math.floor(Math.random() * directionKeys.length)];
};

export const tryToMakeNextBox = (box, boxes) => {
  const triedDirections = [];
  let newBox;
  do {
    if (triedDirections.length === Object.keys(Object.keys(Constants.DIRECTIONS)).length) {
      return undefined;
    }
    let randomDirection;
    do {
      // TODO optimize random function to calculate between rest options
      randomDirection = getRandomDirection();
    } while (
      triedDirections.find(triedDirection => triedDirection === randomDirection) !== undefined);
    triedDirections.push(randomDirection);

    newBox = calculateBox(boxes.length === 0 ? box : boxes[boxes.length - 1],
      randomDirection, Constants.DIRECTIONS_STEP[randomDirection]);
  } while (newBox === null
    || (newBox.rowIndex === box.rowIndex
        && newBox.colIndex === box.colIndex)
        || boxes
          .find(b => newBox.rowIndex === b.rowIndex && newBox.colIndex === b.colIndex)
        !== undefined);

  return newBox;
};

export const tryToMakeLevelBoxes = (startBox, level) => {
  const levelBoxes = [];
  let i = 0;
  while (i < level) {
    const nextBox = tryToMakeNextBox(startBox, levelBoxes);
    if (nextBox === undefined) {
      return undefined;
    }
    levelBoxes.push(nextBox);
    i++;
  }

  return levelBoxes;
};

export const createLevelBoxes = (fromBox, level) => {
  let boxes;
  do {
    boxes = tryToMakeLevelBoxes(fromBox, level);
  } while (boxes === undefined);
  return boxes;
};
