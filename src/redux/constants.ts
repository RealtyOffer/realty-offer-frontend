export const BASE_ROOT = process.env.GATSBY_API_LOCATION;
export const API_VERSION = 'v1';
export const API_ROOT = BASE_ROOT ? `${BASE_ROOT}/api/${API_VERSION}` : '';

// Auth
export const AUTH_SIGNUP_ENDPOINT = `${API_ROOT}/auth/signup`;
export const AUTH_CONFIRM_ENDPOINT = `${API_ROOT}/auth/confirm`;
export const AUTH_LOGIN_ENDPOINT = `${API_ROOT}/auth/login`;
export const AUTH_FORGOT_PASSWORD_ENDPOINT = `${API_ROOT}/auth/forgot-password`;
export const AUTH_RESET_PASSWORD_ENDPOINT = `${API_ROOT}/auth/reset-password`;
export const AUTH_RESEND_SIGNUP_EMAIL_ENDPOINT = `${API_ROOT}/auth/resend-signup-email`;

// Agent
export const AGENT_PROFILE_ENDPOINT = `${API_ROOT}/agent/profile`;
export const AGENT_BANNERS_ENDPOINT = `${API_ROOT}/agent/site-banners`;
export const AGENT_BIDS_ENDPOINT = `${API_ROOT}/agent/bids`;
export const AGENT_BID_BY_ID_ENDPOINT = (id: number) => `${AGENT_BIDS_ENDPOINT}/${id}`;

// Agent Listings/Bidding
export const LISTINGS_ENDPOINT = `${API_ROOT}/agent/listings`;
export const BIDDING_ENDPOINT = `${API_ROOT}/agent/bids`;
export const LISTING_BY_ID_ENDPOINT = (id: number) => `${LISTINGS_ENDPOINT}/${id}`;

// Consumer
export const CREATE_CONSUMER_PROFILE_ENDPOINT = `${API_ROOT}/consumer/profile`;
export const UPDATE_CONSUMER_PROFILE_ENDPOINT = `${API_ROOT}/consumer/secured/profile`;
export const CONSUMER_BANNERS_ENDPOINT = `${API_ROOT}/consumer/site-banners`;

// Admin
export const ADMIN_SITE_BANNERS_ENDPOINT = `${API_ROOT}/admin/site-banners`;
export const ADMIN_SITE_BANNER_BY_ID_ENDPOINT = (id: number) =>
  `${ADMIN_SITE_BANNERS_ENDPOINT}/${id}`;

// Action Response Type
export type ActionResponseType = {
  error: number;
  payload: {
    status: number;
    response: {
      errors: {
        [key: string]: string;
      };
      title: string;
      errorCode: string;
    };
  };
};
