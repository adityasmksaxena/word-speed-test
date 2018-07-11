import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withRoot from './withRoot';
import Dashboard from './containers/Dashboard';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default withRoot(Router);
