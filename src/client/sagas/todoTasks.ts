import { call, put, fork, select, takeLatest, take } from 'redux-saga/effects';
import { ActionTypes, getTodoListSuccess, getTodoList } from '../actions/todoAction';
import { queryTodoList, addTodoList, delTodo, updateTodo } from '../services/todoService';
import { TodoResponse, AddTodoRequest } from '../model/todo';
import { AnyAction } from 'redux';
import { BaseResponse } from '../model/base';

function* getTodoTask() {
    try {
        const res: TodoResponse = yield queryTodoList();
        yield put(getTodoListSuccess(res));
    } catch (e) {
        console.error(e);
    }
}

function* addTodoTask(action: AnyAction) {
    try {
        const res: BaseResponse = yield addTodoList({ name: action.payload });
        if (res.rtn === 0) {
            yield put(getTodoList());
        }
    } catch (e) {
        console.error(e);
    }
}

function* delTodoTask(action: AnyAction) {
    try {
        const res: BaseResponse = yield delTodo({ id: action.payload });
        if (res.rtn === 0) {
            yield put(getTodoList());
        }
    } catch (e) {
        console.error(e);
    }
}

function* updateTodoTask(action: AnyAction) {
    try {
        const res: BaseResponse = yield updateTodo(action.payload);
        if (res.rtn === 0) {
            yield put(getTodoList());
        }
    } catch (e) {
        console.error(e);
    }
}

export default function*() {
    yield takeLatest(ActionTypes.GET_TODO_LIST, getTodoTask);
    yield takeLatest(ActionTypes.ADD_TODO, addTodoTask);
    yield takeLatest(ActionTypes.DELETE_TODO, delTodoTask);
    yield takeLatest(ActionTypes.UPDATE_TODO, updateTodoTask);
}
