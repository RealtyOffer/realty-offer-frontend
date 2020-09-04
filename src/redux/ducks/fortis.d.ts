import {
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILURE,
  CREATE_ACCOUNTVAULT_REQUEST,
  CREATE_ACCOUNTVAULT_SUCCESS,
  CREATE_ACCOUNTVAULT_FAILURE,
  CREATE_RECURRING_REQUEST,
  CREATE_RECURRING_SUCCESS,
  CREATE_RECURRING_FAILURE,
  EDIT_RECURRING_REQUEST,
  EDIT_RECURRING_SUCCESS,
  EDIT_RECURRING_FAILURE,
  GET_ACCOUNTVAULT_REQUEST,
  GET_ACCOUNTVAULT_SUCCESS,
  GET_ACCOUNTVAULT_FAILURE,
  DELETE_ACCOUNTVAULT_REQUEST,
  DELETE_ACCOUNTVAULT_SUCCESS,
  DELETE_ACCOUNTVAULT_FAILURE,
} from './fortis';

import { LogoutRequestAction } from './auth.d';
import { ActionResponseType } from '../constants';

export type FortispayStoreType = {
  isLoading: boolean;
  hasError: boolean;
};

export type AccountVaultResponseType = {
  id: string;
  payment_method: string;
  title: string;
  account_holder_name: string;
  first_six: string;
  last_four: string;
  billing_address: string;
  billing_zip: string;
  exp_date: string;
  routing: string;
  account_type: string;
  location_id: string;
  contact_id: string;
  created_ts: number;
  modified_ts: number;
  account_vault_api_id: string;
  dl_number: string;
  dl_state: string;
  customer_id: string;
  ssn4: string;
  dob_year: string;
  billing_state: string;
  billing_city: string;
  billing_phone: string;
  accountvault_c1: string;
  accountvault_c2: string;
  accountvault_c3: string;
  expiring_in_months: number;
  has_recurring: boolean;
  active: number;
  errors: string[];
};

export type CreateContactRequestAction = {
  type: typeof CREATE_CONTACT_REQUEST;
};

export type CreateContactSuccessAction = {
  type: typeof CREATE_CONTACT_SUCCESS;
  payload: {
    id: string;
    location_id: string;
    account_number: string;
    contact_api_id: string;
    company_name: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    home_phone: string;
    cell_phone: string;
    office_phone: string;
    office_ext_phone: string;
    contact_balance: string;
    created_ts: number;
    errors: string[];
  };
} & ActionResponseType;

export type CreateContactFailureAction = {
  type: typeof CREATE_CONTACT_FAILURE;
};

export type CreateAccountvaultRequestAction = {
  type: typeof CREATE_ACCOUNTVAULT_REQUEST;
};

export type CreateAccountvaultSuccessAction = {
  type: typeof CREATE_ACCOUNTVAULT_SUCCESS;
  payload: AccountVaultResponseType;
} & ActionResponseType;

export type CreateAccountvaultFailureAction = {
  type: typeof CREATE_ACCOUNTVAULT_FAILURE;
};

export type CreateRecurringRequestAction = {
  type: typeof CREATE_RECURRING_REQUEST;
};
export type CreateRecurringSuccessAction = {
  type: typeof CREATE_RECURRING_SUCCESS;
  payload: {
    recurring: {
      id: string;
      account_vault_id: string;
      location_id: string;
      product_transaction_id: string;
      description: string;
      transaction_amount: string;
      interval_type: string;
      interval: number;
      next_run_date: string;
      payment_method: string;
      start_date: string;
      end_date: string;
      notification_days: number;
      created_ts: number;
      modified_ts: number;
      status: string;
      active: number;
      recurring_type_id: string;
      errors: string[];
    };
  };
} & ActionResponseType;

export type EditRecurringFailureAction = {
  type: typeof EDIT_RECURRING_FAILURE;
};

export type EditRecurringRequestAction = {
  type: typeof EDIT_RECURRING_REQUEST;
};

export type EditRecurringSuccessAction = {
  type: typeof EDIT_RECURRING_SUCCESS;
  payload: {
    recurring: {
      id: string;
      account_vault_id: string;
      location_id: string;
      product_transaction_id: string;
      description: string;
      transaction_amount: string;
      interval_type: string;
      interval: number;
      next_run_date: string;
      payment_method: string;
      start_date: string;
      end_date: string;
      notification_days: number;
      created_ts: number;
      modified_ts: number;
      status: string;
      active: number;
      recurring_type_id: string;
      errors: string[];
    };
  };
} & ActionResponseType;

export type CreateRecurringFailureAction = {
  type: typeof CREATE_RECURRING_FAILURE;
};

export type GetAccountvaultRequestAction = {
  type: typeof GET_ACCOUNTVAULT_REQUEST;
};

export type GetAccountvaultSuccessAction = {
  type: typeof GET_ACCOUNTVAULT_SUCCESS;
  payload: AccountVaultResponseType;
} & ActionResponseType;

export type GetAccountvaultFailureAction = {
  type: typeof GET_ACCOUNTVAULT_FAILURE;
};

export type DeleteAccountvaultRequestAction = {
  type: typeof DELETE_ACCOUNTVAULT_REQUEST;
};

export type DeleteAccountvaultSuccessAction = {
  type: typeof DELETE_ACCOUNTVAULT_SUCCESS;
  payload: AccountVaultResponseType;
} & ActionResponseType;

export type DeleteAccountvaultFailureAction = {
  type: typeof DELETE_ACCOUNTVAULT_FAILURE;
};

export type FortispayStoreActions =
  | CreateContactRequestAction
  | CreateContactSuccessAction
  | CreateContactFailureAction
  | CreateAccountvaultRequestAction
  | CreateAccountvaultSuccessAction
  | CreateAccountvaultFailureAction
  | CreateRecurringRequestAction
  | CreateRecurringSuccessAction
  | CreateRecurringFailureAction
  | EditRecurringRequestAction
  | EditRecurringSuccessAction
  | EditRecurringFailureAction
  | DeleteAccountvaultRequestAction
  | DeleteAccountvaultSuccessAction
  | DeleteAccountvaultFailureAction
  | GetAccountvaultRequestAction
  | GetAccountvaultSuccessAction
  | GetAccountvaultFailureAction
  | LogoutRequestAction;
