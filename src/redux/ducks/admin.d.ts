import {
  CREATE_SITE_BANNER_REQUEST,
  CREATE_SITE_BANNER_SUCCESS,
  CREATE_SITE_BANNER_FAILURE,
  UPDATE_SITE_BANNER_REQUEST,
  UPDATE_SITE_BANNER_SUCCESS,
  UPDATE_SITE_BANNER_FAILURE,
  GET_ALL_SITE_BANNERS_REQUEST,
  GET_ALL_SITE_BANNERS_SUCCESS,
  GET_ALL_SITE_BANNERS_FAILURE,
  GET_SITE_BANNER_BY_ID_REQUEST,
  GET_SITE_BANNER_BY_ID_SUCCESS,
  GET_SITE_BANNER_BY_ID_FAILURE,
  CREATE_CITY_REQUEST,
  CREATE_CITY_SUCCESS,
  CREATE_CITY_FAILURE,
  UPDATE_CITY_REQUEST,
  UPDATE_CITY_SUCCESS,
  UPDATE_CITY_FAILURE,
  GET_ALL_CITIES_REQUEST,
  GET_ALL_CITIES_SUCCESS,
  GET_ALL_CITIES_FAILURE,
  GET_CITY_BY_ID_REQUEST,
  GET_CITY_BY_ID_SUCCESS,
  GET_CITY_BY_ID_FAILURE,
  DELETE_CITY_REQUEST,
  DELETE_CITY_SUCCESS,
  DELETE_CITY_FAILURE,
  CREATE_COUNTY_REQUEST,
  CREATE_COUNTY_SUCCESS,
  CREATE_COUNTY_FAILURE,
  UPDATE_COUNTY_REQUEST,
  UPDATE_COUNTY_SUCCESS,
  UPDATE_COUNTY_FAILURE,
  GET_ALL_COUNTIES_REQUEST,
  GET_ALL_COUNTIES_SUCCESS,
  GET_ALL_COUNTIES_FAILURE,
  GET_COUNTY_BY_ID_REQUEST,
  GET_COUNTY_BY_ID_SUCCESS,
  GET_COUNTY_BY_ID_FAILURE,
  DELETE_COUNTY_REQUEST,
  DELETE_COUNTY_SUCCESS,
  DELETE_COUNTY_FAILURE,
} from './admin';

export type BannerType = {
  id: number;
  message: string;
  dismissable: boolean;
  callToActionLink: string;
  callToActionLinkText: string;
  expirationDate: string;
  audience: 'agent' | 'consumer' | 'both';
  styling: 'danger' | 'success' | 'info';
};

export type CityType = {
  id: number;
  name: string;
  countyId: number;
  state: string;
  monthlyPrice: number;
};

export type CountyType = {
  id: number;
  name: string;
  state: string;
  monthlyPrice: number;
};

export type AdminStoreType = {
  isLoading: boolean;
  hasError: boolean;
  banners: Array<BannerType>;
  cities: Array<CityType>;
  counties: Array<CountyType>;
};

export type CreateSiteBannerRequestAction = {
  type: typeof CREATE_SITE_BANNER_REQUEST;
  payload: BannerType;
};

export type CreateSiteBannerSuccessAction = {
  type: typeof CREATE_SITE_BANNER_SUCCESS;
  payload: BannerType;
};

export type CreateSiteBannerFailureAction = {
  type: typeof CREATE_SITE_BANNER_FAILURE;
};

export type UpdateSiteBannerRequestAction = {
  type: typeof UPDATE_SITE_BANNER_REQUEST;
  payload: BannerType;
};

export type UpdateSiteBannerSuccessAction = {
  type: typeof UPDATE_SITE_BANNER_SUCCESS;
  payload: BannerType;
};

export type UpdateSiteBannerFailureAction = {
  type: typeof UPDATE_SITE_BANNER_FAILURE;
};

export type GetAllSiteBannersRequestAction = {
  type: typeof GET_ALL_SITE_BANNERS_REQUEST;
  payload: Array<BannerType>;
};

export type GetAllSiteBannersSuccessAction = {
  type: typeof GET_ALL_SITE_BANNERS_SUCCESS;
  payload: Array<BannerType>;
};

export type GetAllSiteBannersFailureAction = {
  type: typeof GET_ALL_SITE_BANNERS_FAILURE;
};

export type GetSiteBannerByIdRequestAction = {
  type: typeof GET_SITE_BANNER_BY_ID_REQUEST;
  payload: { id: number };
};

export type GetSiteBannerByIdSuccessAction = {
  type: typeof GET_SITE_BANNER_BY_ID_SUCCESS;
  payload: BannerType;
};

export type GetSiteBannerByIdFailureAction = {
  type: typeof GET_SITE_BANNER_BY_ID_FAILURE;
};

export type CreateCityRequestAction = {
  type: typeof CREATE_CITY_REQUEST;
  payload: CityType;
};

export type CreateCitySuccessAction = {
  type: typeof CREATE_CITY_SUCCESS;
  payload: CityType;
};

export type CreateCityFailureAction = {
  type: typeof CREATE_CITY_FAILURE;
};

export type UpdateCityRequestAction = {
  type: typeof UPDATE_CITY_REQUEST;
  payload: CityType;
};

export type UpdateCitySuccessAction = {
  type: typeof UPDATE_CITY_SUCCESS;
  payload: CityType;
};

export type UpdateCityFailureAction = {
  type: typeof UPDATE_CITY_FAILURE;
};

export type DeleteCityRequestActionType = {
  type: typeof DELETE_CITY_REQUEST;
};

export type DeleteCitySuccessActionType = {
  type: typeof DELETE_CITY_SUCCESS;
  payload: {
    id: number;
  };
};

export type DeleteCityFailureActionType = {
  type: typeof DELETE_CITY_FAILURE;
};

export type GetAllCitiesRequestAction = {
  type: typeof GET_ALL_CITIES_REQUEST;
  payload: Array<CityType>;
};

export type GetAllCitiesSuccessAction = {
  type: typeof GET_ALL_CITIES_SUCCESS;
  payload: Array<CityType>;
};

export type GetAllCitiesFailureAction = {
  type: typeof GET_ALL_CITIES_FAILURE;
};

export type GetCityByIdRequestAction = {
  type: typeof GET_CITY_BY_ID_REQUEST;
  payload: { id: number };
};

export type GetCityByIdSuccessAction = {
  type: typeof GET_CITY_BY_ID_SUCCESS;
  payload: CityType;
};

export type GetCityByIdFailureAction = {
  type: typeof GET_CITY_BY_ID_FAILURE;
};

export type CreateCountyRequestAction = {
  type: typeof CREATE_COUNTY_REQUEST;
  payload: CountyType;
};

export type CreateCountySuccessAction = {
  type: typeof CREATE_COUNTY_SUCCESS;
  payload: CountyType;
};

export type CreateCountyFailureAction = {
  type: typeof CREATE_COUNTY_FAILURE;
};

export type UpdateCountyRequestAction = {
  type: typeof UPDATE_COUNTY_REQUEST;
  payload: CountyType;
};

export type UpdateCountySuccessAction = {
  type: typeof UPDATE_COUNTY_SUCCESS;
  payload: CountyType;
};

export type UpdateCountyFailureAction = {
  type: typeof UPDATE_COUNTY_FAILURE;
};

export type DeleteCountyRequestActionType = {
  type: typeof DELETE_COUNTY_REQUEST;
};

export type DeleteCountySuccessActionType = {
  type: typeof DELETE_COUNTY_SUCCESS;
  payload: {
    id: number;
  };
};

export type DeleteCountyFailureActionType = {
  type: typeof DELETE_COUNTY_FAILURE;
};

export type GetAllCountiesRequestAction = {
  type: typeof GET_ALL_COUNTIES_REQUEST;
  payload: Array<CountyType>;
};

export type GetAllCountiesSuccessAction = {
  type: typeof GET_ALL_COUNTIES_SUCCESS;
  payload: Array<CountyType>;
};

export type GetAllCountiesFailureAction = {
  type: typeof GET_ALL_COUNTIES_FAILURE;
};

export type GetCountyByIdRequestAction = {
  type: typeof GET_COUNTY_BY_ID_REQUEST;
  payload: { id: number };
};

export type GetCountyByIdSuccessAction = {
  type: typeof GET_COUNTY_BY_ID_SUCCESS;
  payload: CountyType;
};

export type GetCountyByIdFailureAction = {
  type: typeof GET_COUNTY_BY_ID_FAILURE;
};

export type AdminActionTypes =
  | CreateSiteBannerRequestAction
  | CreateSiteBannerSuccessAction
  | CreateSiteBannerFailureAction
  | UpdateSiteBannerRequestAction
  | UpdateSiteBannerSuccessAction
  | UpdateSiteBannerFailureAction
  | GetAllSiteBannersRequestAction
  | GetAllSiteBannersSuccessAction
  | GetAllSiteBannersFailureAction
  | GetSiteBannerByIdRequestAction
  | GetSiteBannerByIdSuccessAction
  | GetSiteBannerByIdFailureAction
  | CreateCityRequestAction
  | CreateCitySuccessAction
  | CreateCityFailureAction
  | UpdateCityRequestAction
  | UpdateCitySuccessAction
  | UpdateCityFailureAction
  | DeleteCityRequestActionType
  | DeleteCitySuccessActionType
  | DeleteCityFailureActionType
  | GetAllCitiesRequestAction
  | GetAllCitiesSuccessAction
  | GetAllCitiesFailureAction
  | GetCityByIdRequestAction
  | GetCityByIdSuccessAction
  | GetCityByIdFailureAction
  | CreateCountyRequestAction
  | CreateCountySuccessAction
  | CreateCountyFailureAction
  | UpdateCountyRequestAction
  | UpdateCountySuccessAction
  | UpdateCountyFailureAction
  | DeleteCountyRequestActionType
  | DeleteCountySuccessActionType
  | DeleteCountyFailureActionType
  | GetAllCountiesRequestAction
  | GetAllCountiesSuccessAction
  | GetAllCountiesFailureAction
  | GetCountyByIdRequestAction
  | GetCountyByIdSuccessAction
  | GetCountyByIdFailureAction;
