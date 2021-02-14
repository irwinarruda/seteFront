import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Menu from '../pages/_layouts/menu';

function RouteWrapper({ component: Component, isPrivate = false, ...rest }) {
    const logged = false;

    if (!logged && isPrivate) {
        return <Redirect to="/" />;
    }
    if (logged && !isPrivate) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Route
            {...rest}
            render={(props) => (
                <Menu>
                    <Component {...props} />
                </Menu>
            )}
        />
    );
}

export default RouteWrapper;
