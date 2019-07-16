import { all } from 'redux-saga/effects';
import globalSagas from './containers/App/sagas';
import boardSagas from './containers/Board/sagas';

export default function* rootSaga() {
  yield all([
    globalSagas(),
    boardSagas(),
  ]);
}
