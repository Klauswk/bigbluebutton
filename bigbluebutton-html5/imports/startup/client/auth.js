import Auth from '/imports/ui/services/auth';

// disconnected and trying to open a new connection
const STATUS_CONNECTING = 'connecting';

export function joinRouteHandler(nextState, replace, callback) {
  if (!nextState || !nextState.params.authToken) {
    replace({ pathname: '/error/404' });
    callback();
  }

  const { meetingID, userID, authToken } = nextState.params;
  Auth.set(meetingID, userID, authToken);
  replace({ pathname: '/' });
  callback();
};

export function logoutRouteHandler(nextState, replace, callback) {
  const { meetingID, userID, authToken } = nextState.params;

  Auth.logout()
    .then(logoutURL => {
      window.location = logoutURL || window.location.origin;
      callback();
    })
    .catch(reason => {
      replace({ pathname: '/error/500' });
      callback();
    });
};

export function authenticatedRouteHandler(nextState, replace, callback) {
  if (Auth.loggedIn) {
    callback();
  }

  _addReconnectObservable();

  Auth.authenticate()
    .then(callback)
    .catch(reason => {
      console.error(reason);
      replace({ pathname: `/error/${reason.error}` });
      callback();
    });
};

function _addReconnectObservable() {
  let lastStatus = null;

  Tracker.autorun(() => {

    lastStatus = updateStatus(Meteor.status(), lastStatus);

    if (shouldAuthenticate(Meteor.status(), lastStatus)) {
      Auth.authenticate(true);
      lastStatus = Meteor.status().status;
    }
  });
}

/**
 * Check if should revalidate the auth
 * @param {Object} status 
 * @param {String} lastStatus 
 */
export function shouldAuthenticate(status, lastStatus) {
  return lastStatus != null && lastStatus === STATUS_CONNECTING && status.connected;
}

/**
 * Check if the isn't the first connection try, preventing to authenticate on login.
 * @param {Object} status 
 * @param {string} lastStatus 
 */
export function updateStatus(status, lastStatus) {
  return status.retryCount > 0 && lastStatus !== STATUS_CONNECTING ? status.status : lastStatus;
}
