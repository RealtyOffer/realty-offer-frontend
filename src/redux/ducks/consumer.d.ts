import {
  CAPTURE_CONSUMER_DATA,
  CREATE_CONSUMER_PROFILE_REQUEST,
  CREATE_CONSUMER_PROFILE_SUCCESS,
  CREATE_CONSUMER_PROFILE_FAILURE,
  GET_CONSUMER_BANNERS_REQUEST,
  GET_CONSUMER_BANNERS_SUCCESS,
  GET_CONSUMER_BANNERS_FAILURE,
  GET_CONSUMER_CITIES_REQUEST,
  GET_CONSUMER_CITIES_SUCCESS,
  GET_CONSUMER_CITIES_FAILURE,
} from './consumer';

import { BannerType, CityType } from './admin.d';

export type SignupDataType = {
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
  signupData: SignupDataType;
  isLoading: boolean;
  hasError: boolean;
  banners?: Array<BannerType>;
  cities?: Array<CityType>;
};

export type CaptureConsumerDataAction = {
  type: typeof CAPTURE_CONSUMER_DATA;
  payload: SignupDataType;
};

export type CreateConsumerProfileRequestAction = {
  type: typeof CREATE_CONSUMER_PROFILE_REQUEST;
  payload: SignupDataType;
};

export type CreateConsumerProfileSuccessAction = {
  type: typeof CREATE_CONSUMER_PROFILE_SUCCESS;
  payload: SignupDataType;
};

export type CreateConsumerProfileFailureAction = {
  type: typeof CREATE_CONSUMER_PROFILE_FAILURE;
};

export type GetConsumerBannersRequestAction = {
  type: typeof GET_CONSUMER_BANNERS_REQUEST;
};

export type GetConsumerBannersSuccessAction = {
  type: typeof GET_CONSUMER_BANNERS_SUCCESS;
  payload: Array<BannerType>;
};

export type GetConsumerBannersFailureAction = {
  type: typeof GET_CONSUMER_BANNERS_FAILURE;
};

export type GetConsumerCitiesRequestAction = {
  type: typeof GET_CONSUMER_CITIES_REQUEST;
};

export type GetConsumerCitiesSuccessAction = {
  type: typeof GET_CONSUMER_CITIES_SUCCESS;
  payload: Array<CityType>;
};

export type GetConsumerCitiesFailureAction = {
  type: typeof GET_CONSUMER_CITIES_FAILURE;
};

export type ConsumerStoreActions =
  | CaptureConsumerDataAction
  | CreateConsumerProfileRequestAction
  | CreateConsumerProfileSuccessAction
  | CreateConsumerProfileFailureAction
  | GetConsumerBannersRequestAction
  | GetConsumerBannersSuccessAction
  | GetConsumerBannersFailureAction
  | GetConsumerCitiesRequestAction
  | GetConsumerCitiesSuccessAction
  | GetConsumerCitiesFailureAction;