import { RSAA } from 'redux-api-middleware';

import { USER_SITE_BANNERS_ENDPOINT, USER_CITIES_ENDPOINT } from '../constants';
import { UserStoreType, UserActionTypes } from './user.d';
import { BannerType } from './admin.d';

export const GET_USER_SITE_BANNERS_REQUEST = 'GET_USER_SITE_BANNERS_REQUEST';
export const GET_USER_SITE_BANNERS_SUCCESS = 'GET_USER_SITE_BANNERS_SUCCESS';
export const GET_USER_SITE_BANNERS_FAILURE = 'GET_USER_SITE_BANNERS_FAILURE';

export const GET_USER_CITIES_REQUEST = 'GET_USER_CITIES_REQUEST';
export const GET_USER_CITIES_SUCCESS = 'GET_USER_CITIES_SUCCESS';
export const GET_USER_CITIES_FAILURE = 'GET_USER_CITIES_FAILURE';

export const initialState: UserStoreType = {
  isLoading: false,
  hasError: false,
  banners: [],
  cities: [],
};

export default (state: UserStoreType = initialState, action: UserActionTypes): UserStoreType => {
  switch (action.type) {
    case GET_USER_SITE_BANNERS_REQUEST:
    case GET_USER_CITIES_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case GET_USER_SITE_BANNERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        banners: [...action.payload],
      };
    case GET_USER_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        cities: [...action.payload],
      };
    case GET_USER_SITE_BANNERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        banners: [],
      };
    case GET_USER_CITIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        cities: [],
      };
    default:
      return state;
  }
};

export const getUserSiteBanners = (payload: BannerType['audience']) => ({
  [RSAA]: {
    endpoint: `${USER_SITE_BANNERS_ENDPOINT}?bannerAudience=${payload}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      GET_USER_SITE_BANNERS_REQUEST,
      GET_USER_SITE_BANNERS_SUCCESS,
      GET_USER_SITE_BANNERS_FAILURE,
    ],
  },
});

export const getUserCities = () => ({
  [RSAA]: {
    endpoint: USER_CITIES_ENDPOINT,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [GET_USER_CITIES_REQUEST, GET_USER_CITIES_SUCCESS, GET_USER_CITIES_FAILURE],
  },
});
