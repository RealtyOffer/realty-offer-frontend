/* eslint-disable consistent-return */
import { navigate } from 'gatsby';
import { logout } from '../ducks/auth';
import { addAlert } from '../ducks/globalAlerts';

import { ActionResponseType } from '../constants';
import trackEvent from '../../utils/analytics';

export default (store: { dispatch: Function }) => (next: any) => (action: ActionResponseType) => {
  if (action && action.payload) {
    if (action.payload.status === 401 && action.type !== 'TOKEN_REFRESH_FAILURE') {
      // If we've gotten to this point, a request snuck through with a bad token
      // Call logout to nuke the data
      store.dispatch(logout());

      trackEvent('Logout', {
        location: 'errorCatcher.ts - 401 error',
      });

      navigate('/login');

      return store.dispatch(
        addAlert({
          message:
            'You have been logged out because your session has expired. Please log in again to continue.',
          type: 'danger',
        })
      );
    }
    // ignore GET_AGENT_PROFILE_FAILURE because we check agent store to see if they have finished
    // or not to determine routing upon login
    // also ignore GET_USER_AVATAR_REQUEST because they may not have a photo yet
    if (
      action.error &&
      action.type !== 'GET_AGENT_PROFILE_FAILURE' &&
      action.type !== 'GET_USER_AVATAR_FAILURE' &&
      action.type !== 'GET_WINNING_AGENT_PROFILE_PHOTO_FAILURE'
    ) {
      // Any other 4xx errors should return a response,
      // so first add an alert for each error message in the response
      if (action.payload.response) {
        if (action.payload.response.errors) {
          Object.values(action.payload.response.errors).forEach((errorObject) => {
            Object.values(errorObject).forEach((error: string) => {
              store.dispatch(
                addAlert({
                  message: error,
                  type: 'danger',
                })
              );
            });
          });
        } else {
          store.dispatch(
            addAlert({
              message: action.payload.response.title,
              type: 'danger',
            })
          );
        }
      }
      // Any 5xx errors should NOT return a response, so show a generic error message
      if (!action.payload.response) {
        store.dispatch(
          addAlert({
            message: 'An error has occurred on the server. Please try again later.',
            type: 'danger',
          })
        );
      }
      // Finally, return the next action so it continues going
      // through the request/success/failures properly
      return next(action);
    }
  }

  // So the middleware doesn't get applied to every single action
  return next(action);
};
