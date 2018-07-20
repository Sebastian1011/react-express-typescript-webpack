import { BaseResponse } from './base';

export interface Todo {
    id: number;
    name: string;
}

export interface TodoResponse extends BaseResponse {
    todo_list: Todo[];
}
