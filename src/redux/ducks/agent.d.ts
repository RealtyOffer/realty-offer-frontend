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
  UPDATE_AGENT_BID_REQUEST,
  UPDATE_AGENT_BID_SUCCESS,
  UPDATE_AGENT_BID_FAILURE,
  GET_BID_DETAILS_BY_ID_REQUEST,
  GET_BID_DETAILS_BY_ID_SUCCESS,
  GET_BID_DETAILS_BY_ID_FAILURE,
  DELETE_BID_BY_ID_REQUEST,
  DELETE_BID_BY_ID_SUCCESS,
  DELETE_BID_BY_ID_FAILURE,
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
  brokerEmail?: string;
  brokerAddress?: string;
  brokerAddressLine1?: string;
  brokerAddressLine2?: string;
  brokerCity?: string;
  brokerZip?: string;
  brokerState?: string;
  profileCompleteResetDate?: Date;
  emailAddress?: string;
  cities?: Array<CityType>;
  genderId?: number;
  aboutMe?: string;
  certificates?: string;
  agentLanguages?: Array<number>;
  fortispayContactId?: string;
  fortispayAccountVaultId?: string;
  fortispayRecurringId?: string;
  hasCompletedSignup?: boolean;
  licenseExpirationDate?: string;
  isPilotUser?: boolean;
  bidDefaults: {
    sellerBrokerComplianceAmount?: number;
    buyerHomeWarrantyAmount?: number;
    buyerInspectionAmount?: number;
    sellerPreInspectionAmount?: number;
    buyerBrokerComplianceAmount?: number;
    sellerPreCertifyAmount?: number;
    sellerMovingCompanyAmount?: number;
    sellerPhotographyAmount?: number;
    buyerAppraisalAmount?: number;
    buyerMovingCompanyAmount?: number;
  };
};

export type BidType = {
  id?: number;
  listingAgentCommission?: number;
  buyersAgentCommission?: number;
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
  agentId?: number;
  winner?: boolean;
  consumer?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
  };
};

export type AgentSignupDataType = {
  isPilotUser?: boolean;
  agentProfileComplete?: boolean;
  cities?: Array<CityType>;
  total?: number;
};

export type AgentStoreType = {
  isLoading: boolean;
  hasError: boolean;
  signupData: AgentSignupDataType;
  activeBid?: { isLoading: boolean } & BidType;
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

export type UpdateAgentBidRequestAction = {
  type: typeof UPDATE_AGENT_BID_REQUEST;
};
export type UpdateAgentBidSuccessAction = {
  type: typeof UPDATE_AGENT_BID_SUCCESS;
  payload: BidType;
};
export type UpdateAgentBidFailureAction = {
  type: typeof UPDATE_AGENT_BID_FAILURE;
};

export type GetBidDetailsByIdRequestAction = {
  type: typeof GET_BID_DETAILS_BY_ID_REQUEST;
};
export type GetBidDetailsByIdSuccessAction = {
  type: typeof GET_BID_DETAILS_BY_ID_SUCCESS;
  payload: BidType;
};
export type GetBidDetailsByIdFailureAction = {
  type: typeof GET_BID_DETAILS_BY_ID_FAILURE;
};

export type DeleteBidByIdRequestAction = {
  type: typeof DELETE_BID_BY_ID_REQUEST;
};
export type DeleteBidByIdSuccessAction = {
  type: typeof DELETE_BID_BY_ID_SUCCESS;
};
export type DeleteBidByIdFailureAction = {
  type: typeof DELETE_BID_BY_ID_FAILURE;
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
  | UpdateAgentBidRequestAction
  | UpdateAgentBidSuccessAction
  | UpdateAgentBidFailureAction
  | GetBidDetailsByIdRequestAction
  | GetBidDetailsByIdSuccessAction
  | GetBidDetailsByIdFailureAction
  | DeleteBidByIdRequestAction
  | DeleteBidByIdSuccessAction
  | DeleteBidByIdFailureAction
  | ResetProfileCompleteAlertAction
  | CaptureAgentSignupDataAction
  | LogoutRequestAction;
