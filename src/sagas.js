import { all } from 'redux-saga/effects';
import globalSagas from './containers/App/sagas';

export default function* rootSaga() {
  yield all([
    globalSagas(),
  ]);
}
