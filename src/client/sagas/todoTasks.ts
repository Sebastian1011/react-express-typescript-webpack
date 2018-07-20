import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { ActionTypes, getTodoListSuccess } from '../actions/todoAction';
import { queryTodoList } from '../services/todoService';
import { TodoResponse } from '../model/todo';

function* getTodoList() {
    try {
        const res: TodoResponse = yield queryTodoList();
        yield put(getTodoListSuccess(res));
    } catch (e) {
        console.error(e);
    }
}

export default function*() {
    yield takeLatest(ActionTypes.GET_TODO_LIST, getTodoList);
}
