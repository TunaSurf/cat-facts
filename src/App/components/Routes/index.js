import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import * as ROUTES from '../../../shared/constants/routes';

import Home from '../../../Home';

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to={ROUTES.HOME} />
      <Route path={ROUTES.HOME} component={Home} />
    </Switch>
  );
}
