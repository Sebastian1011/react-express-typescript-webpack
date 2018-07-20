import Api from '../api';
const todoUrl = '/api/todo';

export const queryTodoList = () => {
    return Api.get(todoUrl);
};
