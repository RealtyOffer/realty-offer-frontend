import { ADD_GLOBAL_ALERT, CLOSE_GLOBAL_ALERT } from './globalAlerts';
import { LogoutRequestAction, AuthenticateCredentialsSuccessAction } from './auth.d';

export type AlertType = {
  message: string;
  type: string;
  id: string;
};

export type GlobalAlertsStoreType = {
  alerts: Array<AlertType>;
  currentAlert: AlertType | null;
};

export type AddGlobalAlertAction = {
  type: typeof ADD_GLOBAL_ALERT;
  payload: AlertType;
};

export type CloseGlobalAlertAction = {
  type: typeof CLOSE_GLOBAL_ALERT;
  payload: AlertType;
};

export type GlobalAlertsActions =
  | AddGlobalAlertAction
  | CloseGlobalAlertAction
  | LogoutRequestAction
  | AuthenticateCredentialsSuccessAction;
