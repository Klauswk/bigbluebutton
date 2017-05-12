import React from 'react';
import { Router, Route, Redirect, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

import { joinRouteHandler, logoutRouteHandler, authenticatedRouteHandler } from './auth';
import Base from './base';

import LoadingScreen from '/imports/ui/components/loading-screen/component';
import CustomChatContainer from '/imports/ui/components/chat-only-app/chat/container';
import ChatOnlyNavbarContainer from '/imports/ui/components/chat-only-app/nav-bar/container';
import UserListContainer from '/imports/ui/components/user-list/container';

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
        userList: UserListContainer,
        media: CustomChatContainer,
        actionsbar: null,
        navbar: ChatOnlyNavbarContainer,
      }} />
      <Route name="users" path="users" components={
        {
          userList: UserListContainer,
          media: CustomChatContainer,
          actionsbar: null,
          navbar: ChatOnlyNavbarContainer,
        }
      } />
      <Route name="chat" path="users/chat/:chatID" components={{
        userList: UserListContainer,
        media: CustomChatContainer,
        actionsbar: null,
        navbar: ChatOnlyNavbarContainer,
      }} />
      <Redirect from="users/chat" to="/users/chat/public" />
    </Route>

    <Route name="error" path="/error/:errorCode" component={Base} />
    <Redirect from="*" to="/error/404" />
  </Router>
);
