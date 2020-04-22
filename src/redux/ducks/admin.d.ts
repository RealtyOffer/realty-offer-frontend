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
} from './admin';

export type BannerType = {
  id: number;
  message: string;
  dismissable: boolean;
  callToActionLink: string;
  expirationDate: string;
  audience: string;
  styling: 'danger' | 'success' | 'info';
};

export type AdminStoreType = {
  isLoading: boolean;
  hasError: boolean;
  banners: Array<BannerType>;
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
  | GetSiteBannerByIdFailureAction;
