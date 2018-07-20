import update from 'immutability-helper';
import { ActionTypes } from '../actions/todoAction';
import { Todo } from '../model/todo';
import { AnyAction } from 'redux';
interface TodoState {
    todo_list: Todo[];
}

const initState: TodoState = {
    todo_list: []
};

export default function todoReducer(state = initState, action: AnyAction) {
    switch (action.type) {
        case ActionTypes.GET_TODO_LIST_SUCCESS:
            const todo_list: Todo[] = action.payload.todo_list;
            return update(state, { todo_list: { $set: todo_list } });
        default:
            return state;
    }
}
