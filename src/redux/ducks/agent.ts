import { RSAA } from 'redux-api-middleware';
import addDays from 'date-fns/addDays';

import { LOGOUT_REQUEST } from './auth';
import {
  AGENT_PROFILE_ENDPOINT,
  AGENT_BIDS_ENDPOINT,
  AGENT_BID_BY_ID_ENDPOINT,
} from '../constants';
import {
  AgentStoreType,
  AgentActionTypes,
  AgentProfileType,
  BidType,
  AgentSignupDataType,
} from './agent.d';
import { GET_NEW_LISTINGS_REQUEST, GET_NEW_LISTINGS_SUCCESS } from './listings';

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

export const UPDATE_AGENT_BID_REQUEST = 'UPDATE_AGENT_BID_REQUEST';
export const UPDATE_AGENT_BID_SUCCESS = 'UPDATE_AGENT_BID_SUCCESS';
export const UPDATE_AGENT_BID_FAILURE = 'UPDATE_AGENT_BID_FAILURE';

export const GET_BID_DETAILS_BY_ID_REQUEST = 'GET_BID_DETAILS_BY_ID_REQUEST';
export const GET_BID_DETAILS_BY_ID_SUCCESS = 'GET_BID_DETAILS_BY_ID_SUCCESS';
export const GET_BID_DETAILS_BY_ID_FAILURE = 'GET_BID_DETAILS_BY_ID_FAILURE';

export const DELETE_BID_BY_ID_REQUEST = 'DELETE_BID_BY_ID_REQUEST';
export const DELETE_BID_BY_ID_SUCCESS = 'DELETE_BID_BY_ID_SUCCESS';
export const DELETE_BID_BY_ID_FAILURE = 'DELETE_BID_BY_ID_FAILURE';

export const RESET_PROFILE_COMPLETE_ALERT = 'RESET_PROFILE_COMPLETE_ALERT';

export const CAPTURE_AGENT_SIGNUP_DATA = 'CAPTURE_AGENT_SIGNUP_DATA';
export const CLEAR_AGENT_SIGNUP_DATA = 'CLEAR_AGENT_SIGNUP_DATA';

export const UPDATE_AGENT_IS_IN_GOOD_STANDING = 'UPDATE_AGENT_IS_IN_GOOD_STANDING';

export const HIDE_MORTGAGE_PARTNER_FORM = 'HIDE_MORTGAGE_PARTNER_FORM';

export const initialState: AgentStoreType = {
  id: undefined,
  state: '',
  agentId: '',
  brokerName: '',
  brokerPhoneNumber: '',
  emailAddress: '',
  isLoading: false,
  hasError: false,
  profileCompleteResetDate: undefined,
  signupData: {},
  genderId: 0,
  activeBid: undefined,
  aboutMe: undefined,
  certificates: undefined,
  agentLanguages: [],
  bidDefaults: {},
  isInGoodStanding: true,
  showMortgagePartnerForm: true,
};

export default (state: AgentStoreType = initialState, action: AgentActionTypes): AgentStoreType => {
  switch (action.type) {
    case CREATE_AGENT_PROFILE_REQUEST:
    case UPDATE_AGENT_PROFILE_REQUEST:
    case GET_AGENT_PROFILE_REQUEST:
    case CREATE_AGENT_BID_REQUEST:
    case UPDATE_AGENT_BID_REQUEST:
    case DELETE_BID_BY_ID_REQUEST:
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
        // if a pilot user, always have them in good standing. otherwise, check to see if there is
        // an accoutn vault id. later, in Agent.tsx, we will check to see if the last transaction
        // was successful and update using UPDATE_AGENT_IS_IN_GOOD_STANDING
        isInGoodStanding: action.payload.isPilotUser
          ? true
          : Boolean(action.payload.fortispayAccountVaultId),
        ...action.payload,
      };
    case GET_BID_DETAILS_BY_ID_REQUEST:
    case GET_NEW_LISTINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        activeBid: {
          isLoading: true,
          winner: false,
          consumer: undefined,
        },
      };
    case UPDATE_AGENT_IS_IN_GOOD_STANDING:
      return {
        ...state,
        isInGoodStanding: action.payload,
      };
    case CREATE_AGENT_BID_SUCCESS:
    case UPDATE_AGENT_BID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        activeBid: { isLoading: false, ...action.payload },
      };
    case GET_NEW_LISTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        activeBid: {
          isLoading: false,
          winner: false,
          consumer: undefined,
        },
      };
    case GET_BID_DETAILS_BY_ID_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        activeBid: { isLoading: false, ...action.payload },
      };
    }
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
    case CLEAR_AGENT_SIGNUP_DATA:
      return {
        ...state,
        signupData: {},
      };
    case DELETE_BID_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        activeBid: {
          isLoading: false,
        },
      };
    case HIDE_MORTGAGE_PARTNER_FORM:
      return {
        ...state,
        showMortgagePartnerForm: addDays(new Date(), 30),
      };
    case GET_BID_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        activeBid: {
          isLoading: false,
        },
      };
    case CREATE_AGENT_PROFILE_FAILURE:
    case UPDATE_AGENT_PROFILE_FAILURE:
    case GET_AGENT_PROFILE_FAILURE:
    case CREATE_AGENT_BID_FAILURE:
    case UPDATE_AGENT_BID_FAILURE:
    case DELETE_BID_BY_ID_FAILURE:
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
    case LOGOUT_REQUEST:
      return {
        ...initialState,
        signupData: state.signupData,
      };
    default:
      return state;
  }
};

export const createAgentProfile = (payload: AgentProfileType) => ({
  [RSAA]: {
    endpoint: AGENT_PROFILE_ENDPOINT,
    method: 'POST',
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
    types: [GET_AGENT_PROFILE_REQUEST, GET_AGENT_PROFILE_SUCCESS, GET_AGENT_PROFILE_FAILURE],
  },
});

export const createAgentBid = (payload: BidType) => ({
  [RSAA]: {
    endpoint: AGENT_BIDS_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [CREATE_AGENT_BID_REQUEST, CREATE_AGENT_BID_SUCCESS, CREATE_AGENT_BID_FAILURE],
  },
});

export const updateAgentBid = (payload: BidType) => ({
  [RSAA]: {
    endpoint: AGENT_BIDS_ENDPOINT,
    method: 'PUT',
    body: JSON.stringify(payload),
    types: [UPDATE_AGENT_BID_REQUEST, UPDATE_AGENT_BID_SUCCESS, UPDATE_AGENT_BID_FAILURE],
  },
});

export const getBidDetailsById = (payload: number) => ({
  [RSAA]: {
    endpoint: AGENT_BID_BY_ID_ENDPOINT(payload),
    method: 'GET',
    types: [
      GET_BID_DETAILS_BY_ID_REQUEST,
      GET_BID_DETAILS_BY_ID_SUCCESS,
      GET_BID_DETAILS_BY_ID_FAILURE,
    ],
  },
});

export const deleteBidById = (payload: number) => ({
  [RSAA]: {
    endpoint: AGENT_BID_BY_ID_ENDPOINT(payload),
    method: 'DELETE',
    types: [DELETE_BID_BY_ID_REQUEST, DELETE_BID_BY_ID_SUCCESS, DELETE_BID_BY_ID_FAILURE],
  },
});

export const resetProfileCompleteAlert = () => ({
  type: RESET_PROFILE_COMPLETE_ALERT,
});

export const captureAgentSignupData = (payload: AgentSignupDataType) => ({
  type: CAPTURE_AGENT_SIGNUP_DATA,
  payload,
});

export const clearAgentSignupData = () => ({
  type: CLEAR_AGENT_SIGNUP_DATA,
});

export const updateAgentIsInGoodStanding = (payload: boolean) => ({
  type: UPDATE_AGENT_IS_IN_GOOD_STANDING,
  payload,
});

export const hideMortgagePartnerForm = () => ({
  type: HIDE_MORTGAGE_PARTNER_FORM,
});
