import React, { Component } from 'react';
import { connect } from 'react-redux';

interface TodoListProps {}

interface TodoListState {}

class TodoList extends Component<TodoListProps, TodoListState> {
    constructor(props: TodoListProps) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return <div>this is todo list;</div>;
    }
}

function mapStateToProps(state: any) {
    return {};
}

export default connect(
    mapStateToProps,
    {}
)(TodoList);
