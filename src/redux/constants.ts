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
export const AGENT_BIDS_ENDPOINT = `${API_ROOT}/agent/bids`;
export const AGENT_BID_BY_ID_ENDPOINT = (id: number) => `${AGENT_BIDS_ENDPOINT}/${id}`;

// Agent Listings/Bidding
export const LISTINGS_ENDPOINT = `${API_ROOT}/agent/listings`;
export const BIDDING_ENDPOINT = `${API_ROOT}/agent/bids`;
export const LISTING_BY_ID_ENDPOINT = (id: number) => `${LISTINGS_ENDPOINT}/${id}`;

// Consumer
export const CREATE_CONSUMER_PROFILE_ENDPOINT = `${API_ROOT}/consumer/profile`;
export const SECURED_CONSUMER_PROFILE_ENDPOINT = `${API_ROOT}/consumer/secured/profile`;

// Admin
export const ADMIN_SITE_BANNERS_ENDPOINT = `${API_ROOT}/admin/site-banners`;
export const ADMIN_SITE_BANNER_BY_ID_ENDPOINT = (id: number) =>
  `${ADMIN_SITE_BANNERS_ENDPOINT}/${id}`;
export const ADMIN_CITIES_ENDPOINT = `${API_ROOT}/admin/cities`;
export const ADMIN_CITY_BY_ID_ENDPOINT = (id: number) => `${ADMIN_CITIES_ENDPOINT}/${id}`;

// User (generic)
const USER_ENDPOINT = `${API_ROOT}/user`;
const USER_SECURED_ENDPOINT = `${API_ROOT}/user/secured`;
export const USER_SITE_BANNERS_ENDPOINT = `${USER_SECURED_ENDPOINT}/site-banners`;
export const USER_CITIES_ENDPOINT = `${USER_ENDPOINT}/cities`;
export const USER_NOTIFICATION_TYPES_ENDPOINT = `${USER_SECURED_ENDPOINT}/notifications`;
export const USER_NOTIFICATIONS_ENDPOINT = `${USER_SECURED_ENDPOINT}/user-notifications`;
export const USER_NOTIFICATION_SETTINGS_ENDPOINT = `${USER_SECURED_ENDPOINT}/notification-settings`;
export const USER_NOTIFICATION_SETTINGS_CONFIRM_ENDPOINT = `${USER_NOTIFICATION_SETTINGS_ENDPOINT}/confirm-device`;
export const S3_PROXY_ENDPOINT = `${USER_SECURED_ENDPOINT}/s3-proxy`;
export const S3_PROXY_BY_KEY_ENDPOINT = (key: string) => `${S3_PROXY_ENDPOINT}/${key}`;

// Action Response Type
export type ActionResponseType = {
  error: number;
  payload: {
    status: number;
    [key: string]: any;
    response: {
      errors: {
        [key: string]: string;
      };
      title: string;
      errorCode: string;
    };
  };
  type: string;
};
