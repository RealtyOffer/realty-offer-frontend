import { RSAA } from 'redux-api-middleware';

import { LISTINGS_ENDPOINT } from '../constants';
import { LOGOUT_REQUEST } from './auth';

export const GET_LISTINGS_REQUEST = 'GET_LISTINGS_REQUEST';
export const GET_LISTINGS_SUCCESS = 'GET_LISTINGS_SUCCESS';
export const GET_LISTINGS_FAILURE = 'GET_LISTINGS_FAILURE';

export type ListingStoreType = {
  isLoading: boolean;
  hasError: boolean;
  listings: Array<ListingType>;
};

export const initialState: ListingStoreType = {
  isLoading: false,
  hasError: false,
  listings: [],
};

export default (state: ListingStoreType = initialState, action: any) => {
  switch (action.type) {
    case GET_LISTINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case GET_LISTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        listings: {
          ...action.payload,
        },
      };
    case GET_LISTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case LOGOUT_REQUEST:
      return { ...initialState };
    default:
      return state;
  }
};

export interface ListingType {
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
}

export const getListings = (payload: ListingType['listingType']) => ({
  [RSAA]: {
    endpoint: `${LISTINGS_ENDPOINT}?listingType=${payload}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [GET_LISTINGS_REQUEST, GET_LISTINGS_SUCCESS, GET_LISTINGS_FAILURE],
  },
});
