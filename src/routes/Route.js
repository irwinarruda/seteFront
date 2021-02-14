import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Sign from '../pages/_layouts/sign';

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
                <Sign>
                    <Component {...props} />
                </Sign>
            )}
        />
    );
}

export default RouteWrapper;
