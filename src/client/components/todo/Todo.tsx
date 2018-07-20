import React, { Component } from 'react';
import './todo.scss';
import { Todo } from '../../model/todo';

interface TodoProps {
    onDel?: (id: number) => void;
    active: boolean;
    todo: Todo;
}

class TodoComponent extends Component<TodoProps, any> {
    constructor(props: TodoProps) {
        super(props);
    }

    static defaultProps = {
        active: false
    };

    render() {
        const todo: Todo = this.props.todo;
        return <div>{todo.name}</div>;
    }
}

export default TodoComponent;
