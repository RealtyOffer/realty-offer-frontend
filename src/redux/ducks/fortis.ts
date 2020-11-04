import { RSAA } from 'redux-api-middleware';

import { LOGOUT_REQUEST } from './auth';
import { FORTISPAY_ENDPOINT } from '../constants';

import {
  FortispayStoreType,
  FortispayStoreActions,
  FortispayContactType,
  FortispayRecurringType,
  FortispayAccountvaultType,
  FortispayAccountvaultResponseType,
  FortispayRecurringResponseType,
} from './fortis.d';

export const CREATE_CONTACT_REQUEST = 'CREATE_CONTACT_REQUEST';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE';

export const CREATE_ACCOUNTVAULT_REQUEST = 'CREATE_ACCOUNTVAULT_REQUEST';
export const CREATE_ACCOUNTVAULT_SUCCESS = 'CREATE_ACCOUNTVAULT_SUCCESS';
export const CREATE_ACCOUNTVAULT_FAILURE = 'CREATE_ACCOUNTVAULT_FAILURE';

export const GET_ACCOUNTVAULT_REQUEST = 'GET_ACCOUNTVAULT_REQUEST';
export const GET_ACCOUNTVAULT_SUCCESS = 'GET_ACCOUNTVAULT_SUCCESS';
export const GET_ACCOUNTVAULT_FAILURE = 'GET_ACCOUNTVAULT_FAILURE';

export const UPDATE_ACCOUNTVAULT_REQUEST = 'UPDATE_ACCOUNTVAULT_REQUEST';
export const UPDATE_ACCOUNTVAULT_SUCCESS = 'UPDATE_ACCOUNTVAULT_SUCCESS';
export const UPDATE_ACCOUNTVAULT_FAILURE = 'UPDATE_ACCOUNTVAULT_FAILURE';

export const DELETE_ACCOUNTVAULT_REQUEST = 'DELETE_ACCOUNTVAULTS_REQUEST';
export const DELETE_ACCOUNTVAULT_SUCCESS = 'DELETE_ACCOUNTVAULTS_SUCCESS';
export const DELETE_ACCOUNTVAULT_FAILURE = 'DELETE_ACCOUNTVAULTS_FAILURE';

export const CREATE_RECURRING_REQUEST = 'CREATE_RECURRING_REQUEST';
export const CREATE_RECURRING_SUCCESS = 'CREATE_RECURRING_SUCCESS';
export const CREATE_RECURRING_FAILURE = 'CREATE_RECURRING_FAILURE';

export const GET_RECURRING_REQUEST = 'GET_RECURRING_REQUEST';
export const GET_RECURRING_SUCCESS = 'GET_RECURRING_SUCCESS';
export const GET_RECURRING_FAILURE = 'GET_RECURRING_FAILURE';

export const EDIT_RECURRING_REQUEST = 'EDIT_RECURRING_REQUEST';
export const EDIT_RECURRING_SUCCESS = 'EDIT_RECURRING_SUCCESS';
export const EDIT_RECURRING_FAILURE = 'EDIT_RECURRING_FAILURE';

export const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const GET_TRANSACTIONS_FAILURE = 'GET_TRANSACTIONS_FAILURE';

export const initialState: FortispayStoreType = {
  isLoading: false,
  hasError: false,
  contact: undefined,
  recurring: [],
  accountVaults: [],
  transactions: [],
};

export default (
  state: FortispayStoreType = initialState,
  action: FortispayStoreActions
): FortispayStoreType => {
  switch (action.type) {
    case CREATE_CONTACT_REQUEST:
    case CREATE_RECURRING_REQUEST:
    case CREATE_ACCOUNTVAULT_REQUEST:
    case GET_RECURRING_REQUEST:
    case GET_ACCOUNTVAULT_REQUEST:
    case EDIT_RECURRING_REQUEST:
    case GET_TRANSACTIONS_REQUEST:
    case UPDATE_ACCOUNTVAULT_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case DELETE_ACCOUNTVAULT_REQUEST: {
      const {
        payload: { id },
      } = action;

      return {
        ...state,
        isLoading: true,
        hasError: false,
        accountVaults: state.accountVaults.filter((accountVault) => accountVault.id !== id),
      };
    }
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
        recurring: action.payload,
      };
    case CREATE_ACCOUNTVAULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        accountVaults: [...state.accountVaults, action.payload],
      };
    case UPDATE_ACCOUNTVAULT_SUCCESS: {
      const index = state.accountVaults.findIndex((x: any) => x.id === action.payload.id);
      const accountVaults = [
        ...state.accountVaults.slice(0, index),
        ...state.accountVaults.slice(index + 1),
      ];

      if (index === -1) {
        return state;
      }
      return {
        ...state,
        isLoading: false,
        hasError: false,
        accountVaults,
      };
    }
    case GET_ACCOUNTVAULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        accountVaults: action.payload,
      };
    case GET_RECURRING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        recurring: action.payload,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        transactions: [...action.payload],
      };

    case EDIT_RECURRING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        recurring: [action.payload],
      };
    case DELETE_ACCOUNTVAULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        accountVaults: state.accountVaults,
      };
    case GET_ACCOUNTVAULT_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        accountVaults: initialState.accountVaults,
      };
    case DELETE_ACCOUNTVAULT_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case UPDATE_ACCOUNTVAULT_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        accountVaults: state.accountVaults,
      };
    case CREATE_RECURRING_FAILURE:
    case CREATE_CONTACT_FAILURE:
    case CREATE_ACCOUNTVAULT_FAILURE:
    case GET_RECURRING_FAILURE:
    case EDIT_RECURRING_FAILURE:
    case GET_TRANSACTIONS_FAILURE:
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

export const createFortispayAccountvault = (payload: FortispayAccountvaultType) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'accountvault', ...payload }),
    types: [CREATE_ACCOUNTVAULT_REQUEST, CREATE_ACCOUNTVAULT_SUCCESS, CREATE_ACCOUNTVAULT_FAILURE],
  },
});

export const getFortispayAccountvaults = (payload: { contact_id: string }) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'getaccountvault', ...payload }),
    types: [GET_ACCOUNTVAULT_REQUEST, GET_ACCOUNTVAULT_SUCCESS, GET_ACCOUNTVAULT_FAILURE],
  },
});

export const updateFortispayAccountvault = (payload: FortispayAccountvaultResponseType) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'editaccountvault', ...payload }),
    types: [UPDATE_ACCOUNTVAULT_REQUEST, UPDATE_ACCOUNTVAULT_SUCCESS, UPDATE_ACCOUNTVAULT_FAILURE],
  },
});

export const deleteFortispayAccountvault = (payload: { id: string }) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'deleteaccountvault', ...payload }),
    types: [
      { type: DELETE_ACCOUNTVAULT_REQUEST, payload: { id: payload.id } },
      DELETE_ACCOUNTVAULT_SUCCESS,
      DELETE_ACCOUNTVAULT_FAILURE,
    ],
  },
});

export const createFortispayRecurring = (payload: FortispayRecurringType) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'recurring', ...payload }),
    types: [CREATE_RECURRING_REQUEST, CREATE_RECURRING_SUCCESS, CREATE_RECURRING_FAILURE],
  },
});

export const editFortispayRecurring = (payload: FortispayRecurringResponseType) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'editrecurring', ...payload }),
    types: [EDIT_RECURRING_REQUEST, EDIT_RECURRING_SUCCESS, EDIT_RECURRING_FAILURE],
  },
});

export const getFortispayRecurrings = (payload: { contact_id: string }) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'getrecurring', ...payload }),
    types: [GET_RECURRING_REQUEST, GET_RECURRING_SUCCESS, GET_RECURRING_FAILURE],
  },
});

export const getFortispayTransactions = (payload: { contact_id: string }) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'gettransactions', ...payload }),
    types: [GET_TRANSACTIONS_REQUEST, GET_TRANSACTIONS_SUCCESS, GET_TRANSACTIONS_FAILURE],
  },
});
