import {
  takeEvery, put, select,
} from 'redux-saga/effects';

import { getBoardData } from './selectors';
import { BOX_ACTION, SET_BOARD_DATA } from './reducer';

import { createLevelBoxes } from './levelUtils';

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

    const boxes = createLevelBoxes(selectedBox, 78);

    board = board.map(r => r.map(c => boxes
      .find(b => b.rowIndex === c.rowIndex && b.colIndex === c.colIndex) || c));

    yield put({ type: SET_BOARD_DATA, payload: { board } });
  } catch (e) {
    console.error(e.message);
  }
}

export default function* boardSagas() {
  yield takeEvery(BOX_ACTION, boxActionSaga);
}
