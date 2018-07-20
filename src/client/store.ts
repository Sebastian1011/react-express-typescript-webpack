import { createStore, applyMiddleware, Middleware } from 'redux';
import history from './history';
import { routerMiddleware } from 'react-router-redux';
import sagas from './sagas';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers/rootReducers';
import reduxActionsLogger from './logger';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware, routerMiddleware(history)];

// dev debug
if (module.hot) {
    middlewares.push(reduxActionsLogger);
}

const store = createStore(reducers, initialState, applyMiddleware(...middlewares));
sagaMiddleware.run(sagas);

export default store;
