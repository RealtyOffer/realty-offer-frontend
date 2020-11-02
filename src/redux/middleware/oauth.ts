import { RSAA } from 'redux-api-middleware';
import { isBefore, isAfter } from 'date-fns';

import { ActionResponseType } from '../constants';
import { refreshAccessToken } from '../ducks/auth';

export default (store: any) => (next: any) => async (action: any) => {
  const returnAction = action;
  let queuedActions: Array<typeof action> = [];

  // Check if the action is a RSAA middleware action
  // Also make sure it doesn't have the skipOauth property set
  if (!returnAction[RSAA]) {
    return next(action);
  }

  if (returnAction[RSAA] && returnAction[RSAA].skipOauth) {
    const skipOauth = !!returnAction[RSAA].skipOauth;

    // Have to delete skipOauth or move skipOauth out of RSAA object
    delete returnAction[RSAA].skipOauth;

    if (skipOauth) {
      return next(returnAction);
    }
  }

  const state = store.getState();

  // dispatch a refresh token request, and once done, run all of the queued actions
  const refreshPromise = () =>
    store.dispatch(refreshAccessToken()).then((response: ActionResponseType) => {
      if (response && !response.error) {
        queuedActions.forEach((queuedAction) => {
          // eslint-disable-next-line no-param-reassign
          queuedAction[RSAA].headers = {
            ...queuedAction[RSAA].headers,
            Authorization: `Bearer ${response.payload.accessToken}`,
          };
          store.dispatch(queuedAction);
        });
        queuedActions = [];
        // continue to next api call(s)
        return next(action);
      }
      // if there was an error in the response, just return null and let errorCatcher middleware handle
      return null;
    });

  // Check if its not skipOauth, that the oauth token is not currently refreshing, and not expired yet
  // add auth bearer token and then return the next action
  if (
    !returnAction[RSAA].skipOauth &&
    !state.auth.tokenIsRefreshing &&
    isAfter(new Date(state.auth.expirationTime), new Date())
  ) {
    returnAction[RSAA].headers = {
      ...returnAction[RSAA].headers,
      Authorization: `Bearer ${state.auth.accessToken}`,
    };
    return next(returnAction);
  }

  // If we are refreshing, or the token is now expired, we need to add it to the queue
  // and then return the refreshPromise
  if (state.auth.tokenIsRefreshing || isBefore(new Date(state.auth.expirationTime), new Date())) {
    queuedActions.push(returnAction);
    return refreshPromise();
  }
};
