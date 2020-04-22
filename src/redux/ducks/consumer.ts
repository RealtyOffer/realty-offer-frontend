import { RSAA } from 'redux-api-middleware';

import {
  CREATE_CONSUMER_PROFILE_ENDPOINT,
  CONSUMER_BANNERS_ENDPOINT,
  CONSUMER_CITIES_ENDPOINT,
} from '../constants';

import { ConsumerStoreType, SignupDataType, ConsumerStoreActions } from './consumer.d';

export const CAPTURE_CONSUMER_DATA = 'CAPTURE_CONSUMER_DATA';

export const CREATE_CONSUMER_PROFILE_REQUEST = 'CREATE_CONSUMER_PROFILE_REQUEST';
export const CREATE_CONSUMER_PROFILE_SUCCESS = 'CREATE_CONSUMER_PROFILE_SUCCESS';
export const CREATE_CONSUMER_PROFILE_FAILURE = 'CREATE_CONSUMER_PROFILE_FAILURE';

export const GET_CONSUMER_BANNERS_REQUEST = 'GET_CONSUMER_BANNERS_REQUEST';
export const GET_CONSUMER_BANNERS_SUCCESS = 'GET_CONSUMER_BANNERS_SUCCESS';
export const GET_CONSUMER_BANNERS_FAILURE = 'GET_CONSUMER_BANNERS_FAILURE';

export const GET_CONSUMER_CITIES_REQUEST = 'GET_CONSUMER_CITIES_REQUEST';
export const GET_CONSUMER_CITIES_SUCCESS = 'GET_CONSUMER_CITIES_SUCCESS';
export const GET_CONSUMER_CITIES_FAILURE = 'GET_CONSUMER_CITIES_FAILURE';

export const initialState: ConsumerStoreType = {
  signupData: {},
  isLoading: false,
  hasError: false,
  banners: [],
  cities: [],
};

export default (
  state: ConsumerStoreType = initialState,
  action: ConsumerStoreActions
): ConsumerStoreType => {
  switch (action.type) {
    case CAPTURE_CONSUMER_DATA:
      return {
        ...state,
        // if payload is empty object, reset the signupData object to empty
        // so the signup process can be started over from scratch
        signupData:
          Object.keys(action.payload).length === 0
            ? {}
            : {
                ...state.signupData,
                ...action.payload,
              },
      };
    case CREATE_CONSUMER_PROFILE_REQUEST:
    case GET_CONSUMER_BANNERS_REQUEST:
    case GET_CONSUMER_CITIES_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case CREATE_CONSUMER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        signupData: {
          ...action.payload,
        },
      };
    case GET_CONSUMER_BANNERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        banners: [...action.payload],
      };
    case GET_CONSUMER_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        cities: [...action.payload],
      };
    case CREATE_CONSUMER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case GET_CONSUMER_BANNERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        banners: [],
      };
    case GET_CONSUMER_CITIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        cities: [],
      };
    default:
      return state;
  }
};

export const captureConsumerData = (payload: SignupDataType) => ({
  type: CAPTURE_CONSUMER_DATA,
  payload,
});

export const createConsumerProfile = (payload: SignupDataType) => ({
  [RSAA]: {
    endpoint: CREATE_CONSUMER_PROFILE_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [
      CREATE_CONSUMER_PROFILE_REQUEST,
      CREATE_CONSUMER_PROFILE_SUCCESS,
      CREATE_CONSUMER_PROFILE_FAILURE,
    ],
  },
});

export const getConsumerSiteBanners = () => ({
  [RSAA]: {
    endpoint: CONSUMER_BANNERS_ENDPOINT,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      GET_CONSUMER_BANNERS_REQUEST,
      GET_CONSUMER_BANNERS_SUCCESS,
      GET_CONSUMER_BANNERS_FAILURE,
    ],
  },
});

export const getConsumerCities = () => ({
  [RSAA]: {
    endpoint: CONSUMER_CITIES_ENDPOINT,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [GET_CONSUMER_CITIES_REQUEST, GET_CONSUMER_CITIES_SUCCESS, GET_CONSUMER_CITIES_FAILURE],
  },
});
