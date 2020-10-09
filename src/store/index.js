import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from './ducks';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  applyMiddleware(sagaMiddleware),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__
    ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
    : []),
];

const store = createStore(createRootReducer(), compose(...middleware));

sagaMiddleware.run(sagas);

export default store;
