import React from 'react';
import { Router, Route, Redirect, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

import { joinRouteHandler, logoutRouteHandler, authenticatedRouteHandler } from './auth';
import Base from './base';

import LoadingScreen from '/imports/ui/components/loading-screen/component';
import PollOnlyNavBar from '/imports/ui/components/poll-only-nav-bar/container';
import PollWaiting from '/imports/ui/components/poll-waiting/component';

const browserHistory = useRouterHistory(createHistory)({
  basename: Meteor.settings.public.app.basename,
});

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/logout" onEnter={logoutRouteHandler} />
    <Route path="/join/:meetingID/:userID/:authToken"
      component={LoadingScreen} onEnter={joinRouteHandler} />
    <Route path="/" component={Base} onEnter={authenticatedRouteHandler} >
      <IndexRoute components={{
        navbar: PollOnlyNavBar,
        media:PollWaiting,
        actionsbar:null
      }} />
    </Route>
    <Route name="error" path="/error/:errorCode" component={Base}/>
    <Redirect from="*" to="/error/404" />
  </Router>
);
