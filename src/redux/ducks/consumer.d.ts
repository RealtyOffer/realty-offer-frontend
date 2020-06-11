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

import { CityType } from './admin.d';

export type ConsumerSignupDataType = {
  consumerType?: 'buyer' | 'seller' | 'buyerSeller';
  buyingCities?: Array<CityType>;
  buyingPriceRange?: string;
  freeMortgageConsult?: boolean;
  preApproved?: boolean;
  sellersAddressLine1?: string;
  sellersAddressLine2?: string;
  sellersCity?: CityType;
  sellersZip?: string;
  sellersTimeline?: string;
  sellersListingPriceInMind?: string;
  sellersMortgageBalance?: string;
  otherLanguage?: string;
  genderPreference?: string;
  email?: string;
};

export type ConsumerStoreType = {
  signupData: ConsumerSignupDataType;
  isLoading: boolean;
  hasError: boolean;
};

export type CaptureConsumerDataAction = {
  type: typeof CAPTURE_CONSUMER_DATA;
  payload: ConsumerSignupDataType;
};

export type CreateConsumerProfileRequestAction = {
  type: typeof CREATE_CONSUMER_PROFILE_REQUEST;
  payload: ConsumerSignupDataType;
};

export type CreateConsumerProfileSuccessAction = {
  type: typeof CREATE_CONSUMER_PROFILE_SUCCESS;
  payload: ConsumerSignupDataType;
};

export type CreateConsumerProfileFailureAction = {
  type: typeof CREATE_CONSUMER_PROFILE_FAILURE;
};

export type GetConsumerProfileRequestAction = {
  type: typeof GET_CONSUMER_PROFILE_REQUEST;
};

export type GetConsumerProfileSuccessAction = {
  type: typeof GET_CONSUMER_PROFILE_SUCCESS;
  payload: ConsumerSignupDataType;
};

export type GetConsumerProfileFailureAction = {
  type: typeof GET_CONSUMER_PROFILE_FAILURE;
};

export type UpdateConsumerProfileRequestAction = {
  type: typeof UPDATE_CONSUMER_PROFILE_REQUEST;
};
export type UpdateConsumerProfileSuccessAction = {
  type: typeof UPDATE_CONSUMER_PROFILE_SUCCESS;
  payload: ConsumerSignupDataType;
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
  | UpdateConsumerProfileFailureAction;
