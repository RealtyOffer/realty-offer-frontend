import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  RESEND_SIGNUP_EMAIL_REQUEST,
  RESEND_SIGNUP_EMAIL_SUCCESS,
  RESEND_SIGNUP_EMAIL_FAILURE,
  AUTHENTICATE_CREDENTIALS_REQUEST,
  AUTHENTICATE_CREDENTIALS_SUCCESS,
  AUTHENTICATE_CREDENTIALS_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  LOGOUT_REQUEST,
} from './auth';

import { VerifyEmailFormValues } from '../../views/shared/VerifyEmail';
import { LoginFormValues } from '../../pages/login';
import { ResetPasswordFormValues } from '../../pages/reset-password';

export type AuthActionPayloadType = {
  accessToken: string;
  refreshToken: string;
  expirationTime: string;
  issuedTime: string;
  roles: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

export type AuthStoreType = {
  isLoading: boolean;
  hasError: boolean;
  isLoggedIn: boolean;
  message: string;
  verifiedEmail: boolean;
} & AuthActionPayloadType;

export type CreateUserFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: 'Consumer' | 'Agent';
};

export type CreateUserRequestAction = {
  type: typeof CREATE_USER_REQUEST;
  payload: CreateUserFormValues;
};

export type CreateUserSuccessAction = {
  type: typeof CREATE_USER_SUCCESS;
  payload: CreateUserFormValues;
};

export type CreateUserFailureAction = {
  type: typeof CREATE_USER_FAILURE;
  payload: { message?: string };
};

export type VerifyEmailRequestAction = {
  type: typeof VERIFY_EMAIL_REQUEST;
  payload: VerifyEmailFormValues;
};

export type VerifyEmailSuccessAction = {
  type: typeof VERIFY_EMAIL_SUCCESS;
};

export type VerifyEmailFailureAction = {
  type: typeof VERIFY_EMAIL_FAILURE;
  payload: { message?: string };
};

export type ResendSignupEmailRequestAction = {
  type: typeof RESEND_SIGNUP_EMAIL_REQUEST;
  payload: {
    email: string;
  };
};

export type ResendSignupEmailSuccessAction = {
  type: typeof RESEND_SIGNUP_EMAIL_SUCCESS;
};

export type ResendSignupEmailFailureAction = {
  type: typeof RESEND_SIGNUP_EMAIL_FAILURE;
  payload: { message?: string };
};

export type AuthenticateCredentialsRequestAction = {
  type: typeof AUTHENTICATE_CREDENTIALS_REQUEST;
  payload: LoginFormValues;
};

export type AuthenticateCredentialsSuccessAction = {
  type: typeof AUTHENTICATE_CREDENTIALS_SUCCESS;
  payload: AuthActionPayloadType;
};

export type AuthenticateCredentialsFailureAction = {
  type: typeof AUTHENTICATE_CREDENTIALS_FAILURE;
  payload: { message?: string };
};

export type ForgotPasswordRequestAction = {
  type: typeof FORGOT_PASSWORD_REQUEST;
  payload: { email: string };
};

export type ForgotPasswordSuccessAction = {
  type: typeof FORGOT_PASSWORD_SUCCESS;
};

export type ForgotPasswordFailureAction = {
  type: typeof FORGOT_PASSWORD_FAILURE;
  payload: { message?: string };
};

export type ResetPasswordRequestAction = {
  type: typeof RESET_PASSWORD_REQUEST;
  payload: ResetPasswordFormValues;
};

export type ResetPasswordSuccessAction = {
  type: typeof RESET_PASSWORD_SUCCESS;
};

export type ResetPasswordFailureAction = {
  type: typeof RESET_PASSWORD_FAILURE;
  payload: { message?: string };
};

export type LogoutRequestAction = {
  type: typeof LOGOUT_REQUEST;
};

export type AuthActionTypes =
  | CreateUserRequestAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | VerifyEmailRequestAction
  | VerifyEmailSuccessAction
  | VerifyEmailFailureAction
  | ResendSignupEmailRequestAction
  | ResendSignupEmailSuccessAction
  | ResendSignupEmailFailureAction
  | AuthenticateCredentialsRequestAction
  | AuthenticateCredentialsSuccessAction
  | AuthenticateCredentialsFailureAction
  | ForgotPasswordRequestAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailureAction
  | ResetPasswordRequestAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailureAction
  | LogoutRequestAction;