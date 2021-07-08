import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
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
  TOKEN_REFRESH_REQUEST,
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  LOGOUT_REQUEST,
} from './auth';

export type LoginFormValues = {
  email: string;
  password: string;
};

export type VerifyEmailFormValues = {
  email: string;
  confirmationCode: string;
};

export type ResetPasswordFormValues = {
  email: string;
  newPassword: string;
  token: string;
};

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
  failedLoginAttempts: number;
  lockoutTimestamp?: Date;
  tokenIsRefreshing: boolean;
} & AuthActionPayloadType;

export type CreateUserFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  confirmEmail: string;
  password: string;
  role: 'Consumer' | 'Agent';
};

export type UpdateUserFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
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

export type UpdateUserRequestAction = {
  type: typeof UPDATE_USER_REQUEST;
};
export type UpdateUserSuccessAction = {
  type: typeof UPDATE_USER_SUCCESS;
  payload: UpdateUserFormValues;
};
export type UpdateUserFailureAction = {
  type: typeof UPDATE_USER_FAILURE;
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

export type TokenRefreshRequestAction = {
  type: typeof TOKEN_REFRESH_REQUEST;
};
export type TokenRefreshSuccessAction = {
  type: typeof TOKEN_REFRESH_SUCCESS;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
};
export type TokenRefreshFailureAction = {
  type: typeof TOKEN_REFRESH_FAILURE;
  payload: { message?: string };
};

export type ChangePasswordRequestAction = {
  type: typeof CHANGE_PASSWORD_REQUEST;
};
export type ChangePasswordSuccessAction = {
  type: typeof CHANGE_PASSWORD_SUCCESS;
  payload: { currentPassword: string; newPassword: string };
};
export type ChangePasswordFailureAction = {
  type: typeof CHANGE_PASSWORD_FAILURE;
  payload: { message?: string };
};

export type LogoutRequestAction = {
  type: typeof LOGOUT_REQUEST;
};

export type AuthActionTypes =
  | CreateUserRequestAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
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
  | TokenRefreshRequestAction
  | TokenRefreshSuccessAction
  | TokenRefreshFailureAction
  | ChangePasswordRequestAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailureAction
  | LogoutRequestAction;
