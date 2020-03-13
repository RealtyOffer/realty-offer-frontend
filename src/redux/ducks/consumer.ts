// import { RSAA } from 'redux-api-middleware';

export const CAPTURE_CONSUMER_DATA = 'CAPTURE_CONSUMER_DATA';

export type ConsumerStoreType = {
  signupData: {
    consumerType?: 'buyer' | 'seller' | 'buyerSeller';
    buyingCity?: string | Array<string>;
    buyingPriceRange?: string;
    freeMortgageConsult?: boolean;
    preApproved?: boolean;
    sellersAddressLine1?: string;
    sellersAddressLine2?: string;
    sellersCity?: string;
    sellersState?: string;
    sellersZip?: number;
    sellersTimeline?: string;
    selleresListingPriceInMind?: string;
    sellersMortgageBalance?: string;
    otherLanguage?: string;
    genderPreference?: string;
  }
}

export const initialState: ConsumerStoreType = {
  signupData: {},
};

export default (
  state: ConsumerStoreType = initialState,
  action: any,
) => {
  switch (action.type) {
    case CAPTURE_CONSUMER_DATA:
      return {
        ...state,
        signupData: {
          ...state.signupData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const captureConsumerData = (payload: ConsumerStoreType['signupData']) => ({
  type: CAPTURE_CONSUMER_DATA,
  payload,
});
