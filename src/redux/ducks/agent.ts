import { RSAA } from 'redux-api-middleware';
import addDays from 'date-fns/addDays';

import {
  AGENT_PROFILE_ENDPOINT,
  AGENT_BANNERS_ENDPOINT,
  AGENT_BIDS_ENDPOINT,
  AGENT_CITIES_ENDPOINT,
} from '../constants';
import { AgentStoreType, AgentActionTypes, AgentProfileType, BidType } from './agent.d';

export const CREATE_AGENT_PROFILE_REQUEST = 'CREATE_AGENT_PROFILE_REQUEST';
export const CREATE_AGENT_PROFILE_SUCCESS = 'CREATE_AGENT_PROFILE_SUCCESS';
export const CREATE_AGENT_PROFILE_FAILURE = 'CREATE_AGENT_PROFILE_FAILURE';

export const UPDATE_AGENT_PROFILE_REQUEST = 'UPDATE_AGENT_PROFILE_REQUEST';
export const UPDATE_AGENT_PROFILE_SUCCESS = 'UPDATE_AGENT_PROFILE_SUCCESS';
export const UPDATE_AGENT_PROFILE_FAILURE = 'UPDATE_AGENT_PROFILE_FAILURE';

export const GET_AGENT_PROFILE_REQUEST = 'GET_AGENT_PROFILE_REQUEST';
export const GET_AGENT_PROFILE_SUCCESS = 'GET_AGENT_PROFILE_SUCCESS';
export const GET_AGENT_PROFILE_FAILURE = 'GET_AGENT_PROFILE_FAILURE';

export const GET_AGENT_BANNERS_REQUEST = 'GET_AGENT_BANNERS_REQUEST';
export const GET_AGENT_BANNERS_SUCCESS = 'GET_AGENT_BANNERS_SUCCESS';
export const GET_AGENT_BANNERS_FAILURE = 'GET_AGENT_BANNERS_FAILURE';

export const GET_AGENT_CITIES_REQUEST = 'GET_AGENT_CITIES_REQUEST';
export const GET_AGENT_CITIES_SUCCESS = 'GET_AGENT_CITIES_SUCCESS';
export const GET_AGENT_CITIES_FAILURE = 'GET_AGENT_CITIES_FAILURE';

export const CREATE_AGENT_BID_REQUEST = 'CREATE_AGENT_BID_REQUEST';
export const CREATE_AGENT_BID_SUCCESS = 'CREATE_AGENT_BID_SUCCESS';
export const CREATE_AGENT_BID_FAILURE = 'CREATE_AGENT_BID_FAILURE';

export const RESET_PROFILE_COMPLETE_ALERT = 'RESET_PROFILE_COMPLETE_ALERT';

export const initialState: AgentStoreType = {
  id: undefined,
  state: '',
  agentId: '',
  brokerName: '',
  brokerPhoneNumber: '',
  isLoading: false,
  hasError: false,
  bids: [],
  banners: [],
  cities: [],
  profileCompleteResetDate: undefined,
};

export default (state: AgentStoreType = initialState, action: AgentActionTypes): AgentStoreType => {
  switch (action.type) {
    case CREATE_AGENT_PROFILE_REQUEST:
    case UPDATE_AGENT_PROFILE_REQUEST:
    case GET_AGENT_PROFILE_REQUEST:
    case GET_AGENT_BANNERS_REQUEST:
    case GET_AGENT_CITIES_REQUEST:
    case CREATE_AGENT_BID_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case CREATE_AGENT_PROFILE_SUCCESS:
    case UPDATE_AGENT_PROFILE_SUCCESS:
    case GET_AGENT_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        ...action.payload,
      };
    case GET_AGENT_BANNERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        banners: [...action.payload],
      };
    case GET_AGENT_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        cities: [...action.payload],
      };
    case CREATE_AGENT_BID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        bids: [...state.bids, action.payload],
      };
    case CREATE_AGENT_BID_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        bids: [...state.bids],
      };
    case CREATE_AGENT_PROFILE_FAILURE:
    case UPDATE_AGENT_PROFILE_FAILURE:
    case GET_AGENT_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case GET_AGENT_BANNERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        banners: [],
      };
    case GET_AGENT_CITIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        cities: [],
      };
    case RESET_PROFILE_COMPLETE_ALERT:
      return {
        ...state,
        // don't show banner again for another 30 days
        profileCompleteResetDate: addDays(new Date(), 30),
      };
    default:
      return state;
  }
};

export const createAgentProfile = (payload: AgentProfileType) => ({
  [RSAA]: {
    endpoint: AGENT_PROFILE_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    types: [
      CREATE_AGENT_PROFILE_REQUEST,
      CREATE_AGENT_PROFILE_SUCCESS,
      CREATE_AGENT_PROFILE_FAILURE,
    ],
  },
});

export const updateAgentProfile = (payload: AgentProfileType) => ({
  [RSAA]: {
    endpoint: AGENT_PROFILE_ENDPOINT,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    types: [
      UPDATE_AGENT_PROFILE_REQUEST,
      UPDATE_AGENT_PROFILE_SUCCESS,
      UPDATE_AGENT_PROFILE_FAILURE,
    ],
  },
});

export const getAgentProfile = () => ({
  [RSAA]: {
    endpoint: AGENT_PROFILE_ENDPOINT,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [GET_AGENT_PROFILE_REQUEST, GET_AGENT_PROFILE_SUCCESS, GET_AGENT_PROFILE_FAILURE],
  },
});

export const getAgentSiteBanners = () => ({
  [RSAA]: {
    endpoint: AGENT_BANNERS_ENDPOINT,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [GET_AGENT_BANNERS_REQUEST, GET_AGENT_BANNERS_SUCCESS, GET_AGENT_BANNERS_FAILURE],
  },
});

export const getAgentCities = () => ({
  [RSAA]: {
    endpoint: AGENT_CITIES_ENDPOINT,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [GET_AGENT_CITIES_REQUEST, GET_AGENT_CITIES_SUCCESS, GET_AGENT_CITIES_FAILURE],
  },
});

export const createAgentBid = (payload: BidType) => ({
  [RSAA]: {
    endpoint: AGENT_BIDS_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    types: [CREATE_AGENT_BID_REQUEST, CREATE_AGENT_BID_SUCCESS, CREATE_AGENT_BID_FAILURE],
  },
});

export const resetProfileCompleteAlert = () => ({
  type: RESET_PROFILE_COMPLETE_ALERT,
});
