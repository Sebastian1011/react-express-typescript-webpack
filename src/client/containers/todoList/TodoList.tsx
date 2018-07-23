import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Todo } from '../../model/todo';
import { getTodoList, addTodoList, updateTodoList, delTodoList } from './../../actions/todoAction';
import { AnyAction } from 'redux';
import TodoComponent from '../../components/todo';
import { Input, message } from 'antd';
import './todoList.scss';

const Search = Input.Search;

interface TodoListProps {
    todo_list: Todo[];
    getTodoList: () => AnyAction;
    addTodoList: (name: string) => AnyAction;
    updateTodoList: (todo: Todo) => AnyAction;
    delTodoList: (id: number) => AnyAction;
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

    deleteTodo = (id: number): void => {
        this.props.delTodoList(id);
    };
    addTodo = (name: string): void => {
        if (!name || name.length === 0) {
            message.error('not null!');
        } else {
            this.props.addTodoList(name);
        }
    };

    render() {
        const { selected } = this.state;
        return (
            <div className="todo-list-container">
                <div className="todo-list">
                    <Search placeholder="input new todo" enterButton="确定" size="large" onSearch={this.addTodo} />
                    {this.props.todo_list.map((todo: Todo) => (
                        <TodoComponent
                            key={todo.id}
                            todo={todo}
                            active={todo.id === selected}
                            onDel={this.deleteTodo}
                        />
                    ))}
                </div>
            </div>
        );
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
        getTodoList,
        addTodoList,
        updateTodoList,
        delTodoList
    }
)(TodoList);
