import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import TodoList from './todoList';
import NotFound from './NotFound';

export class AppLayout extends Component<any, any> {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/todo" component={TodoList} />
                    <Redirect to="/todo" />
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {};
}

export default connect(mapStateToProps)(AppLayout);
