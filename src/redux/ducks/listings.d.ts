import { GET_LISTINGS_REQUEST, GET_LISTINGS_SUCCESS, GET_LISTINGS_FAILURE } from './listings';
import { LogoutRequestAction } from './auth.d';

export type ListingType = {
  id: number;
  type: 'seller' | 'buyer' | 'buyerSeller';
  listingType?: 'new' | 'pending' | 'awarded' | 'history';
  buyingCities?: Array<string>;
  buyingPriceRange?: string;
  freeMortgageConsult?: boolean;
  preApproved?: boolean;
  sellersCity?: string;
  sellersListingPriceInMind?: string;
  createDateTime: Date;
};

export type ListingStoreType = {
  isLoading: boolean;
  hasError: boolean;
  listings: Array<ListingType>;
};

export type GetListingsRequestAction = {
  type: typeof GET_LISTINGS_REQUEST;
  payload: ListingType['listingType'];
};

export type GetListingsSuccessAction = {
  type: typeof GET_LISTINGS_SUCCESS;
  payload: Array<ListingType>;
};

export type GetListingsFailureAction = {
  type: typeof GET_LISTINGS_FAILURE;
};

export type ListingsStoreActions =
  | GetListingsRequestAction
  | GetListingsSuccessAction
  | GetListingsFailureAction
  | LogoutRequestAction;
