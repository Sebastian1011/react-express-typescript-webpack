import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import Router from './router';
// import muiTheme from './muiTheme';

class App extends Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider locale="en">
                    <Router />
                </IntlProvider>
            </Provider>
        );
    }
}

export default hot(module)(App);
