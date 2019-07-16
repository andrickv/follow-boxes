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

const makelevel = (box, level) => {
  const boxes = [];
  let i = 0;
  while (i < level) {
    let b;
    do {
      const rd = getRandomDirection();
      b = calculateBox(boxes.length === 0 ? box : boxes[boxes.length - 1],
        rd, rd.length === 1 ? 3 : 2);
    } while (b === null
    || (b.rowIndex === box.rowIndex
      && b.colIndex === box.colIndex)
      // eslint-disable-next-line no-loop-func
      || boxes.find(ab => b.rowIndex === ab.rowIndex && b.colIndex === ab.colIndex)

    );
    boxes.push(b.setStatus('predict'));
    // eslint-disable-next-line no-plusplus
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


    // const northBox = calculateBox(selectedBox, Constants.DIRECTIONS.N, 3);
    // if (northBox) northBox.setStatus('predict');
    // const southBox = calculateBox(selectedBox, Constants.DIRECTIONS.S, 3);
    // const westBox = calculateBox(selectedBox, Constants.DIRECTIONS.W, 3);
    // const eastBox = calculateBox(selectedBox, Constants.DIRECTIONS.E, 3);
    // const nwb = calculateBox(selectedBox, Constants.DIRECTIONS.NW, 2);
    // const neb = calculateBox(selectedBox, Constants.DIRECTIONS.NE, 2);
    // const swb = calculateBox(selectedBox, Constants.DIRECTIONS.SW, 2);
    // const seb = calculateBox(selectedBox, Constants.DIRECTIONS.SE, 2);

    // board = board.map(r => r.map(c =>
    // checkAndReplace(c, northBox)
    // || checkAndReplace(c, southBox)
    // || checkAndReplace(c, westBox)
    // || checkAndReplace(c, eastBox)
    // || checkAndReplace(c, nwb)
    // || checkAndReplace(c, neb)
    // || checkAndReplace(c, swb)
    // || checkAndReplace(c, seb)
    // || c));

    const boxes = makelevel(selectedBox, 10);

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
