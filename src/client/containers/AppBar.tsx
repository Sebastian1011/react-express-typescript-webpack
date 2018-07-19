import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AppBar extends Component<any, any> {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        const { children } = this.props;
        return (
            <div>this is tool bar</div>
        );
    }
}
