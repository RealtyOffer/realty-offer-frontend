import {
  GET_USER_SITE_BANNERS_REQUEST,
  GET_USER_SITE_BANNERS_SUCCESS,
  GET_USER_SITE_BANNERS_FAILURE,
  GET_USER_CITIES_REQUEST,
  GET_USER_CITIES_SUCCESS,
  GET_USER_CITIES_FAILURE,
} from './user';

import { BannerType, CityType } from './admin.d';

export type UserStoreType = {
  isLoading: boolean;
  hasError: boolean;
  banners?: Array<BannerType>;
  cities?: Array<CityType>;
};

export type GetUserSiteBannersRequestAction = {
  type: typeof GET_USER_SITE_BANNERS_REQUEST;
};

export type GetUserSiteBannersSuccessAction = {
  type: typeof GET_USER_SITE_BANNERS_SUCCESS;
  payload: Array<BannerType>;
};

export type GetUserSiteBannersFailureAction = {
  type: typeof GET_USER_SITE_BANNERS_FAILURE;
};

export type GetUserCitiesRequestAction = {
  type: typeof GET_USER_CITIES_REQUEST;
};

export type GetUserCitiesSuccessAction = {
  type: typeof GET_USER_CITIES_SUCCESS;
  payload: Array<CityType>;
};

export type GetUserCitiesFailureAction = {
  type: typeof GET_USER_CITIES_FAILURE;
};

export type UserActionTypes =
  | GetUserSiteBannersRequestAction
  | GetUserSiteBannersSuccessAction
  | GetUserSiteBannersFailureAction
  | GetUserCitiesRequestAction
  | GetUserCitiesSuccessAction
  | GetUserCitiesFailureAction;
