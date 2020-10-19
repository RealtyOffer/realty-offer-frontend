import { RSAA } from 'redux-api-middleware';
import { isBefore } from 'date-fns';

import { ActionResponseType, AUTH_REFRESH_ACCESS_TOKEN_ENDPOINT } from '../constants';
import { refreshAccessToken } from '../ducks/auth';

export default (store: any) => (next: any) => async (action: any) => {
  const returnAction = action;

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
  returnAction[RSAA].headers = {
    ...returnAction[RSAA].headers,
    Authorization: `Bearer ${state.auth.accessToken}`,
  };

  if (returnAction[RSAA].endpoint !== AUTH_REFRESH_ACCESS_TOKEN_ENDPOINT) {
    if (isBefore(new Date(state.auth.expirationTime), new Date())) {
      const response: ActionResponseType = await store.dispatch(refreshAccessToken());

      if (response && !response.error) {
        return next(returnAction);
      }
    }
  }

  return next(returnAction);
};
