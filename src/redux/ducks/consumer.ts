import { RSAA } from 'redux-api-middleware';

import { LOGOUT_REQUEST } from './auth';
import {
  CREATE_CONSUMER_PROFILE_ENDPOINT,
  SECURED_CONSUMER_PROFILE_ENDPOINT,
  SECURED_CONSUMER_BIDS_ENDPOINT,
  SECURED_CONSUMER_BIDS_WINNER_ENDPOINT,
  SECURED_CONSUMER_BIDS_WINNING_AGENT_ENDPOINT,
} from '../constants';

import { ConsumerStoreType, ConsumerProfileType, ConsumerStoreActions } from './consumer.d';
import { ListingType } from './listings.d';
import { BidType } from './agent.d';

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

export const GET_CONSUMER_BIDS_REQUEST = 'GET_CONSUMER_BIDS_REQUEST';
export const GET_CONSUMER_BIDS_SUCCESS = 'GET_CONSUMER_BIDS_SUCCESS';
export const GET_CONSUMER_BIDS_FAILURE = 'GET_CONSUMER_BIDS_FAILURE';

export const CREATE_CONSUMER_BID_WINNER_REQUEST = 'CREATE_CONSUMER_BID_WINNER_REQUEST';
export const CREATE_CONSUMER_BID_WINNER_SUCCESS = 'CREATE_CONSUMER_BID_WINNER_SUCCESS';
export const CREATE_CONSUMER_BID_WINNER_FAILURE = 'CREATE_CONSUMER_BID_WINNER_FAILURE';

export const GET_WINNING_AGENT_PROFILE_REQUEST = 'GET_WINNING_AGENT_PROFILE_REQUEST';
export const GET_WINNING_AGENT_PROFILE_SUCCESS = 'GET_WINNING_AGENT_PROFILE_SUCCESS';
export const GET_WINNING_AGENT_PROFILE_FAILURE = 'GET_WINNING_AGENT_PROFILE_FAILURE';

export const initialState: ConsumerStoreType = {
  isLoading: false,
  hasError: false,
  listing: null,
  profile: null,
  bids: [],
  winner: null,
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
            ? null
            : {
                ...state.listing,
                ...action.payload,
              },
      };
    case CREATE_CONSUMER_PROFILE_REQUEST:
    case GET_CONSUMER_PROFILE_REQUEST:
    case GET_CONSUMER_BIDS_REQUEST:
    case CREATE_CONSUMER_BID_WINNER_REQUEST:
    case GET_WINNING_AGENT_PROFILE_REQUEST:
    case UPDATE_CONSUMER_PROFILE_REQUEST:
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
    case UPDATE_CONSUMER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        profile: { ...action.payload },
      };
    case GET_CONSUMER_BIDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        bids: [...action.payload],
      };
    case CREATE_CONSUMER_BID_WINNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
      };
    case GET_WINNING_AGENT_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        winner: { ...action.payload },
      };
    case GET_CONSUMER_BIDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        bids: [],
      };
    case GET_CONSUMER_PROFILE_FAILURE:
    case CREATE_CONSUMER_PROFILE_FAILURE:
    case CREATE_CONSUMER_BID_WINNER_FAILURE:
    case GET_WINNING_AGENT_PROFILE_FAILURE:
    case UPDATE_CONSUMER_PROFILE_FAILURE:
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
    body: JSON.stringify(payload),
    skipOauth: true,
    types: [
      CREATE_CONSUMER_PROFILE_REQUEST,
      CREATE_CONSUMER_PROFILE_SUCCESS,
      CREATE_CONSUMER_PROFILE_FAILURE,
    ],
  },
});

export const updateConsumerProfile = (payload: ConsumerProfileType) => ({
  [RSAA]: {
    endpoint: SECURED_CONSUMER_PROFILE_ENDPOINT,
    method: 'PUT',
    body: JSON.stringify(payload),
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
    types: [
      GET_CONSUMER_PROFILE_REQUEST,
      GET_CONSUMER_PROFILE_SUCCESS,
      GET_CONSUMER_PROFILE_FAILURE,
    ],
  },
});

export const getConsumerBids = (payload?: number) => ({
  [RSAA]: {
    endpoint: `${SECURED_CONSUMER_BIDS_ENDPOINT}?take=${payload || 3}`,
    method: 'GET',
    types: [GET_CONSUMER_BIDS_REQUEST, GET_CONSUMER_BIDS_SUCCESS, GET_CONSUMER_BIDS_FAILURE],
  },
});

export const createConsumerBidWinner = (payload: BidType) => ({
  [RSAA]: {
    endpoint: SECURED_CONSUMER_BIDS_WINNER_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [
      CREATE_CONSUMER_BID_WINNER_REQUEST,
      CREATE_CONSUMER_BID_WINNER_SUCCESS,
      CREATE_CONSUMER_BID_WINNER_FAILURE,
    ],
  },
});

export const getWinningAgentProfile = () => ({
  [RSAA]: {
    endpoint: SECURED_CONSUMER_BIDS_WINNING_AGENT_ENDPOINT,
    method: 'GET',
    types: [
      GET_WINNING_AGENT_PROFILE_REQUEST,
      GET_WINNING_AGENT_PROFILE_SUCCESS,
      GET_WINNING_AGENT_PROFILE_FAILURE,
    ],
  },
});
