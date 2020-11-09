import { RSAA } from 'redux-api-middleware';
import addMinutes from 'date-fns/addMinutes';
import { Dispatch } from 'redux';

import {
  AUTH_SIGNUP_ENDPOINT,
  AUTH_CONFIRM_ENDPOINT,
  AUTH_LOGIN_ENDPOINT,
  AUTH_FORGOT_PASSWORD_ENDPOINT,
  AUTH_RESET_PASSWORD_ENDPOINT,
  AUTH_RESEND_SIGNUP_EMAIL_ENDPOINT,
  AUTH_SECURED_PROFILE_ENDPOINT,
  AUTH_REFRESH_ACCESS_TOKEN_ENDPOINT,
  AUTH_CHANGE_PASSWORD_ENDPOINT,
} from '../constants';

import {
  AuthStoreType,
  AuthActionTypes,
  CreateUserFormValues,
  VerifyEmailFormValues,
  LoginFormValues,
  ResetPasswordFormValues,
  UpdateUserFormValues,
} from './auth.d';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

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

export const TOKEN_REFRESH_REQUEST = 'TOKEN_REFRESH_REQUEST';
export const TOKEN_REFRESH_SUCCESS = 'TOKEN_REFRESH_SUCCESS';
export const TOKEN_REFRESH_FAILURE = 'TOKEN_REFRESH_FAILURE';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const initialState: AuthStoreType = {
  isLoading: false,
  hasError: false,
  isLoggedIn: false,
  message: '',
  verifiedEmail: false,
  accessToken: '',
  refreshToken: '',
  expirationTime: '',
  issuedTime: '',
  roles: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  failedLoginAttempts: 0,
  lockoutTimestamp: undefined,
  tokenIsRefreshing: false,
};

export default (state: AuthStoreType = initialState, action: AuthActionTypes): AuthStoreType => {
  switch (action.type) {
    case VERIFY_EMAIL_REQUEST:
    case RESEND_SIGNUP_EMAIL_REQUEST:
    case AUTHENTICATE_CREDENTIALS_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        tokenIsRefreshing: false,
        isLoading: true,
        hasError: false,
      };
    case TOKEN_REFRESH_REQUEST:
      return {
        ...state,
        isLoading: true,
        tokenIsRefreshing: true,
        hasError: false,
      };
    case AUTHENTICATE_CREDENTIALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        isLoggedIn: true,
        failedLoginAttempts: 0,
        lockoutTimestamp: undefined,
        ...action.payload,
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        verifiedEmail: true,
      };
    case TOKEN_REFRESH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        tokenIsRefreshing: false,
        ...action.payload,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        // not just ...action.payload because we dont want to capture password in here
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phoneNumber: action.payload.phoneNumber,
        email: action.payload.email,
      };
    case CREATE_USER_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
    case RESEND_SIGNUP_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        failedLoginAttempts: 0,
        lockoutTimestamp: undefined,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        ...action.payload,
      };
    case AUTHENTICATE_CREDENTIALS_FAILURE:
      return {
        ...initialState,
        isLoading: false,
        hasError: true,
        isLoggedIn: false,
        message: action.payload.message || 'An error occurred. Please try again.',
        failedLoginAttempts: state.failedLoginAttempts + 1,
        lockoutTimestamp: state.failedLoginAttempts >= 4 ? addMinutes(new Date(), 5) : undefined,
      };
    case UPDATE_USER_FAILURE:
    case CREATE_USER_FAILURE:
    case VERIFY_EMAIL_FAILURE:
    case RESEND_SIGNUP_EMAIL_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case TOKEN_REFRESH_FAILURE:
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        message: action.payload.message || 'An error occurred. Please try again.',
      };
    case LOGOUT_REQUEST:
      return { ...initialState };
    default:
      return state;
  }
};

export const createUser = (payload: CreateUserFormValues) => ({
  [RSAA]: {
    endpoint: AUTH_SIGNUP_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [{ type: CREATE_USER_REQUEST, payload }, CREATE_USER_SUCCESS, CREATE_USER_FAILURE],
  },
});

export const updateUser = (payload: UpdateUserFormValues) => ({
  [RSAA]: {
    endpoint: AUTH_SECURED_PROFILE_ENDPOINT,
    method: 'PUT',
    body: JSON.stringify(payload),
    types: [{ type: UPDATE_USER_REQUEST, payload }, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE],
  },
});

export const verifyEmail = (payload: VerifyEmailFormValues) => ({
  [RSAA]: {
    endpoint: AUTH_CONFIRM_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE],
  },
});

export const resendSignupEmail = (email: string) => ({
  [RSAA]: {
    endpoint: AUTH_RESEND_SIGNUP_EMAIL_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ email }),
    skipOauth: true,
    types: [RESEND_SIGNUP_EMAIL_REQUEST, RESEND_SIGNUP_EMAIL_SUCCESS, RESEND_SIGNUP_EMAIL_FAILURE],
  },
});

export const authenticateCredentials = (payload: LoginFormValues) => ({
  [RSAA]: {
    endpoint: AUTH_LOGIN_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [
      AUTHENTICATE_CREDENTIALS_REQUEST,
      AUTHENTICATE_CREDENTIALS_SUCCESS,
      AUTHENTICATE_CREDENTIALS_FAILURE,
    ],
  },
});

export const forgotPassword = (payload: { email: string }) => ({
  [RSAA]: {
    endpoint: AUTH_FORGOT_PASSWORD_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE],
  },
});

export const resetPassword = (payload: ResetPasswordFormValues) => ({
  [RSAA]: {
    endpoint: AUTH_RESET_PASSWORD_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
  },
});

export const logout = () => ({
  type: LOGOUT_REQUEST,
});

export const refreshAccessToken = () => (dispatch: Dispatch, getState: any) => {
  const state = getState();
  return dispatch({
    [RSAA]: {
      endpoint: AUTH_REFRESH_ACCESS_TOKEN_ENDPOINT,
      method: 'POST',
      skipOauth: true,
      // bailout: state.auth.tokenIsRefreshing,
      body: JSON.stringify({
        refreshToken: state.auth.refreshToken,
        accessToken: state.auth.accessToken,
      }),
      types: [TOKEN_REFRESH_REQUEST, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_FAILURE],
    },
  });
};

export const changePassword = (payload: { currentPassword: string; newPassword: string }) => ({
  [RSAA]: {
    endpoint: AUTH_CHANGE_PASSWORD_ENDPOINT,
    method: 'PUT',
    body: JSON.stringify(payload),
    types: [CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE],
  },
});
