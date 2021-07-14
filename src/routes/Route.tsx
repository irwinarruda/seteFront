import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Location, LocationDescriptorObject } from 'history';
import { useAuth } from '../hooks/AuthContex';
import Menu from '../pages/_layouts/menu';
import Sign from '../pages/_layouts/sign';
import queryString from 'query-string';

interface Props extends RouteProps {
    isPrivate?: boolean;
    component: React.ComponentType<{ location: Location<unknown> }>;
}

const renderTo = (
    isPrivate: boolean,
    location: Location<unknown>,
): LocationDescriptorObject => {
    let toObject: LocationDescriptorObject = {};
    const params = queryString.parse(location.search);
    if (isPrivate) {
        toObject.pathname = '/';
        toObject.search = `?to=${location.pathname}`;
    } else {
        if (params.to) {
            toObject.pathname = params.to as string;
        } else {
            toObject.pathname = '/dashboard';
        }
    }
    toObject.state = { from: location };
    return toObject;
};

const RouteWrapper: React.FC<Props> = ({
    component: Component,
    isPrivate = false,
    ...rest
}) => {
    const { logged } = useAuth();
    const LayoutComponent = isPrivate ? Menu : Sign;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isPrivate === logged ? (
                    <LayoutComponent location={location}>
                        <Component location={location} />
                    </LayoutComponent>
                ) : (
                    <Redirect to={renderTo(isPrivate, location)} />
                )
            }
        />
    );
};
// isPrivate === logged
// true === true -> true
// false === false -> true
// true === false -> false
// false === true -> false

export default RouteWrapper;
