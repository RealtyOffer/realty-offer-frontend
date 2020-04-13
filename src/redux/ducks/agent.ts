import { RSAA } from 'redux-api-middleware';

import { AGENT_PROFILE_ENDPOINT, AGENT_BANNERS_ENDPOINT } from '../constants';

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

export type AgentProfileType = {
  id?: number;
  state?: string;
  agentId?: string;
  brokerName?: string;
  brokerPhoneNumber?: string;
  brokerAddress?: string;
};

export type AgentStoreType = {
  isLoading: boolean;
  hasError: boolean;
  banner?: {
    id: number;
    message: string;
    dismissable: boolean;
    callToActionLink: string;
    expirationDate: string;
    audience: string;
    styling: string;
  };
} & AgentProfileType;

export const initialState: AgentStoreType = {
  id: undefined,
  state: '',
  agentId: '',
  brokerName: '',
  brokerPhoneNumber: '',
  isLoading: false,
  hasError: false,
  banner: undefined,
};

export default (state: AgentStoreType = initialState, action: any) => {
  switch (action.type) {
    case CREATE_AGENT_PROFILE_REQUEST:
    case UPDATE_AGENT_PROFILE_REQUEST:
    case GET_AGENT_PROFILE_REQUEST:
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
    case CREATE_AGENT_PROFILE_FAILURE:
    case UPDATE_AGENT_PROFILE_FAILURE:
    case GET_AGENT_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
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
