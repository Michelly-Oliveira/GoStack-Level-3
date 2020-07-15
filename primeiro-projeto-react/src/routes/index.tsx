import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" component={Dashboard} exact />
        {/* use + to indicate that everythin that comes after the repository/ is one parameter */}
        <Route path="/repository/:repository+" component={Repository} />
    </Switch>
);

export default Routes;
