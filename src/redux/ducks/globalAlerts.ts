import uuidv4 from 'uuid/v4';

// eslint-disable-next-line import/no-cycle
import { AUTHENTICATE_CREDENTIALS_SUCCESS, LOGOUT_REQUEST } from './auth';

export const ADD_GLOBAL_ALERT = 'ADD_GLOBAL_ALERT';
export const CLOSE_GLOBAL_ALERT = 'CLOSE_GLOBAL_ALERT';

export const initialState = {
  alerts: [],
  currentAlert: null,
};

export default (
  state = initialState,
  action: any,
) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
    case AUTHENTICATE_CREDENTIALS_SUCCESS:
      return { ...initialState };
    case ADD_GLOBAL_ALERT: {
      // eslint-disable-next-line
      action.payload.id = action.payload.id || uuidv4();

      const alerts = [
        ...state.alerts,
        action.payload,
      ];

      return {
        alerts,
        currentAlert: alerts.length ? alerts[0] : null,
      };
    }
    case CLOSE_GLOBAL_ALERT: {
      const index = state.alerts.findIndex((x: any) => x.id === action.payload.id);
      const alerts = [
        ...state.alerts.slice(0, index),
        ...state.alerts.slice(index + 1),
      ];

      if (index === -1) {
        return state;
      }

      return {
        alerts,
        currentAlert: alerts.length ? alerts[0] : null,
      };
    }
    default:
      return state;
  }
};

export const addAlert = (payload: any) => ({ type: ADD_GLOBAL_ALERT, payload });

export const closeAlert = (payload: any) => ({ type: CLOSE_GLOBAL_ALERT, payload });
