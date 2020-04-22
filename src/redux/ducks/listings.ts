import { RSAA } from 'redux-api-middleware';

// TODO remove
import addHours from 'date-fns/addHours';

import { LISTINGS_ENDPOINT } from '../constants';
import { LOGOUT_REQUEST } from './auth';

import { ListingStoreType, ListingType, ListingsStoreActions } from './listings.d';

export const GET_LISTINGS_REQUEST = 'GET_LISTINGS_REQUEST';
export const GET_LISTINGS_SUCCESS = 'GET_LISTINGS_SUCCESS';
export const GET_LISTINGS_FAILURE = 'GET_LISTINGS_FAILURE';

export const initialState: ListingStoreType = {
  isLoading: false,
  hasError: false,
  listings: [
    // TODO: remove
    {
      id: 3,
      type: 'buyerSeller',
      sellersListingPriceInMind: '$300-350k',
      sellersCity: {
        id: 4,
        name: 'Livonia',
        state: 'MI',
        monthlyPrice: 10,
      },
      buyingPriceRange: '$350-375k',
      buyingCities: [
        {
          id: 3,
          name: 'Plymouth',
          state: 'MI',
          monthlyPrice: 10,
        },
        {
          id: 4,
          name: 'Livonia',
          state: 'MI',
          monthlyPrice: 10,
        },
      ],
      createDateTime: String(addHours(new Date(), 22)),
    },
  ],
};

export default (
  state: ListingStoreType = initialState,
  action: ListingsStoreActions
): ListingStoreType => {
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
        // listings: {
        //   ...action.payload,
        // },
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
