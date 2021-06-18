import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import SystemUser from '../pages/SystemUser';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route component={SignIn} path="/" exact />
            <Route component={SystemUser} path="/usuarios" isPrivate />
            <Route component={Dashboard} path="/dashboard" isPrivate />
        </Switch>
    );
};

export default Routes;
