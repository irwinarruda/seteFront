import React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
    RouteComponentProps,
} from 'react-router-dom';
import { AuthContext } from '../hooks/AuthContex';
import Menu from '../pages/_layouts/menu';
import Sign from '../pages/_layouts/sign';

interface Props extends RouteProps {
    isPrivate?: boolean;
    component: React.ComponentType<RouteComponentProps>;
}

const RouteWrapper: React.FC<Props> = ({
    component: Component,
    isPrivate = false,
    ...rest
}) => {
    const { logged } = React.useContext(AuthContext);

    if (!logged && isPrivate) {
        return <Redirect to="/" />;
    }
    if (logged && !isPrivate) {
        return <Redirect to="/dashboard" />;
    }

    const LayoutComponent = isPrivate ? Menu : Sign;

    return (
        <Route
            {...rest}
            render={(props) => (
                <LayoutComponent>
                    <Component {...props} />
                </LayoutComponent>
            )}
        />
    );
};

export default RouteWrapper;
