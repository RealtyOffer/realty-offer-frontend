/* eslint-disable consistent-return */
import { logout } from '../ducks/auth';
import { addAlert } from '../ducks/globalAlerts';

import { ActionResponseType } from '../constants';

export default (store: { dispatch: Function }) => (next: any) => (action: ActionResponseType) => {
  if (action && action.payload) {
    if (action.payload.status === 401) {
      // If we've gotten to this point, a request snuck through with a bad token
      // Call logout to nuke the data
      store.dispatch(logout());

      return store.dispatch(
        addAlert({
          message: 'You have been logged out because of an error. Please log in again to continue.',
          type: 'danger',
        })
      );
    }
    if (action.error) {
      // Any other 4xx errors should return a response,
      // so first add an alert for each error message in the response
      if (action.payload.response) {
        if (action.payload.response.errors) {
          Object.values(action.payload.response.errors).forEach(errorObject => {
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
