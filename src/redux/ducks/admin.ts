import { RSAA } from 'redux-api-middleware';

import {
  ADMIN_SITE_BANNERS_ENDPOINT,
  ADMIN_SITE_BANNER_BY_ID_ENDPOINT,
  ADMIN_CITIES_ENDPOINT,
  ADMIN_CITY_BY_ID_ENDPOINT,
  ADMIN_COUNTIES_ENDPOINT,
  ADMIN_COUNTY_BY_ID_ENDPOINT,
} from '../constants';
import { AdminStoreType, AdminActionTypes, BannerType, CityType, CountyType } from './admin.d';

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

export const DELETE_CITY_REQUEST = 'DELETE_CITY_REQUEST';
export const DELETE_CITY_SUCCESS = 'DELETE_CITY_SUCCESS';
export const DELETE_CITY_FAILURE = 'DELETE_CITY_FAILURE';

export const GET_ALL_CITIES_REQUEST = 'GET_ALL_CITIES_REQUEST';
export const GET_ALL_CITIES_SUCCESS = 'GET_ALL_CITIES_SUCCESS';
export const GET_ALL_CITIES_FAILURE = 'GET_ALL_CITIES_FAILURE';

export const GET_CITY_BY_ID_REQUEST = 'GET_CITY_BY_ID_REQUEST';
export const GET_CITY_BY_ID_SUCCESS = 'GET_CITY_BY_ID_SUCCESS';
export const GET_CITY_BY_ID_FAILURE = 'GET_CITY_BY_ID_FAILURE';

export const CREATE_COUNTY_REQUEST = 'CREATE_COUNTY_REQUEST';
export const CREATE_COUNTY_SUCCESS = 'CREATE_COUNTY_SUCCESS';
export const CREATE_COUNTY_FAILURE = 'CREATE_COUNTY_FAILURE';

export const UPDATE_COUNTY_REQUEST = 'UPDATE_COUNTY_REQUEST';
export const UPDATE_COUNTY_SUCCESS = 'UPDATE_COUNTY_SUCCESS';
export const UPDATE_COUNTY_FAILURE = 'UPDATE_COUNTY_FAILURE';

export const DELETE_COUNTY_REQUEST = 'DELETE_COUNTY_REQUEST';
export const DELETE_COUNTY_SUCCESS = 'DELETE_COUNTY_SUCCESS';
export const DELETE_COUNTY_FAILURE = 'DELETE_COUNTY_FAILURE';

export const GET_ALL_COUNTIES_REQUEST = 'GET_ALL_COUNTIES_REQUEST';
export const GET_ALL_COUNTIES_SUCCESS = 'GET_ALL_COUNTIES_SUCCESS';
export const GET_ALL_COUNTIES_FAILURE = 'GET_ALL_CITIES_FAILURE';

export const GET_COUNTY_BY_ID_REQUEST = 'GET_COUNTY_BY_ID_REQUEST';
export const GET_COUNTY_BY_ID_SUCCESS = 'GET_COUNTY_BY_ID_SUCCESS';
export const GET_COUNTY_BY_ID_FAILURE = 'GET_COUNTY_BY_ID_FAILURE';

export const initialState: AdminStoreType = {
  isLoading: false,
  hasError: false,
  banners: [],
  cities: [],
  counties: [],
};

export default (state: AdminStoreType = initialState, action: AdminActionTypes): AdminStoreType => {
  switch (action.type) {
    case DELETE_CITY_REQUEST:
    case DELETE_COUNTY_REQUEST:
    case CREATE_SITE_BANNER_REQUEST:
    case UPDATE_SITE_BANNER_REQUEST:
    case GET_ALL_SITE_BANNERS_REQUEST:
    case GET_SITE_BANNER_BY_ID_REQUEST:
    case GET_ALL_CITIES_REQUEST:
    case GET_ALL_COUNTIES_REQUEST:
    case GET_CITY_BY_ID_REQUEST:
    case GET_COUNTY_BY_ID_REQUEST:
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
    case CREATE_COUNTY_SUCCESS:
    case UPDATE_COUNTY_SUCCESS:
    case GET_COUNTY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        counties: [...state.counties, action.payload],
      };
    case DELETE_CITY_SUCCESS: {
      const {
        payload: { id },
      } = action;

      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== id),
      };
    }
    case DELETE_COUNTY_SUCCESS: {
      const {
        payload: { id },
      } = action;

      return {
        ...state,
        counties: state.counties.filter((county) => county.id !== id),
      };
    }
    case GET_ALL_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        cities: [...action.payload],
      };
    case GET_ALL_COUNTIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        counties: [...action.payload],
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
    case DELETE_CITY_FAILURE:
    case DELETE_COUNTY_FAILURE:
    case CREATE_CITY_FAILURE:
    case CREATE_COUNTY_FAILURE:
    case UPDATE_CITY_FAILURE:
    case UPDATE_COUNTY_FAILURE:
    case GET_CITY_BY_ID_FAILURE:
    case GET_COUNTY_BY_ID_FAILURE:
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
    case GET_ALL_COUNTIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        counties: [],
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

export const deleteCityById = (id: number) => ({
  [RSAA]: {
    endpoint: ADMIN_CITY_BY_ID_ENDPOINT(id),
    method: 'DELETE',
    types: [
      DELETE_CITY_REQUEST,
      { type: DELETE_CITY_SUCCESS, payload: { id } },
      DELETE_CITY_FAILURE,
    ],
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

export const createCounty = (payload: CountyType) => ({
  [RSAA]: {
    endpoint: ADMIN_COUNTIES_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [CREATE_COUNTY_REQUEST, CREATE_COUNTY_SUCCESS, CREATE_COUNTY_FAILURE],
  },
});

export const updateCounty = (payload: CountyType) => ({
  [RSAA]: {
    endpoint: ADMIN_COUNTIES_ENDPOINT,
    method: 'PUT',
    body: JSON.stringify(payload),
    types: [UPDATE_COUNTY_REQUEST, UPDATE_COUNTY_SUCCESS, UPDATE_COUNTY_FAILURE],
  },
});

export const deleteCountyById = (id: number) => ({
  [RSAA]: {
    endpoint: ADMIN_COUNTY_BY_ID_ENDPOINT(id),
    method: 'DELETE',
    types: [
      DELETE_COUNTY_REQUEST,
      { type: DELETE_COUNTY_SUCCESS, payload: { id } },
      DELETE_COUNTY_FAILURE,
    ],
  },
});

export const getAllCounties = () => ({
  [RSAA]: {
    endpoint: ADMIN_COUNTIES_ENDPOINT,
    method: 'GET',
    types: [GET_ALL_COUNTIES_REQUEST, GET_ALL_COUNTIES_SUCCESS, GET_ALL_COUNTIES_FAILURE],
  },
});

export const getCountyById = (id: number) => ({
  [RSAA]: {
    endpoint: ADMIN_COUNTY_BY_ID_ENDPOINT(id),
    method: 'GET',
    types: [GET_COUNTY_BY_ID_REQUEST, GET_COUNTY_BY_ID_SUCCESS, GET_COUNTY_BY_ID_FAILURE],
  },
});
