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
    email?: string;
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
        // if payload is empty object, reset the signupData object to empty
        // so the signup process can be started over from scratch
        signupData: Object.keys(action.payload).length === 0 ? {} : {
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
