import {
  CREATE_AGENT_PROFILE_REQUEST,
  CREATE_AGENT_PROFILE_SUCCESS,
  CREATE_AGENT_PROFILE_FAILURE,
  UPDATE_AGENT_PROFILE_REQUEST,
  UPDATE_AGENT_PROFILE_SUCCESS,
  UPDATE_AGENT_PROFILE_FAILURE,
  GET_AGENT_PROFILE_REQUEST,
  GET_AGENT_PROFILE_SUCCESS,
  GET_AGENT_PROFILE_FAILURE,
  CREATE_AGENT_BID_REQUEST,
  CREATE_AGENT_BID_SUCCESS,
  CREATE_AGENT_BID_FAILURE,
  RESET_PROFILE_COMPLETE_ALERT,
  CAPTURE_AGENT_SIGNUP_DATA,
} from './agent';

import { CityType } from './admin.d';
import { LogoutRequestAction } from './auth.d';

export type AgentProfileType = {
  id?: number;
  state?: string;
  agentId?: string;
  brokerName?: string;
  brokerPhoneNumber?: string;
  brokerAddress?: string;
  profileCompleteResetDate?: Date;
  emailAddress?: string;
  cities?: Array<CityType>;
};

export type BidType = {
  id?: number;
  sellerCommission?: number;
  sellerBrokerComplianceAmount?: number;
  sellerPreInspectionAmount?: number;
  sellerPreCertifyAmount?: number;
  sellerMovingCompanyAmount?: number;
  sellerPhotographyAmount?: number;
  buyerCommission?: number;
  buyerBrokerComplianceAmount?: number;
  buyerInspectionAmount?: number;
  buyerHomeWarrantyAmount?: number;
  buyerAppraisalAmount?: number;
  buyerMovingCompanyAmount?: number;
  listingId?: number | string;
};

export type AgentSignupDataType = {
  agentProfileComplete?: boolean;
  cities?: Array<CityType>;
};

export type AgentStoreType = {
  isLoading: boolean;
  hasError: boolean;
  bids: Array<BidType>;
  signupData: AgentSignupDataType;
  hasCompletedSignup?: boolean;
} & AgentProfileType;

export type CreateAgentProfileRequestAction = {
  type: typeof CREATE_AGENT_PROFILE_REQUEST;
  payload: AgentProfileType;
};

export type CreateAgentProfileSuccessAction = {
  type: typeof CREATE_AGENT_PROFILE_SUCCESS;
  payload: AgentProfileType;
};

export type CreateAgentProfileFailureAction = {
  type: typeof CREATE_AGENT_PROFILE_FAILURE;
};

export type UpdateAgentProfileRequestAction = {
  type: typeof UPDATE_AGENT_PROFILE_REQUEST;
  payload: AgentProfileType;
};

export type UpdateAgentProfileSuccessAction = {
  type: typeof UPDATE_AGENT_PROFILE_SUCCESS;
  payload: AgentProfileType;
};

export type UpdateAgentProfileFailureAction = {
  type: typeof UPDATE_AGENT_PROFILE_FAILURE;
};

export type GetAgentProfileRequestAction = {
  type: typeof GET_AGENT_PROFILE_REQUEST;
};

export type GetAgentProfileSuccessAction = {
  type: typeof GET_AGENT_PROFILE_SUCCESS;
  payload: AgentProfileType;
};

export type GetAgentProfileFailureAction = {
  type: typeof GET_AGENT_PROFILE_FAILURE;
};

export type CreateAgentBidRequestAction = {
  type: typeof CREATE_AGENT_BID_REQUEST;
  payload: BidType;
};

export type CreateAgentBidSuccessAction = {
  type: typeof CREATE_AGENT_BID_SUCCESS;
  payload: BidType;
};

export type CreateAgentBidFailureAction = {
  type: typeof CREATE_AGENT_BID_FAILURE;
};

export type ResetProfileCompleteAlertAction = {
  type: typeof RESET_PROFILE_COMPLETE_ALERT;
};

export type CaptureAgentSignupDataAction = {
  type: typeof CAPTURE_AGENT_SIGNUP_DATA;
  payload: AgentSignupDataType;
};

export type AgentActionTypes =
  | CreateAgentProfileRequestAction
  | CreateAgentProfileSuccessAction
  | CreateAgentProfileFailureAction
  | UpdateAgentProfileRequestAction
  | UpdateAgentProfileSuccessAction
  | UpdateAgentProfileFailureAction
  | GetAgentProfileRequestAction
  | GetAgentProfileSuccessAction
  | GetAgentProfileFailureAction
  | CreateAgentBidRequestAction
  | CreateAgentBidSuccessAction
  | CreateAgentBidFailureAction
  | ResetProfileCompleteAlertAction
  | CaptureAgentSignupDataAction
  | LogoutRequestAction;
