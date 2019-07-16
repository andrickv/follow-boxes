import {
  takeEvery, put, select,
} from 'redux-saga/effects';

import { getBoardData } from './selectors';
import { BOX_ACTION, SET_BOARD_DATA } from './reducer';

import Constants from '../App/constants';

import { checkAndMerge, calculateBox } from './boxUtils';

function* boxActionSaga(action) {
  try {
    let board = yield select(getBoardData);
    let selectedBox;

    board = board.map((r, ri) => r.map((c, ci) => {
      if (ri === action.payload.box.rowIndex && ci === action.payload.box.colIndex) {
        selectedBox = { ...c, status: 'active' };
        return selectedBox;
      }
      return { ...c, status: 'none' };
    }));

    const northBox = calculateBox(selectedBox, Constants.DIRECTIONS.N, 3);
    const southBox = calculateBox(selectedBox, Constants.DIRECTIONS.S, 3);
    const westBox = calculateBox(selectedBox, Constants.DIRECTIONS.W, 3);
    const eastBox = calculateBox(selectedBox, Constants.DIRECTIONS.E, 3);
    const nwb = calculateBox(selectedBox, Constants.DIRECTIONS.NW, 2);
    const neb = calculateBox(selectedBox, Constants.DIRECTIONS.NE, 2);
    const swb = calculateBox(selectedBox, Constants.DIRECTIONS.SW, 2);
    const seb = calculateBox(selectedBox, Constants.DIRECTIONS.SE, 2);

    board = board.map(r => r.map(c => checkAndMerge(c, northBox)
      || checkAndMerge(c, southBox)
      || checkAndMerge(c, westBox)
      || checkAndMerge(c, eastBox)
      || checkAndMerge(c, nwb)
      || checkAndMerge(c, neb)
      || checkAndMerge(c, swb)
      || checkAndMerge(c, seb)
      || c));

    yield put({ type: SET_BOARD_DATA, payload: { board } });
  } catch (e) {
    // console.log(e);
  }
}

export default function* boardSagas() {
  yield takeEvery(BOX_ACTION, boxActionSaga);
}
