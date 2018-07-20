import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import { ConnectedRouter } from 'react-router-redux';

import AppLayout from './containers/AppLayout';
// import LoginForm from 'containers/LoginForm';

export default function() {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                {/* <Route path="/login" name="login" component={LoginForm} /> */}
                <Route path="/" name="home" component={AppLayout} />
            </Switch>
        </ConnectedRouter>
    );
}
