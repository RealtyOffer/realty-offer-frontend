import { RSAA } from 'redux-api-middleware';

import {
  DROPDOWN_LIST_GENDERS_ENDPOINT,
  DROPDOWN_LIST_GENDER_PREFERENCES_ENDPOINT,
  DROPDOWN_LIST_AGE_PREFERENCES_ENDPOINT,
  DROPDOWN_LIST_LANGUAGES_ENDPOINT,
  DROPDOWN_LIST_PRICE_RANGES_ENDPOINT,
  DROPDOWN_LIST_STATES_ENDPOINT,
  DROPDOWN_LIST_HOME_TYPES_ENDPOINT,
} from '../constants';
import { DropdownStoreType, DropdownActionTypes } from './dropdowns.d';

export const GET_GENDERS_LIST_REQUEST = 'GET_GENDERS_LIST_REQUEST';
export const GET_GENDERS_LIST_SUCCESS = 'GET_GENDERS_LIST_SUCCESS';
export const GET_GENDERS_LIST_FAILURE = 'GET_GENDERS_LIST_FAILURE';

export const GET_GENDER_PREFERENCES_LIST_REQUEST = 'GET_GENDER_PREFERENCES_LIST_REQUEST';
export const GET_GENDER_PREFERENCES_LIST_SUCCESS = 'GET_GENDER_PREFERENCES_LIST_SUCCESS';
export const GET_GENDER_PREFERENCES_LIST_FAILURE = 'GET_GENDER_PREFERENCES_LIST_FAILURE';

export const GET_AGE_PREFERENCES_LIST_REQUEST = 'GET_AGE_PREFERENCES_LIST_REQUEST';
export const GET_AGE_PREFERENCES_LIST_SUCCESS = 'GET_AGE_PREFERENCES_LIST_SUCCESS';
export const GET_AGE_PREFERENCES_LIST_FAILURE = 'GET_AGE_PREFERENCES_LIST_FAILURE';

export const GET_LANGUAGES_LIST_REQUEST = 'GET_LANGUAGES_LIST_REQUEST';
export const GET_LANGUAGES_LIST_SUCCESS = 'GET_LANGUAGES_LIST_SUCCESS';
export const GET_LANGUAGES_LIST_FAILURE = 'GET_LANGUAGES_LIST_FAILURE';

export const GET_STATES_LIST_REQUEST = 'GET_STATES_LIST_REQUEST';
export const GET_STATES_LIST_SUCCESS = 'GET_STATES_LIST_SUCCESS';
export const GET_STATES_LIST_FAILURE = 'GET_STATES_LIST_FAILURE';

export const GET_PRICE_RANGES_LIST_REQUEST = 'GET_PRICE_RANGES_LIST_REQUEST';
export const GET_PRICE_RANGES_LIST_SUCCESS = 'GET_PRICE_RANGES_LIST_SUCCESS';
export const GET_PRICE_RANGES_LIST_FAILURE = 'GET_PRICE_RANGES_LIST_FAILURE';

export const GET_HOME_TYPES_LIST_REQUEST = 'GET_HOME_TYPES_LIST_REQUEST';
export const GET_HOME_TYPES_LIST_SUCCESS = 'GET_HOME_TYPES_LIST_SUCCESS';
export const GET_HOME_TYPES_LIST_FAILURE = 'GET_HOME_TYPES_LIST_FAILURE';

export const initialState: DropdownStoreType = {
  genders: {
    isLoading: false,
    hasError: false,
    list: [],
  },
  genderPreferences: {
    isLoading: false,
    hasError: false,
    list: [],
  },
  agePreferences: {
    isLoading: false,
    hasError: false,
    list: [],
  },
  languages: {
    isLoading: false,
    hasError: false,
    list: [],
  },
  states: {
    isLoading: false,
    hasError: false,
    list: [],
  },
  priceRanges: {
    isLoading: false,
    hasError: false,
    list: [],
  },
  homeTypes: {
    isLoading: false,
    hasError: false,
    list: [],
  },
};

export default (
  state: DropdownStoreType = initialState,
  action: DropdownActionTypes
): DropdownStoreType => {
  switch (action.type) {
    case GET_GENDERS_LIST_REQUEST:
      return {
        ...state,
        genders: {
          isLoading: true,
          hasError: false,
          list: [],
        },
      };
    case GET_GENDERS_LIST_SUCCESS:
      return {
        ...state,
        genders: {
          isLoading: false,
          hasError: false,
          list: [...action.payload],
        },
      };
    case GET_GENDERS_LIST_FAILURE:
      return {
        ...state,
        genders: {
          isLoading: false,
          hasError: true,
          list: [],
        },
      };
    case GET_GENDER_PREFERENCES_LIST_REQUEST:
      return {
        ...state,
        genderPreferences: {
          isLoading: true,
          hasError: false,
          list: [],
        },
      };
    case GET_GENDER_PREFERENCES_LIST_SUCCESS:
      return {
        ...state,
        genderPreferences: {
          isLoading: false,
          hasError: false,
          list: [...action.payload],
        },
      };
    case GET_GENDER_PREFERENCES_LIST_FAILURE:
      return {
        ...state,
        genderPreferences: {
          isLoading: false,
          hasError: true,
          list: [],
        },
      };
    case GET_AGE_PREFERENCES_LIST_REQUEST:
      return {
        ...state,
        agePreferences: {
          isLoading: true,
          hasError: false,
          list: [],
        },
      };
    case GET_AGE_PREFERENCES_LIST_SUCCESS:
      return {
        ...state,
        agePreferences: {
          isLoading: false,
          hasError: false,
          list: [...action.payload],
        },
      };
    case GET_AGE_PREFERENCES_LIST_FAILURE:
      return {
        ...state,
        agePreferences: {
          isLoading: false,
          hasError: true,
          list: [],
        },
      };
    case GET_LANGUAGES_LIST_REQUEST:
      return {
        ...state,
        languages: {
          isLoading: true,
          hasError: false,
          list: [],
        },
      };
    case GET_LANGUAGES_LIST_SUCCESS:
      return {
        ...state,
        languages: {
          isLoading: false,
          hasError: false,
          list: [...action.payload],
        },
      };
    case GET_LANGUAGES_LIST_FAILURE:
      return {
        ...state,
        languages: {
          isLoading: false,
          hasError: true,
          list: [],
        },
      };
    case GET_STATES_LIST_REQUEST:
      return {
        ...state,
        states: {
          isLoading: true,
          hasError: false,
          list: [],
        },
      };
    case GET_STATES_LIST_SUCCESS:
      return {
        ...state,
        states: {
          isLoading: false,
          hasError: false,
          list: [...action.payload],
        },
      };
    case GET_STATES_LIST_FAILURE:
      return {
        ...state,
        states: {
          isLoading: false,
          hasError: true,
          list: [],
        },
      };
    case GET_PRICE_RANGES_LIST_REQUEST:
      return {
        ...state,
        priceRanges: {
          isLoading: true,
          hasError: false,
          list: [],
        },
      };
    case GET_PRICE_RANGES_LIST_SUCCESS:
      return {
        ...state,
        priceRanges: {
          isLoading: false,
          hasError: false,
          list: [...action.payload],
        },
      };
    case GET_PRICE_RANGES_LIST_FAILURE:
      return {
        ...state,
        priceRanges: {
          isLoading: false,
          hasError: true,
          list: [],
        },
      };
    case GET_HOME_TYPES_LIST_REQUEST:
      return {
        ...state,
        homeTypes: {
          isLoading: true,
          hasError: false,
          list: [],
        },
      };
    case GET_HOME_TYPES_LIST_SUCCESS:
      return {
        ...state,
        homeTypes: {
          isLoading: false,
          hasError: false,
          list: [...action.payload],
        },
      };
    case GET_HOME_TYPES_LIST_FAILURE:
      return {
        ...state,
        homeTypes: {
          isLoading: false,
          hasError: true,
          list: [],
        },
      };
    default:
      return state;
  }
};

export const getGendersList = () => ({
  [RSAA]: {
    endpoint: DROPDOWN_LIST_GENDERS_ENDPOINT,
    method: 'GET',
    types: [GET_GENDERS_LIST_REQUEST, GET_GENDERS_LIST_SUCCESS, GET_GENDERS_LIST_FAILURE],
  },
});

export const getGenderPreferencesList = () => ({
  [RSAA]: {
    endpoint: DROPDOWN_LIST_GENDER_PREFERENCES_ENDPOINT,
    method: 'GET',
    types: [
      GET_GENDER_PREFERENCES_LIST_REQUEST,
      GET_GENDER_PREFERENCES_LIST_SUCCESS,
      GET_GENDER_PREFERENCES_LIST_FAILURE,
    ],
  },
});

export const getAgePreferencesList = () => ({
  [RSAA]: {
    endpoint: DROPDOWN_LIST_AGE_PREFERENCES_ENDPOINT,
    method: 'GET',
    types: [
      GET_AGE_PREFERENCES_LIST_REQUEST,
      GET_AGE_PREFERENCES_LIST_SUCCESS,
      GET_AGE_PREFERENCES_LIST_FAILURE,
    ],
  },
});

export const getLanguagesList = () => ({
  [RSAA]: {
    endpoint: DROPDOWN_LIST_LANGUAGES_ENDPOINT,
    method: 'GET',
    types: [GET_LANGUAGES_LIST_REQUEST, GET_LANGUAGES_LIST_SUCCESS, GET_LANGUAGES_LIST_FAILURE],
  },
});

export const getStatesList = () => ({
  [RSAA]: {
    endpoint: DROPDOWN_LIST_STATES_ENDPOINT,
    method: 'GET',
    types: [GET_STATES_LIST_REQUEST, GET_STATES_LIST_SUCCESS, GET_STATES_LIST_FAILURE],
  },
});

export const getPriceRangesList = () => ({
  [RSAA]: {
    endpoint: DROPDOWN_LIST_PRICE_RANGES_ENDPOINT,
    method: 'GET',
    types: [
      GET_PRICE_RANGES_LIST_REQUEST,
      GET_PRICE_RANGES_LIST_SUCCESS,
      GET_PRICE_RANGES_LIST_FAILURE,
    ],
  },
});

export const getHomeTypesList = () => ({
  [RSAA]: {
    endpoint: DROPDOWN_LIST_HOME_TYPES_ENDPOINT,
    method: 'GET',
    types: [GET_HOME_TYPES_LIST_REQUEST, GET_HOME_TYPES_LIST_SUCCESS, GET_HOME_TYPES_LIST_FAILURE],
  },
});
