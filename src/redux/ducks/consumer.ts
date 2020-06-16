import { RSAA } from 'redux-api-middleware';

import { LOGOUT_REQUEST } from './auth';
import { CREATE_CONSUMER_PROFILE_ENDPOINT, SECURED_CONSUMER_PROFILE_ENDPOINT } from '../constants';

import { ConsumerStoreType, ConsumerProfileType, ConsumerStoreActions } from './consumer.d';
import { ListingType } from './listings.d';

export const CAPTURE_CONSUMER_DATA = 'CAPTURE_CONSUMER_DATA';

export const CREATE_CONSUMER_PROFILE_REQUEST = 'CREATE_CONSUMER_PROFILE_REQUEST';
export const CREATE_CONSUMER_PROFILE_SUCCESS = 'CREATE_CONSUMER_PROFILE_SUCCESS';
export const CREATE_CONSUMER_PROFILE_FAILURE = 'CREATE_CONSUMER_PROFILE_FAILURE';

export const UPDATE_CONSUMER_PROFILE_REQUEST = 'UPDATE_CONSUMER_PROFILE_REQUEST';
export const UPDATE_CONSUMER_PROFILE_SUCCESS = 'UPDATE_CONSUMER_PROFILE_SUCCESS';
export const UPDATE_CONSUMER_PROFILE_FAILURE = 'UPDATE_CONSUMER_PROFILE_FAILURE';

export const GET_CONSUMER_PROFILE_REQUEST = 'GET_CONSUMER_PROFILE_REQUEST';
export const GET_CONSUMER_PROFILE_SUCCESS = 'GET_CONSUMER_PROFILE_SUCCESS';
export const GET_CONSUMER_PROFILE_FAILURE = 'GET_CONSUMER_PROFILE_FAILURE';

export const GET_CONSUMER_BANNERS_REQUEST = 'GET_CONSUMER_BANNERS_REQUEST';
export const GET_CONSUMER_BANNERS_SUCCESS = 'GET_CONSUMER_BANNERS_SUCCESS';
export const GET_CONSUMER_BANNERS_FAILURE = 'GET_CONSUMER_BANNERS_FAILURE';

export const GET_CONSUMER_CITIES_REQUEST = 'GET_CONSUMER_CITIES_REQUEST';
export const GET_CONSUMER_CITIES_SUCCESS = 'GET_CONSUMER_CITIES_SUCCESS';
export const GET_CONSUMER_CITIES_FAILURE = 'GET_CONSUMER_CITIES_FAILURE';

export const initialState: ConsumerStoreType = {
  isLoading: false,
  hasError: false,
  listing: {},
  profile: {},
};

export default (
  state: ConsumerStoreType = initialState,
  action: ConsumerStoreActions
): ConsumerStoreType => {
  switch (action.type) {
    case CAPTURE_CONSUMER_DATA:
      return {
        ...state,
        // if payload is empty object, reset the listing object to empty
        // so the signup process can be started over from scratch
        listing:
          Object.keys(action.payload).length === 0
            ? {}
            : {
                ...state.listing,
                ...action.payload,
              },
      };
    case CREATE_CONSUMER_PROFILE_REQUEST:
    case GET_CONSUMER_PROFILE_REQUEST:
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
        listing: {
          ...action.payload.listing,
        },
        profile: {
          ...action.payload.profile,
        },
      };
    case GET_CONSUMER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        ...action.payload,
      };
    case GET_CONSUMER_PROFILE_FAILURE:
    case CREATE_CONSUMER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case LOGOUT_REQUEST:
      return { ...initialState };
    default:
      return state;
  }
};

export const captureConsumerData = (payload: ListingType) => ({
  type: CAPTURE_CONSUMER_DATA,
  payload,
});

export const createConsumerProfile = (payload: {
  email: string;
  listing: ListingType;
  profile: ConsumerProfileType;
}) => ({
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

export const updateConsumerProfile = (payload: {
  listing: ListingType;
  profile: ConsumerProfileType;
}) => ({
  [RSAA]: {
    endpoint: SECURED_CONSUMER_PROFILE_ENDPOINT,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [
      UPDATE_CONSUMER_PROFILE_REQUEST,
      UPDATE_CONSUMER_PROFILE_SUCCESS,
      UPDATE_CONSUMER_PROFILE_FAILURE,
    ],
  },
});

export const getConsumerProfile = () => ({
  [RSAA]: {
    endpoint: SECURED_CONSUMER_PROFILE_ENDPOINT,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      GET_CONSUMER_PROFILE_REQUEST,
      GET_CONSUMER_PROFILE_SUCCESS,
      GET_CONSUMER_PROFILE_FAILURE,
    ],
  },
});
