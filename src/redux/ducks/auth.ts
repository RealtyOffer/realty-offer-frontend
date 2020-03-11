import { RSAA } from 'redux-api-middleware';

import {
  AUTH_SIGNUP_ENDPOINT,
  AUTH_CONFIRM_ENDPOINT,
  AUTH_LOGIN_ENDPOINT,
  AUTH_FORGOT_PASSWORD_ENDPOINT,
  AUTH_RESET_PASSWORD_ENDPOINT,
  AUTH_RESEND_SIGNUP_EMAIL_ENDPOINT,
} from '../constants';

import { VerifyEmailFormValues } from '../../views/agent/AgentCreation/VerifyEmail';
import { LoginFormValues } from '../../pages/login';
import { CreateAgentFormValues } from '../../views/agent/AgentCreation/CreateAgent';
import { ResetPasswordFormValues } from '../../pages/reset-password';

export const CREATE_AGENT_REQUEST = 'CREATE_AGENT_REQUEST';
export const CREATE_AGENT_SUCCESS = 'CREATE_AGENT_SUCCESS';
export const CREATE_AGENT_FAILURE = 'CREATE_AGENT_FAILURE';

export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = 'VERIFY_EMAIL_FAILURE';

export const RESEND_SIGNUP_EMAIL_REQUEST = 'RESEND_SIGNUP_EMAIL_REQUEST';
export const RESEND_SIGNUP_EMAIL_SUCCESS = 'RESEND_SIGNUP_EMAIL_SUCCESS';
export const RESEND_SIGNUP_EMAIL_FAILURE = 'RESEND_SIGNUP_EMAIL_FAILURE';

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

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

type AuthStoreType = {
  isLoading: boolean;
  hasError: boolean;
  isLoggedIn: boolean;
  token: string;
  message: string;
  verifiedEmail: boolean;
}

export const initialState: AuthStoreType = {
  isLoading: false,
  hasError: false,
  isLoggedIn: false,
  token: '',
  message: '',
  verifiedEmail: false,
};

export default (
  state: AuthStoreType = initialState,
  action,
) => {
  switch (action.type) {
    case CREATE_AGENT_REQUEST:
    case VERIFY_EMAIL_REQUEST:
    case RESEND_SIGNUP_EMAIL_REQUEST:
    case AUTHENTICATE_CREDENTIALS_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case AUTHENTICATE_CREDENTIALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        isLoggedIn: true,
        token: action.payload.token,
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        verifiedEmail: true,
      };
    case CREATE_AGENT_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
    case RESEND_SIGNUP_EMAIL_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
      };
    case AUTHENTICATE_CREDENTIALS_FAILURE:
      return {
        ...initialState,
        isLoading: false,
        hasError: true,
        isLoggedIn: false,
        token: null,
        message: action.payload.message || 'An error occurred. Please try again.',
      };
    case CREATE_AGENT_FAILURE:
    case VERIFY_EMAIL_FAILURE:
    case RESEND_SIGNUP_EMAIL_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        message: action.payload.message,
      };
    case LOGOUT_REQUEST:
      return { ...initialState };
    default:
      return state;
  }
};

export const createAgent = (payload: CreateAgentFormValues) => ({
  [RSAA]: {
    endpoint: AUTH_SIGNUP_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [
      CREATE_AGENT_REQUEST,
      CREATE_AGENT_SUCCESS,
      CREATE_AGENT_FAILURE,
    ],
  },
});

export const verifyEmail = (payload: VerifyEmailFormValues) => ({
  [RSAA]: {
    endpoint: AUTH_CONFIRM_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [
      VERIFY_EMAIL_REQUEST,
      VERIFY_EMAIL_SUCCESS,
      VERIFY_EMAIL_FAILURE,
    ],
  },
});

export const resendSignupEmail = (email: string) => ({
  [RSAA]: {
    endpoint: AUTH_RESEND_SIGNUP_EMAIL_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
    skipOauth: true,
    types: [
      RESEND_SIGNUP_EMAIL_REQUEST,
      RESEND_SIGNUP_EMAIL_SUCCESS,
      RESEND_SIGNUP_EMAIL_FAILURE,
    ],
  },
});

export const authenticateCredentials = (payload: LoginFormValues) => ({
  [RSAA]: {
    endpoint: AUTH_LOGIN_ENDPOINT,
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
    endpoint: AUTH_FORGOT_PASSWORD_ENDPOINT,
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

export const resetPassword = (payload: ResetPasswordFormValues) => ({
  [RSAA]: {
    endpoint: AUTH_RESET_PASSWORD_ENDPOINT,
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

// export const changePassword = (payload: {
//   newPassword: string,
//   currentPassword: string,
// }) => ({
//   [RSAA]: {
//     // endpoint: CHANGE_PASSWORD_ENDPOINT,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//     types: [
//       CHANGE_PASSWORD_REQUEST,
//       CHANGE_PASSWORD_SUCCESS,
//       CHANGE_PASSWORD_FAILURE,
//     ],
//   },
// });

export const logout = () => ({
  type: LOGOUT_REQUEST,
});
