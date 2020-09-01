import { RSAA } from 'redux-api-middleware';

import { LOGOUT_REQUEST } from './auth';
import {
  FORTISPAY_ENDPOINT,
} from '../constants';

import { FortispayStoreType, FortispayStoreActions } from './fortis.d';

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
        ...action.payload,
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
        ...action.payload
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

export const createFortispayContact = (payload: any) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'contact', ...payload }),
    types: [
      CREATE_CONTACT_REQUEST,
      CREATE_CONTACT_SUCCESS,
      CREATE_CONTACT_FAILURE,
    ],
  },
});

export const createFortispayAccountvault = (payload: any) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'accountvault', ...payload }),
    types: [
      CREATE_ACCOUNTVAULT_REQUEST,
      CREATE_ACCOUNTVAULT_SUCCESS,
      CREATE_ACCOUNTVAULT_FAILURE,
    ],
  },
});

export const createFortispayRecurring = (payload: any) => ({
  [RSAA]: {
    endpoint: FORTISPAY_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({ type: 'recurring', ...payload }),
    types: [
      CREATE_RECURRING_REQUEST,
      CREATE_RECURRING_SUCCESS,
      CREATE_RECURRING_FAILURE,
    ],
  },
});
