import { AnyAction } from 'redux';
import { Todo, TodoResponse } from '../model/todo';

export enum ActionTypes {
    GET_TODO_LIST = 'GET_TODO_LIST',
    GET_TODO_LIST_SUCCESS = 'GET_TODO_LIST_SUCCESS',
    ADD_TODO = 'ADD_TODO',
    UPDATE_TODO = 'UPDATE_TODO',
    DELETE_TODO = 'DELETE_TODO'
}

export const getTodoList = (): AnyAction => ({
    type: ActionTypes.GET_TODO_LIST
});

export const getTodoListSuccess = (payload: TodoResponse): AnyAction => ({
    type: ActionTypes.GET_TODO_LIST_SUCCESS,
    payload
});

export const addTodoList = (payload: string): AnyAction => ({
    type: ActionTypes.ADD_TODO,
    payload
});

export const updateTodoList = (payload: Todo): AnyAction => ({
    type: ActionTypes.UPDATE_TODO,
    payload
});

export const delTodoList = (payload: number): AnyAction => ({
    type: ActionTypes.DELETE_TODO,
    payload
});
