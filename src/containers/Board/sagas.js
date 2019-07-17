import {
  takeEvery, put, select,
} from 'redux-saga/effects';

import { getBoardData } from './selectors';
import { BOX_ACTION, SET_BOARD_DATA } from './reducer';

import Constants from '../App/constants';

import { calculateBox } from './boxUtils';

const getRandomDirection = () => {
  const rd = Math.floor(Math.random() * 8);
  return Object.keys(Constants.DIRECTIONS)[rd];
};

const generateNextBox = (box, boxes) => {
  const triedDirection = [];
  let newBox;
  do {
    if (triedDirection.length === 8) return undefined;
    let randomDirection;
    do {
      // TODO optimize random function to calculate between rest options
      randomDirection = getRandomDirection();
    } while (triedDirection.find(direction => direction === randomDirection) !== undefined);
    triedDirection.push(randomDirection);

    newBox = calculateBox(boxes.length === 0 ? box : boxes[boxes.length - 1],
      randomDirection, randomDirection.length === 1 ? 3 : 2);
  } while (newBox === null
  || (newBox.rowIndex === box.rowIndex
    && newBox.colIndex === box.colIndex)
    || boxes
      .find(ab => newBox.rowIndex === ab.rowIndex && newBox.colIndex === ab.colIndex)
    !== undefined);

  return newBox;
};

const makelevel = (box, level) => {
  const boxes = [];
  let i = 0;
  while (i < level) {
    const newBox = generateNextBox(box, boxes);
    if (newBox === undefined) {
      return undefined;
    } boxes.push(newBox.setStatus('predict'));
    i++;
  }

  return boxes;
};

function* boxActionSaga(action) {
  try {
    let board = yield select(getBoardData);
    let selectedBox;
    board = board.map((r, ri) => r.map((c, ci) => {
      if (ri === action.payload.box.rowIndex && ci === action.payload.box.colIndex) {
        selectedBox = c.setStatus('active');
        return selectedBox;
      }
      return c.setStatus('none');
    }));

    let boxes;
    do {
      boxes = makelevel(selectedBox, 78);
    } while (boxes === undefined);

    board = board.map(r => r.map(c => boxes
      .find(b => b.rowIndex === c.rowIndex && b.colIndex === c.colIndex) || c));

    yield put({ type: SET_BOARD_DATA, payload: { board } });
  } catch (e) {
    console.log(e);
  }
}

export default function* boardSagas() {
  yield takeEvery(BOX_ACTION, boxActionSaga);
}
