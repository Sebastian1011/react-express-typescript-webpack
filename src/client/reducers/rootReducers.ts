import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todoReducer from './todoReducer';
// import ApiReducer from 'api/reducer';
// import ModalsLayoutReducer from 'containers/ModalsLayout/reducer';

export default combineReducers({
    routing: routerReducer,
    todo: todoReducer
});
