import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from './ducks';
import sagas from './sagas';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  applyMiddleware(sagaMiddleware, routerMiddleware(history)),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__
    ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
    : []),
];

const store = createStore(createRootReducer(history), compose(...middleware));

sagaMiddleware.run(sagas);

export default store;
