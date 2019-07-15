/* eslint-disable no-console */
import {
  takeEvery, put,
} from 'redux-saga/effects';

import {
  INIT, INIT_DONE,
} from './reducer';

function* initSagaAction() {
  try {
    yield put({ type: INIT_DONE });
  } catch (e) {
    console.log(e);
  }
}

export default function* appSaga() {
  yield takeEvery(INIT, initSagaAction);
}
