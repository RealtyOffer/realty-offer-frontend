import { RSAA } from 'redux-api-middleware';
// import { differenceInSeconds } from 'date-fns';

import { LISTINGS_ENDPOINT } from '../constants';
import { LOGOUT_REQUEST } from './auth';
// import { RootState } from './index';

import { ListingStoreType, ListingsStoreActions } from './listings.d';

export const GET_NEW_LISTINGS_REQUEST = 'GET_NEW_LISTINGS_REQUEST';
export const GET_NEW_LISTINGS_SUCCESS = 'GET_NEW_LISTINGS_SUCCESS';
export const GET_NEW_LISTINGS_FAILURE = 'GET_NEW_LISTINGS_FAILURE';

export const GET_PENDING_LISTINGS_REQUEST = 'GET_PENDING_LISTINGS_REQUEST';
export const GET_PENDING_LISTINGS_SUCCESS = 'GET_PENDING_LISTINGS_SUCCESS';
export const GET_PENDING_LISTINGS_FAILURE = 'GET_PENDING_LISTINGS_FAILURE';

export const GET_AWARDED_LISTINGS_REQUEST = 'GET_AWARDED_LISTINGS_REQUEST';
export const GET_AWARDED_LISTINGS_SUCCESS = 'GET_AWARDED_LISTINGS_SUCCESS';
export const GET_AWARDED_LISTINGS_FAILURE = 'GET_AWARDED_LISTINGS_FAILURE';

export const GET_HISTORY_LISTINGS_REQUEST = 'GET_HISTORY_LISTINGS_REQUEST';
export const GET_HISTORY_LISTINGS_SUCCESS = 'GET_HISTORY_LISTINGS_SUCCESS';
export const GET_HISTORY_LISTINGS_FAILURE = 'GET_HISTORY_LISTINGS_FAILURE';

export const initialState: ListingStoreType = {
  isLoading: false,
  hasError: false,
  lastFetched: undefined,
  new: [],
  pending: [],
  awarded: [],
  history: [],
};

export default (
  state: ListingStoreType = initialState,
  action: ListingsStoreActions
): ListingStoreType => {
  switch (action.type) {
    case GET_NEW_LISTINGS_REQUEST:
    case GET_PENDING_LISTINGS_REQUEST:
    case GET_AWARDED_LISTINGS_REQUEST:
    case GET_HISTORY_LISTINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case GET_NEW_LISTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        lastFetched: new Date(),
        new: [...action.payload],
      };
    case GET_PENDING_LISTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        lastFetched: new Date(),
        pending: [...action.payload],
      };
    case GET_AWARDED_LISTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        lastFetched: new Date(),
        awarded: [...action.payload],
      };
    case GET_HISTORY_LISTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        lastFetched: new Date(),
        history: [...action.payload],
      };
    case GET_NEW_LISTINGS_FAILURE:
    case GET_PENDING_LISTINGS_FAILURE:
    case GET_AWARDED_LISTINGS_FAILURE:
    case GET_HISTORY_LISTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        lastFetched: undefined,
      };
    case LOGOUT_REQUEST:
      return { ...initialState };
    default:
      return state;
  }
};

export const getNewListings = () => ({
  [RSAA]: {
    endpoint: `${LISTINGS_ENDPOINT}?listingType=new`,
    // bailout: (state: RootState) =>
    //   state.listings.new.length !== 0 &&
    //   state.listings.lastFetched &&
    //   differenceInSeconds(new Date(), state.listings.lastFetched) < 60,
    method: 'GET',
    types: [GET_NEW_LISTINGS_REQUEST, GET_NEW_LISTINGS_SUCCESS, GET_NEW_LISTINGS_FAILURE],
  },
});

export const getPendingListings = () => ({
  [RSAA]: {
    endpoint: `${LISTINGS_ENDPOINT}?listingType=pending`,
    // bailout: (state: RootState) =>
    //   state.listings.pending.length !== 0 &&
    //   state.listings.lastFetched &&
    //   differenceInSeconds(new Date(), state.listings.lastFetched) < 60,
    method: 'GET',
    types: [
      GET_PENDING_LISTINGS_REQUEST,
      GET_PENDING_LISTINGS_SUCCESS,
      GET_PENDING_LISTINGS_FAILURE,
    ],
  },
});

export const getAwardedListings = () => ({
  [RSAA]: {
    endpoint: `${LISTINGS_ENDPOINT}?listingType=awarded`,
    // bailout: (state: RootState) =>
    //   state.listings.awarded.length !== 0 &&
    //   state.listings.lastFetched &&
    //   differenceInSeconds(new Date(), state.listings.lastFetched) < 60,
    method: 'GET',
    types: [
      GET_AWARDED_LISTINGS_REQUEST,
      GET_AWARDED_LISTINGS_SUCCESS,
      GET_AWARDED_LISTINGS_FAILURE,
    ],
  },
});

export const getHistoryListings = () => ({
  [RSAA]: {
    endpoint: `${LISTINGS_ENDPOINT}?listingType=history`,
    // bailout: (state: RootState) =>
    //   state.listings.history.length !== 0 &&
    //   state.listings.lastFetched &&
    //   differenceInSeconds(new Date(), state.listings.lastFetched) < 60,
    method: 'GET',
    types: [
      GET_HISTORY_LISTINGS_REQUEST,
      GET_HISTORY_LISTINGS_SUCCESS,
      GET_HISTORY_LISTINGS_FAILURE,
    ],
  },
});
