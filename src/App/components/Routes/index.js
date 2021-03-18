import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import * as ROUTES from '../../../shared/constants/routes';

import Home from '../../../Home';
import Verify from '../../../Verify';

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to={ROUTES.HOME} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.VERIFY} component={Verify} />
    </Switch>
  );
}
