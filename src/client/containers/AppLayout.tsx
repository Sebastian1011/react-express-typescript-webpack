import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

export class AppLayout extends Component<any, any> {
    render() {
        return <div>this is app layout 2</div>;
    }
}

function mapStateToProps(state: any) {
    return {};
}

export default connect(mapStateToProps)(AppLayout);
