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
} from './consumer';

import { LogoutRequestAction } from './auth.d';
import { ListingType } from './listings.d';

export type ConsumerProfileType = {
  id?: number;
  genderPreference?: string;
  otherLanguage?: string;
};

export type ConsumerStoreType = {
  isLoading: boolean;
  hasError: boolean;
  listing: ListingType;
  profile: ConsumerProfileType;
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
  payload: { listing: ListingType; profile: ConsumerProfileType };
};
export type UpdateConsumerProfileFailureAction = {
  type: typeof UPDATE_CONSUMER_PROFILE_FAILURE;
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
  | LogoutRequestAction;
