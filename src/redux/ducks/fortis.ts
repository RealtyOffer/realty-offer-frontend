import { RSAA } from 'redux-api-middleware';

import { LOGOUT_REQUEST } from './auth';
import { FORTISPAY_ENDPOINT } from '../constants';

import { FortispayStoreType, FortispayStoreActions, FortispayContactType } from './fortis.d';

export const CREATE_CONTACT_REQUEST = 'CREATE_CONTACT_REQUEST';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE';

export const CREATE_ACCOUNTVAULT_REQUEST = 'CREATE_ACCOUNTVAULT_REQUEST';
export const CREATE_ACCOUNTVAULT_SUCCESS = 'CREATE_ACCOUNTVAULT_SUCCESS';
export const CREATE_ACCOUNTVAULT_FAILURE = 'CREATE_ACCOUNTVAULT_FAILURE';

export const CREATE_RECURRING_REQUEST = 'CREATE_RECURRING_REQUEST';
export const CREATE_RECURRING_SUCCESS = 'CREATE_RECURRING_SUCCESS';
export const CREATE_RECURRING_FAILURE = 'CREATE_RECURRING_FAILURE';

export const initialState: FortispayStoreType = {
  isLoading: false,
  hasError: false,
  contact: undefined,
};

export default (
  state: FortispayStoreType = initialState,
  action: FortispayStoreActions
): FortispayStoreType => {
  switch (action.type) {
    case CREATE_CONTACT_REQUEST:
    case CREATE_RECURRING_REQUEST:
    case CREATE_ACCOUNTVAULT_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        contact: { ...action.payload },
      };
    case CREATE_RECURRING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        ...action.payload,
      };
    case CREATE_ACCOUNTVAULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        ...action.payload,
      };
    case CREATE_RECURRING_FAILURE:
    case CREATE_CONTACT_FAILURE:
    case CREATE_ACCOUNTVAULT_FAILURE:
    case LOGOUT_REQUEST:
      return { ...initialState };
    default:
      return state;
  }
};

export const createFortispayContact = (payload: FortispayContactType) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'contact', ...payload }),
    types: [CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, CREATE_CONTACT_FAILURE],
  },
});

export const createFortispayAccountvault = (payload: {
  payment_method: 'cc' | 'ach';
  contact_id: string;
  email: string;
  account_holder_name: string;
  account_number: string;
  exp_date: string;
  billing_address: string;
  billing_city?: string;
  billing_phone?: string;
  billing_state?: string;
  billing_zip?: string;
  customer_id?: string;
  previous_account_vault_api_id?: string;
  previous_account_vault_id?: string;
  previous_transaction_api_id?: string;
  previous_transaction_id?: string;
  title?: string;
}) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'accountvault', ...payload }),
    types: [CREATE_ACCOUNTVAULT_REQUEST, CREATE_ACCOUNTVAULT_SUCCESS, CREATE_ACCOUNTVAULT_FAILURE],
  },
});

export const createFortispayRecurring = (payload: {
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
}) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'recurring', ...payload }),
    types: [CREATE_RECURRING_REQUEST, CREATE_RECURRING_SUCCESS, CREATE_RECURRING_FAILURE],
  },
});
