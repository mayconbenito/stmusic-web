import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './ducks';
import sagas from './sagas';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

sagaMiddleware.run(sagas);

export default store;
