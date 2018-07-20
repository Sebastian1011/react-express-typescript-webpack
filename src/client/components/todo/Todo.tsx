import React, { Component } from 'react';
import './todo.scss';

interface TodoProps {
    del: (id: number) => void;
    active: boolean;
}

class Todo extends Component<TodoProps, any> {
    constructor(props: TodoProps) {
        super(props);
    }

    static defaultProps = {
        active: false
    };

    render() {
        return <div />;
    }
}

export default Todo;
