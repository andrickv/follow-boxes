import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import defaultReducers from './reducers';
import rootSagas from './sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = applyMiddleware(sagaMiddleware);

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
  /* eslint-enable */

  const store = createStore(
    combineReducers(defaultReducers),
    composeEnhancers(enhancers),
  );

  sagaMiddleware.run(rootSagas);

  return store;
}
