import { RSAA } from 'redux-api-middleware';

import {
  ADMIN_SITE_BANNERS_ENDPOINT,
  ADMIN_SITE_BANNER_BY_ID_ENDPOINT,
  ADMIN_CITIES_ENDPOINT,
  ADMIN_CITY_BY_ID_ENDPOINT,
} from '../constants';
import { AdminStoreType, AdminActionTypes, BannerType, CityType } from './admin.d';

export const CREATE_SITE_BANNER_REQUEST = 'CREATE_SITE_BANNER_REQUEST';
export const CREATE_SITE_BANNER_SUCCESS = 'CREATE_SITE_BANNER_SUCCESS';
export const CREATE_SITE_BANNER_FAILURE = 'CREATE_SITE_BANNER_FAILURE';

export const UPDATE_SITE_BANNER_REQUEST = 'UPDATE_SITE_BANNER_REQUEST';
export const UPDATE_SITE_BANNER_SUCCESS = 'UPDATE_SITE_BANNER_SUCCESS';
export const UPDATE_SITE_BANNER_FAILURE = 'UPDATE_SITE_BANNER_FAILURE';

export const GET_ALL_SITE_BANNERS_REQUEST = 'GET_ALL_SITE_BANNERS_REQUEST';
export const GET_ALL_SITE_BANNERS_SUCCESS = 'GET_ALL_SITE_BANNERS_SUCCESS';
export const GET_ALL_SITE_BANNERS_FAILURE = 'GET_ALL_SITE_BANNERS_FAILURE';

export const GET_SITE_BANNER_BY_ID_REQUEST = 'GET_SITE_BANNER_BY_ID_REQUEST';
export const GET_SITE_BANNER_BY_ID_SUCCESS = 'GET_SITE_BANNER_BY_ID_SUCCESS';
export const GET_SITE_BANNER_BY_ID_FAILURE = 'GET_SITE_BANNER_BY_ID_FAILURE';

export const CREATE_CITY_REQUEST = 'CREATE_CITY_REQUEST';
export const CREATE_CITY_SUCCESS = 'CREATE_CITY_SUCCESS';
export const CREATE_CITY_FAILURE = 'CREATE_CITY_FAILURE';

export const UPDATE_CITY_REQUEST = 'UPDATE_CITY_REQUEST';
export const UPDATE_CITY_SUCCESS = 'UPDATE_CITY_SUCCESS';
export const UPDATE_CITY_FAILURE = 'UPDATE_CITY_FAILURE';

export const GET_ALL_CITIES_REQUEST = 'GET_ALL_CITIES_REQUEST';
export const GET_ALL_CITIES_SUCCESS = 'GET_ALL_CITIES_SUCCESS';
export const GET_ALL_CITIES_FAILURE = 'GET_ALL_CITIES_FAILURE';

export const GET_CITY_BY_ID_REQUEST = 'GET_CITY_BY_ID_REQUEST';
export const GET_CITY_BY_ID_SUCCESS = 'GET_CITY_BY_ID_SUCCESS';
export const GET_CITY_BY_ID_FAILURE = 'GET_CITY_BY_ID_FAILURE';

export const initialState: AdminStoreType = {
  isLoading: false,
  hasError: false,
  banners: [],
  cities: [],
};

export default (state: AdminStoreType = initialState, action: AdminActionTypes): AdminStoreType => {
  switch (action.type) {
    case CREATE_SITE_BANNER_REQUEST:
    case UPDATE_SITE_BANNER_REQUEST:
    case GET_ALL_SITE_BANNERS_REQUEST:
    case GET_SITE_BANNER_BY_ID_REQUEST:
    case GET_ALL_CITIES_REQUEST:
    case GET_CITY_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case CREATE_SITE_BANNER_SUCCESS:
    case UPDATE_SITE_BANNER_SUCCESS:
    case GET_SITE_BANNER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        banners: [...state.banners, action.payload],
      };
    case GET_ALL_SITE_BANNERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        banners: [...action.payload],
      };
    case CREATE_CITY_SUCCESS:
    case UPDATE_CITY_SUCCESS:
    case GET_CITY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        cities: [...state.cities, action.payload],
      };
    case GET_ALL_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        cities: [...action.payload],
      };
    case CREATE_SITE_BANNER_FAILURE:
    case UPDATE_SITE_BANNER_FAILURE:
    case GET_SITE_BANNER_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case GET_ALL_SITE_BANNERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        banners: [],
      };
    case CREATE_CITY_FAILURE:
    case UPDATE_CITY_FAILURE:
    case GET_CITY_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case GET_ALL_CITIES_FAILURE:
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

export const createSiteBanner = (payload: BannerType) => ({
  [RSAA]: {
    endpoint: ADMIN_SITE_BANNERS_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [CREATE_SITE_BANNER_REQUEST, CREATE_SITE_BANNER_SUCCESS, CREATE_SITE_BANNER_FAILURE],
  },
});

export const updateSiteBanner = (payload: BannerType) => ({
  [RSAA]: {
    endpoint: ADMIN_SITE_BANNERS_ENDPOINT,
    method: 'PUT',
    body: JSON.stringify(payload),
    types: [UPDATE_SITE_BANNER_REQUEST, UPDATE_SITE_BANNER_SUCCESS, UPDATE_SITE_BANNER_FAILURE],
  },
});

export const getAllSiteBanners = () => ({
  [RSAA]: {
    endpoint: ADMIN_SITE_BANNERS_ENDPOINT,
    method: 'GET',
    types: [
      GET_ALL_SITE_BANNERS_REQUEST,
      GET_ALL_SITE_BANNERS_SUCCESS,
      GET_ALL_SITE_BANNERS_FAILURE,
    ],
  },
});

export const getSiteBannerById = (id: number) => ({
  [RSAA]: {
    endpoint: ADMIN_SITE_BANNER_BY_ID_ENDPOINT(id),
    method: 'GET',
    types: [
      GET_SITE_BANNER_BY_ID_REQUEST,
      GET_SITE_BANNER_BY_ID_SUCCESS,
      GET_SITE_BANNER_BY_ID_FAILURE,
    ],
  },
});

export const createCity = (payload: CityType) => ({
  [RSAA]: {
    endpoint: ADMIN_CITIES_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [CREATE_CITY_REQUEST, CREATE_CITY_SUCCESS, CREATE_CITY_FAILURE],
  },
});

export const updateCity = (payload: CityType) => ({
  [RSAA]: {
    endpoint: ADMIN_CITIES_ENDPOINT,
    method: 'PUT',
    body: JSON.stringify(payload),
    types: [UPDATE_CITY_REQUEST, UPDATE_CITY_SUCCESS, UPDATE_CITY_FAILURE],
  },
});

export const getAllCities = () => ({
  [RSAA]: {
    endpoint: ADMIN_CITIES_ENDPOINT,
    method: 'GET',
    types: [GET_ALL_CITIES_REQUEST, GET_ALL_CITIES_SUCCESS, GET_ALL_CITIES_FAILURE],
  },
});

export const getCityById = (id: number) => ({
  [RSAA]: {
    endpoint: ADMIN_CITY_BY_ID_ENDPOINT(id),
    method: 'GET',
    types: [GET_CITY_BY_ID_REQUEST, GET_CITY_BY_ID_SUCCESS, GET_CITY_BY_ID_FAILURE],
  },
});
