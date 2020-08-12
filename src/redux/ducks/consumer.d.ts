import {
  CAPTURE_CONSUMER_DATA,
  CREATE_CONSUMER_PROFILE_REQUEST,
  CREATE_CONSUMER_PROFILE_SUCCESS,
  CREATE_CONSUMER_PROFILE_FAILURE,
  GET_CONSUMER_PROFILE_REQUEST,
  GET_CONSUMER_PROFILE_SUCCESS,
  GET_CONSUMER_PROFILE_FAILURE,
  UPDATE_CONSUMER_PROFILE_REQUEST,
  UPDATE_CONSUMER_PROFILE_SUCCESS,
  UPDATE_CONSUMER_PROFILE_FAILURE,
  GET_CONSUMER_BIDS_REQUEST,
  GET_CONSUMER_BIDS_SUCCESS,
  GET_CONSUMER_BIDS_FAILURE,
  CREATE_CONSUMER_BID_WINNER_REQUEST,
  CREATE_CONSUMER_BID_WINNER_SUCCESS,
  CREATE_CONSUMER_BID_WINNER_FAILURE,
  GET_WINNING_AGENT_PROFILE_REQUEST,
  GET_WINNING_AGENT_PROFILE_SUCCESS,
  GET_WINNING_AGENT_PROFILE_FAILURE,
  GET_WINNING_AGENT_PROFILE_PHOTO_REQUEST,
  GET_WINNING_AGENT_PROFILE_PHOTO_SUCCESS,
  GET_WINNING_AGENT_PROFILE_PHOTO_FAILURE,
} from './consumer';

import { LogoutRequestAction } from './auth.d';
import { ListingType } from './listings.d';
import { BidType } from './agent.d';

export type ConsumerProfileType = {
  id?: number;
  genderPreferenceId: number | null;
  agePreferenceId: number | null;
  otherLanguageId: number | null;
};

export type WinningAgentProfileType = {
  id?: 0;
  agentId?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  brokerName?: string;
  brokerPhoneNumber?: string;
  brokerAddressLine1?: string;
  brokerAddressLine2?: string;
  brokerCity?: string;
  brokerZip?: string;
  brokerState?: string;
  avatar?: string;
};

export type ConsumerStoreType = {
  isLoading: boolean;
  hasError: boolean;
  listing: ListingType | null;
  profile: ConsumerProfileType | null;
  bids: Array<BidType>;
  winner: WinningAgentProfileType | null;
};

export type CaptureConsumerDataAction = {
  type: typeof CAPTURE_CONSUMER_DATA;
  payload: ListingType;
};

export type CreateConsumerProfileRequestAction = {
  type: typeof CREATE_CONSUMER_PROFILE_REQUEST;
  payload: { listing: ListingType; profile: ConsumerProfileType };
};

export type CreateConsumerProfileSuccessAction = {
  type: typeof CREATE_CONSUMER_PROFILE_SUCCESS;
  payload: { listing: ListingType; profile: ConsumerProfileType };
};

export type CreateConsumerProfileFailureAction = {
  type: typeof CREATE_CONSUMER_PROFILE_FAILURE;
};

export type GetConsumerProfileRequestAction = {
  type: typeof GET_CONSUMER_PROFILE_REQUEST;
};

export type GetConsumerProfileSuccessAction = {
  type: typeof GET_CONSUMER_PROFILE_SUCCESS;
  payload: { listing: ListingType; profile: ConsumerProfileType };
};

export type GetConsumerProfileFailureAction = {
  type: typeof GET_CONSUMER_PROFILE_FAILURE;
};

export type UpdateConsumerProfileRequestAction = {
  type: typeof UPDATE_CONSUMER_PROFILE_REQUEST;
};
export type UpdateConsumerProfileSuccessAction = {
  type: typeof UPDATE_CONSUMER_PROFILE_SUCCESS;
  payload: ConsumerProfileType;
};
export type UpdateConsumerProfileFailureAction = {
  type: typeof UPDATE_CONSUMER_PROFILE_FAILURE;
};

export type GetConsumerBidsRequestAction = {
  type: typeof GET_CONSUMER_BIDS_REQUEST;
};
export type GetConsumerBidsSuccessAction = {
  type: typeof GET_CONSUMER_BIDS_SUCCESS;
  payload: Array<BidType>;
};
export type GetConsumerBidsFailureAction = {
  type: typeof GET_CONSUMER_BIDS_FAILURE;
};

export type CreateConsumerBidWinnerRequestAction = {
  type: typeof CREATE_CONSUMER_BID_WINNER_REQUEST;
  payload: BidType;
};
export type CreateConsumerBidWinnerSuccessAction = {
  type: typeof CREATE_CONSUMER_BID_WINNER_SUCCESS;
};
export type CreateConsumerBidWinnerFailureAction = {
  type: typeof CREATE_CONSUMER_BID_WINNER_FAILURE;
};

export type GetWinningAgentProfileRequestAction = {
  type: typeof GET_WINNING_AGENT_PROFILE_REQUEST;
};
export type GetWinningAgentProfileSuccessAction = {
  type: typeof GET_WINNING_AGENT_PROFILE_SUCCESS;
  payload: WinningAgentProfileType;
};
export type GetWinningAgentProfileFailureAction = {
  type: typeof GET_WINNING_AGENT_PROFILE_FAILURE;
};

export type GetWinningAgentProfilePhotoRequestAction = {
  type: typeof GET_WINNING_AGENT_PROFILE_PHOTO_REQUEST;
};
export type GetWinningAgentProfilePhotoSuccessAction = {
  type: typeof GET_WINNING_AGENT_PROFILE_PHOTO_SUCCESS;
  payload: {
    url: WinningAgentProfileType['avatar'];
  };
};
export type GetWinningAgentProfilePhotoFailureAction = {
  type: typeof GET_WINNING_AGENT_PROFILE_PHOTO_FAILURE;
};

export type ConsumerStoreActions =
  | CaptureConsumerDataAction
  | CreateConsumerProfileRequestAction
  | CreateConsumerProfileSuccessAction
  | CreateConsumerProfileFailureAction
  | GetConsumerProfileRequestAction
  | GetConsumerProfileSuccessAction
  | GetConsumerProfileFailureAction
  | UpdateConsumerProfileRequestAction
  | UpdateConsumerProfileSuccessAction
  | UpdateConsumerProfileFailureAction
  | GetConsumerBidsRequestAction
  | GetConsumerBidsSuccessAction
  | GetConsumerBidsFailureAction
  | CreateConsumerBidWinnerRequestAction
  | CreateConsumerBidWinnerSuccessAction
  | CreateConsumerBidWinnerFailureAction
  | GetWinningAgentProfileRequestAction
  | GetWinningAgentProfileSuccessAction
  | GetWinningAgentProfileFailureAction
  | GetWinningAgentProfilePhotoRequestAction
  | GetWinningAgentProfilePhotoSuccessAction
  | GetWinningAgentProfilePhotoFailureAction
  | LogoutRequestAction;
