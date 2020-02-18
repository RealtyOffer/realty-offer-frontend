import { RSAA } from 'redux-api-middleware';

export const AUTHENTICATE_CREDENTIALS_REQUEST = 'AUTHENTICATE_CREDENTIALS_REQUEST';
export const AUTHENTICATE_CREDENTIALS_SUCCESS = 'AUTHENTICATE_CREDENTIALS_SUCCESS';
export const AUTHENTICATE_CREDENTIALS_FAILURE = 'AUTHENTICATE_CREDENTIALS_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const CONFIRM_ACCOUNT_REQUEST = 'CONFIRM_ACCOUNT_REQUEST';
export const CONFIRM_ACCOUNT_SUCCESS = 'CONFIRM_ACCOUNT_SUCCESS';
export const CONFIRM_ACCOUNT_FAILURE = 'CONFIRM_ACCOUNT_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const initialState = {
  isLoading: false,
  hasError: false,
  isLoggedIn: false,
  token: '',
  message: '',
};

export default (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case AUTHENTICATE_CREDENTIALS_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
    case CONFIRM_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        hasError: false,
      });
    case AUTHENTICATE_CREDENTIALS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        isLoggedIn: true,
        token: action.payload.token,
      });
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
    case CONFIRM_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
      });
    case AUTHENTICATE_CREDENTIALS_FAILURE:
      return Object.assign({}, initialState, {
        isLoading: false,
        hasError: true,
        isLoggedIn: false,
        token: null,
        message: action.payload.message ? action.payload.message : 'An error occurred. Please try again.',
      });
    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case CHANGE_PASSWORD_FAILURE:
    case CONFIRM_ACCOUNT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: true,
        message: action.payload.message,
      });
    case LOGOUT_REQUEST:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};

export const authenticateCredentials = (payload: {
  username: string,
  password: string,
}) => ({
  [RSAA]: {
    // endpoint: AUTH_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [
      AUTHENTICATE_CREDENTIALS_REQUEST,
      AUTHENTICATE_CREDENTIALS_SUCCESS,
      AUTHENTICATE_CREDENTIALS_FAILURE,
    ],
  },
});

export const forgotPassword = (payload: {
  email: string,
}) => ({
  [RSAA]: {
    // endpoint: FORGOT_PASSWORD_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [
      FORGOT_PASSWORD_REQUEST,
      FORGOT_PASSWORD_SUCCESS,
      FORGOT_PASSWORD_FAILURE,
    ],
  },
});

export const resetPassword = (payload: {
  email: string,
  newPassword: string,
  token: string,
}) => ({
  [RSAA]: {
    // endpoint: RESET_PASSWORD_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [
      RESET_PASSWORD_REQUEST,
      RESET_PASSWORD_SUCCESS,
      RESET_PASSWORD_FAILURE,
    ],
  },
});

export const changePassword = (payload: {
  newPassword: string,
  currentPassword: string,
}) => ({
  [RSAA]: {
    // endpoint: CHANGE_PASSWORD_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    types: [
      CHANGE_PASSWORD_REQUEST,
      CHANGE_PASSWORD_SUCCESS,
      CHANGE_PASSWORD_FAILURE,
    ],
  },
});

export const confirmAccount = (payload: {
  userId: string,
  token: string,
  password: string,
}) => ({
  [RSAA]: {
    // endpoint: CONFIRM_ACCOUNT_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [
      CONFIRM_ACCOUNT_REQUEST,
      CONFIRM_ACCOUNT_SUCCESS,
      CONFIRM_ACCOUNT_FAILURE,
    ],
  },
});

export const logout = () => ({
  type: LOGOUT_REQUEST,
});
