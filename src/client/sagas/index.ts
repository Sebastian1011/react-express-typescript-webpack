import { all, fork } from 'redux-saga/effects';
import todoTasks from './todoTasks';

export default function* sagas() {
    yield all([fork(todoTasks)]);
}
