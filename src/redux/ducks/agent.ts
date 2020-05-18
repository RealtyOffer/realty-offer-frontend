import { RSAA } from 'redux-api-middleware';
import addDays from 'date-fns/addDays';

import { AGENT_PROFILE_ENDPOINT, AGENT_BIDS_ENDPOINT } from '../constants';
import {
  AgentStoreType,
  AgentActionTypes,
  AgentProfileType,
  BidType,
  AgentSignupDataType,
} from './agent.d';

export const CREATE_AGENT_PROFILE_REQUEST = 'CREATE_AGENT_PROFILE_REQUEST';
export const CREATE_AGENT_PROFILE_SUCCESS = 'CREATE_AGENT_PROFILE_SUCCESS';
export const CREATE_AGENT_PROFILE_FAILURE = 'CREATE_AGENT_PROFILE_FAILURE';

export const UPDATE_AGENT_PROFILE_REQUEST = 'UPDATE_AGENT_PROFILE_REQUEST';
export const UPDATE_AGENT_PROFILE_SUCCESS = 'UPDATE_AGENT_PROFILE_SUCCESS';
export const UPDATE_AGENT_PROFILE_FAILURE = 'UPDATE_AGENT_PROFILE_FAILURE';

export const GET_AGENT_PROFILE_REQUEST = 'GET_AGENT_PROFILE_REQUEST';
export const GET_AGENT_PROFILE_SUCCESS = 'GET_AGENT_PROFILE_SUCCESS';
export const GET_AGENT_PROFILE_FAILURE = 'GET_AGENT_PROFILE_FAILURE';

export const CREATE_AGENT_BID_REQUEST = 'CREATE_AGENT_BID_REQUEST';
export const CREATE_AGENT_BID_SUCCESS = 'CREATE_AGENT_BID_SUCCESS';
export const CREATE_AGENT_BID_FAILURE = 'CREATE_AGENT_BID_FAILURE';

export const RESET_PROFILE_COMPLETE_ALERT = 'RESET_PROFILE_COMPLETE_ALERT';

export const CAPTURE_AGENT_SIGNUP_DATA = 'CAPTURE_AGENT_SIGNUP_DATA';

export const initialState: AgentStoreType = {
  id: undefined,
  state: '',
  agentId: '',
  brokerName: '',
  brokerPhoneNumber: '',
  isLoading: false,
  hasError: false,
  bids: [],
  profileCompleteResetDate: undefined,
  signupData: {},
};

export default (state: AgentStoreType = initialState, action: AgentActionTypes): AgentStoreType => {
  switch (action.type) {
    case CREATE_AGENT_PROFILE_REQUEST:
    case UPDATE_AGENT_PROFILE_REQUEST:
    case GET_AGENT_PROFILE_REQUEST:
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
    case CREATE_AGENT_BID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        bids: [...state.bids, action.payload],
      };
    case CAPTURE_AGENT_SIGNUP_DATA:
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

export const captureAgentSignupData = (payload: AgentSignupDataType) => ({
  type: CAPTURE_AGENT_SIGNUP_DATA,
  payload,
});
