import Api from '../api';
import { AddTodoRequest, DelTodoRequest, Todo } from '../model/todo';
const todoUrl = '/api/todo';

export const queryTodoList = () => {
    return Api.get(todoUrl);
};

export const addTodoList = (data: AddTodoRequest) => {
    return Api.post(todoUrl, data);
};

export const delTodo = (data: DelTodoRequest) => {
    return Api.delete(todoUrl + `/${data.id}`, data);
};

export const updateTodo = (data: Todo) => {
    return Api.delete(todoUrl + `/${data.id}`, data);
};
