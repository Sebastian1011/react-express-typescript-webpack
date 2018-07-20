import React, { SFC } from 'react';
// import Header from 'components/Header/index';

interface NotFoundProps {
    path?: string;
}

const NotFound: SFC<NotFoundProps> = (props) => <div>{props.path || '' + 'Not Found!'}</div>;
