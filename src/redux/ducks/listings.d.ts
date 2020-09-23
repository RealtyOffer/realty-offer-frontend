import {
  GET_NEW_LISTINGS_REQUEST,
  GET_NEW_LISTINGS_SUCCESS,
  GET_NEW_LISTINGS_FAILURE,
  GET_PENDING_LISTINGS_REQUEST,
  GET_PENDING_LISTINGS_SUCCESS,
  GET_PENDING_LISTINGS_FAILURE,
  GET_AWARDED_LISTINGS_REQUEST,
  GET_AWARDED_LISTINGS_SUCCESS,
  GET_AWARDED_LISTINGS_FAILURE,
  GET_HISTORY_LISTINGS_REQUEST,
  GET_HISTORY_LISTINGS_SUCCESS,
  GET_HISTORY_LISTINGS_FAILURE,
} from './listings';
import { LogoutRequestAction } from './auth.d';
import { CityType } from './admin.d';

export type ListingType = {
  id?: number;
  type?: 'buyer' | 'seller' | 'buyerSeller';
  buyingCities?: Array<CityType>;
  buyingPriceRangeId?: number;
  createDateTime: Date;
  freeMortgageConsult?: boolean;
  preApproved?: boolean;
  sellersAddressLine1?: string;
  sellersAddressLine2?: string;
  sellersCity?: CityType;
  sellersZip?: string;
  sellersTimeline?: string;
  sellersListingPriceInMindPriceRangeInMindId?: number;
  sellersMortgageBalanceId?: number;
  agentSubmittedBidId?: number;
  buyerTypeOfHomeId?: number;
  sellerTypeOfHomeId?: number;
};

export type ListingStoreType = {
  isLoading: boolean;
  hasError: boolean;
  lastFetched?: Date;
  new: Array<ListingType>;
  pending: Array<ListingType>;
  awarded: Array<ListingType>;
  history: Array<ListingType>;
};

export type GetNewListingsRequestAction = {
  type: typeof GET_NEW_LISTINGS_REQUEST;
};

export type GetNewListingsSuccessAction = {
  type: typeof GET_NEW_LISTINGS_SUCCESS;
  payload: Array<ListingType>;
};

export type GetNewListingsFailureAction = {
  type: typeof GET_NEW_LISTINGS_FAILURE;
};

export type GetPendingListingsRequestAction = {
  type: typeof GET_PENDING_LISTINGS_REQUEST;
};

export type GetPendingListingsSuccessAction = {
  type: typeof GET_PENDING_LISTINGS_SUCCESS;
  payload: Array<ListingType>;
};

export type GetPendingListingsFailureAction = {
  type: typeof GET_PENDING_LISTINGS_FAILURE;
};

export type GetAwardedListingsRequestAction = {
  type: typeof GET_AWARDED_LISTINGS_REQUEST;
};

export type GetAwardedListingsSuccessAction = {
  type: typeof GET_AWARDED_LISTINGS_SUCCESS;
  payload: Array<ListingType>;
};

export type GetAwardedListingsFailureAction = {
  type: typeof GET_AWARDED_LISTINGS_FAILURE;
};

export type GetHistoryListingsRequestAction = {
  type: typeof GET_HISTORY_LISTINGS_REQUEST;
};

export type GetHistoryListingsSuccessAction = {
  type: typeof GET_HISTORY_LISTINGS_SUCCESS;
  payload: Array<ListingType>;
};

export type GetHistoryListingsFailureAction = {
  type: typeof GET_HISTORY_LISTINGS_FAILURE;
};

export type ListingsStoreActions =
  | GetNewListingsRequestAction
  | GetNewListingsSuccessAction
  | GetNewListingsFailureAction
  | GetPendingListingsRequestAction
  | GetPendingListingsSuccessAction
  | GetPendingListingsFailureAction
  | GetAwardedListingsRequestAction
  | GetAwardedListingsSuccessAction
  | GetAwardedListingsFailureAction
  | GetHistoryListingsRequestAction
  | GetHistoryListingsSuccessAction
  | GetHistoryListingsFailureAction
  | LogoutRequestAction;
