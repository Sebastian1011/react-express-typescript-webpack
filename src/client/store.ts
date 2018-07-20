import { createStore, applyMiddleware, Middleware } from 'redux';
import history from './history';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers/rootReducers';
import reduxActionsLogger from './logger';

const initialState = {};
const middlewares: Middleware[] = [thunk];

// dev debug
if (module.hot) {
    middlewares.push(reduxActionsLogger);
}

export default createStore(reducers, initialState, applyMiddleware(...middlewares, routerMiddleware(history)));
