import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Todo } from '../../model/todo';
import { getTodoList } from './../../actions/todoAction';
import { AnyAction } from 'redux';

interface TodoListProps {
    todo_list: Todo[];
    getTodoList: () => AnyAction;
}

interface TodoListState {
    selected: number;
}

class TodoList extends Component<TodoListProps, TodoListState> {
    constructor(props: TodoListProps) {
        super(props);
        this.state = {
            selected: -1
        };
    }

    componentDidMount() {
        this.props.getTodoList();
    }

    render() {
        const { children } = this.props;
        return <div>{this.props.todo_list.map((todo: Todo) => <span>{todo.name}</span>)}</div>;
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        todo_list: state.todo.todo_list,
        ...ownProps
    };
}

export default connect(
    mapStateToProps,
    {
        getTodoList
    }
)(TodoList);
