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
  GET_RECURRING_REQUEST,
  GET_RECURRING_SUCCESS,
  GET_RECURRING_FAILURE,
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE,
  POST_SINGLE_TRANSACTION_REQUEST,
  POST_SINGLE_TRANSACTION_SUCCESS,
  POST_SINGLE_TRANSACTION_FAILURE,
  UPDATE_ACCOUNTVAULT_REQUEST,
  UPDATE_ACCOUNTVAULT_SUCCESS,
  UPDATE_ACCOUNTVAULT_FAILURE,
} from './fortis';

import { LogoutRequestAction } from './auth.d';

export type FortispayStoreType = {
  isLoading: boolean;
  hasError: boolean;
  contact?: FortispayContactType;
  accountVaults: Array<FortispayAccountvaultResponseType>;
  recurring: Array<FortispayRecurringResponseType>;
  transactions: Array<FortispayTransactionResponseType>;
};

export type FortispayContactType = {
  id?: string;
  account_number?: string;
  contact_api_id?: string;
  company_name?: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  home_phone: string | null;
  cell_phone?: string;
  office_phone: string | null;
  office_ext_phone?: string | null;
};

export type FortispayContactResponseType = {
  id: string;
  account_number: string;
  contact_api_id: string;
  contact_balance: string;
  created_ts: number;
  errors: string[];
  modified_ts: Date;
  date_of_birth: string | null;
  header_message: string | null;
  header_message_type: number;
  email_trx_receipt: boolean;
  _links: Array<{
    self: {
      href: string;
    };
  }>;
} & FortispayContactType;

export type FortispayAccountvaultType = {
  id?: string;
  account_vault_api_id?: string;
  payment_method: 'cc';
  account_number: string;
  exp_date: string;
  email?: string;
  contact_id: string;
  account_holder_name: string;
  billing_address: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
};

export type FortispayAccountvaultResponseType = {
  id: string;
  payment_method: string;
  title: string;
  account_holder_name: string;
  first_six: string;
  last_four: string;
  billing_address: string | null;
  billing_zip: string | null;
  exp_date: string;
  routing: string | null;
  account_type: string;
  contact_id: string;
  created_ts: Date;
  modified_ts: Date;
  account_vault_api_id: string | null;
  dl_number: string | null;
  dl_state: string | null;
  customer_id: string | null;
  ssn4: string | null;
  dob_year: string | null;
  billing_state: string | null;
  billing_city: string | null;
  billing_phone: string | null;
  accountvault_c1: string | null;
  accountvault_c2: string | null;
  accountvault_c3: string | null;
  expiring_in_months: number;
  has_recurring: boolean;
  ach_sec_code: string | null;
  active: number;
  _links: Array<{
    self: {
      href: string;
    };
  }>;
};

export type FortispayRecurringType = {
  account_vault_id: string; // The account_vault_id of the account vault to use when runnint the recurring transaction.
  transaction_amount: string; // Amount of recurring
  interval_type: 'd' | 'w' | 'm'; // Type of interval (enum of d, w, or m)
  interval: number; // Interval of recurring (1-3)
  start_date: string; // yyyy-mm-dd Start Date of recurring
  product_transaction_id?: string; // The ID for the Product Transaction to use when running the Recurring.
  active?: string; // Current status (1 or 0)
  description?: string; // Description of Recurring Payment
  end_date?: string; // -mm-dd End date of recurring
  installment_total_count?: number; // Number of times to process the payment (optional)
  next_run_date?: string; // yyyy-m-dd  Next run date of recurring
  notification_days?: string; // Days to notify contact before next recurring processes
  payment_method?: string; // Payment Method of recurring (enum of cc or ach)
  recurring_type_id?: string; // System Generated Flag based on configuration.  Returned in GET/PUT/POST responses for each record.
  status?: string; // Current status of recurring. Possible values include: "active", "on hold", and "ended"
};

export type FortispayRecurringResponseType = {
  id: string;
  account_vault_id: string;
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
  created_ts: Date;
  modified_ts: Date;
  status: string;
  active: number;
  recurring_type_id: string;
  _links: Array<{
    self: {
      href: string;
    };
  }>;
};

export type FortispayTransactionResponseType = {
  id: string;
  payment_method: string;
  account_vault_id: string;
  recurring_id?: string;
  first_six: string;
  last_four: string;
  account_holder_name: string;
  transaction_amount: string;
  description?: string;
  transaction_code?: string;
  avs: string;
  batch: string;
  order_num: string;
  verbiage: string;
  transaction_settlement_status?: string;
  effective_date?: string;
  routing?: string;
  return_date?: string;
  created_ts: number;
  modified_ts: number;
  transaction_api_id?: string;
  terms_agree: number;
  notification_email_address?: string;
  notification_email_sent: boolean;
  response_message?: string;
  auth_amount: string;
  auth_code: string;
  status_id: number;
  type_id: number;
  location_id: string;
  reason_code_id: number;
  contact_id: string;
  billing_zip: string;
  billing_street: string;
  product_transaction_id: string;
  avs_enhanced: string;
  cvv_response: string;
  billing_phone?: string;
  billing_city: string;
  billing_state: string;
  clerk_number?: string;
  tip_amount: string;
  created_user_id: string;
  modified_user_id: string;
  ach_identifier?: string;
  check_number?: string;
  settle_date?: string;
  charge_back_date?: string;
  void_date?: string;
  account_type: string;
  is_recurring: boolean;
  is_accountvault: boolean;
};

export type CreateContactRequestAction = {
  type: typeof CREATE_CONTACT_REQUEST;
};

export type CreateContactSuccessAction = {
  type: typeof CREATE_CONTACT_SUCCESS;
  payload: FortispayContactResponseType;
};

export type CreateContactFailureAction = {
  type: typeof CREATE_CONTACT_FAILURE;
};

export type CreateAccountvaultRequestAction = {
  type: typeof CREATE_ACCOUNTVAULT_REQUEST;
};

export type CreateAccountvaultSuccessAction = {
  type: typeof CREATE_ACCOUNTVAULT_SUCCESS;
  payload: FortispayAccountvaultResponseType;
};

export type CreateAccountvaultFailureAction = {
  type: typeof CREATE_ACCOUNTVAULT_FAILURE;
};

export type GetAccountvaultRequestAction = {
  type: typeof GET_ACCOUNTVAULT_REQUEST;
};

export type GetAccountvaultSuccessAction = {
  type: typeof GET_ACCOUNTVAULT_SUCCESS;
  payload: Array<FortispayAccountvaultResponseType>;
};

export type GetAccountvaultFailureAction = {
  type: typeof GET_ACCOUNTVAULT_FAILURE;
};

export type UpdateAccountvaultRequestAction = {
  type: typeof UPDATE_ACCOUNTVAULT_REQUEST;
};
export type UpdateAccountvaultSuccessAction = {
  type: typeof UPDATE_ACCOUNTVAULT_SUCCESS;
  payload: FortispayAccountvaultResponseType;
};
export type UpdateAccountvaultFailureAction = {
  type: typeof UPDATE_ACCOUNTVAULT_FAILURE;
};

export type DeleteAccountvaultRequestAction = {
  type: typeof DELETE_ACCOUNTVAULT_REQUEST;
  payload: { id: string };
};

export type DeleteAccountvaultSuccessAction = {
  type: typeof DELETE_ACCOUNTVAULT_SUCCESS;
};

export type DeleteAccountvaultFailureAction = {
  type: typeof DELETE_ACCOUNTVAULT_FAILURE;
};

export type CreateRecurringRequestAction = {
  type: typeof CREATE_RECURRING_REQUEST;
};

export type CreateRecurringSuccessAction = {
  type: typeof CREATE_RECURRING_SUCCESS;
  payload: Array<FortispayRecurringResponseType>;
};

export type CreateRecurringFailureAction = {
  type: typeof CREATE_RECURRING_FAILURE;
};

export type EditRecurringRequestAction = {
  type: typeof EDIT_RECURRING_REQUEST;
};
export type EditRecurringSuccessAction = {
  type: typeof EDIT_RECURRING_SUCCESS;
  payload: FortispayRecurringResponseType;
};
export type EditRecurringFailureAction = {
  type: typeof EDIT_RECURRING_FAILURE;
};

export type GetRecurringRequestAction = {
  type: typeof GET_RECURRING_REQUEST;
};
export type GetRecurringSuccessAction = {
  type: typeof GET_RECURRING_SUCCESS;
  payload: Array<FortispayRecurringResponseType>;
};
export type GetRecurringFailureAction = {
  type: typeof GET_RECURRING_FAILURE;
};

export type GetTransactionsRequestAction = {
  type: typeof GET_TRANSACTIONS_REQUEST;
};
export type GetTransactionsSuccessAction = {
  type: typeof GET_TRANSACTIONS_SUCCESS;
  payload: Array<FortispayTransactionResponseType>;
};
export type GetTransactionsFailureAction = {
  type: typeof GET_TRANSACTIONS_FAILURE;
};

export type PostSingleFortispayTransactionRequestAction = {
  type: typeof POST_SINGLE_TRANSACTION_REQUEST;
};
export type PostSingleFortispayTransactionSuccessAction = {
  type: typeof POST_SINGLE_TRANSACTION_SUCCESS;
  payload: FortispayTransactionResponseType;
};
export type PostSingleFortispayTransactionFailureAction = {
  type: typeof POST_SINGLE_TRANSACTION_FAILURE;
};

export type FortispayStoreActions =
  | CreateContactRequestAction
  | CreateContactSuccessAction
  | CreateContactFailureAction
  | CreateAccountvaultRequestAction
  | CreateAccountvaultSuccessAction
  | CreateAccountvaultFailureAction
  | GetAccountvaultRequestAction
  | GetAccountvaultSuccessAction
  | GetAccountvaultFailureAction
  | CreateRecurringRequestAction
  | CreateRecurringSuccessAction
  | CreateRecurringFailureAction
  | EditRecurringRequestAction
  | EditRecurringSuccessAction
  | EditRecurringFailureAction
  | GetRecurringRequestAction
  | GetRecurringSuccessAction
  | GetRecurringFailureAction
  | UpdateAccountvaultRequestAction
  | UpdateAccountvaultSuccessAction
  | UpdateAccountvaultFailureAction
  | DeleteAccountvaultRequestAction
  | DeleteAccountvaultSuccessAction
  | DeleteAccountvaultFailureAction
  | GetTransactionsRequestAction
  | GetTransactionsSuccessAction
  | GetTransactionsFailureAction
  | PostSingleFortispayTransactionRequestAction
  | PostSingleFortispayTransactionSuccessAction
  | PostSingleFortispayTransactionFailureAction
  | LogoutRequestAction;
