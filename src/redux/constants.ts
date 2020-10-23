export const BASE_ROOT = process.env.GATSBY_API_LOCATION;
export const API_VERSION = 'v1';
export const API_ROOT = BASE_ROOT ? `${BASE_ROOT}/api/${API_VERSION}` : '';

// Auth
const AUTH_ROOT = `${API_ROOT}/auth`;
export const AUTH_SIGNUP_ENDPOINT = `${AUTH_ROOT}/signup`;
export const AUTH_CONFIRM_ENDPOINT = `${AUTH_ROOT}/confirm`;
export const AUTH_RESEND_SIGNUP_EMAIL_ENDPOINT = `${AUTH_ROOT}/resend-signup-email`;
export const AUTH_LOGIN_ENDPOINT = `${AUTH_ROOT}/login`;
export const AUTH_FORGOT_PASSWORD_ENDPOINT = `${AUTH_ROOT}/forgot-password`;
export const AUTH_RESET_PASSWORD_ENDPOINT = `${AUTH_ROOT}/reset-password`;
export const AUTH_REFRESH_ACCESS_TOKEN_ENDPOINT = `${AUTH_ROOT}/secured/refresh-access-token`;
export const AUTH_SECURED_PROFILE_ENDPOINT = `${AUTH_ROOT}/secured/profile`;

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
export const SECURED_CONSUMER_BIDS_ENDPOINT = `${API_ROOT}/consumer/secured/bids`;
export const SECURED_CONSUMER_BIDS_WINNER_ENDPOINT = `${SECURED_CONSUMER_BIDS_ENDPOINT}/winner`;
export const SECURED_CONSUMER_BIDS_WINNING_AGENT_ENDPOINT = `${SECURED_CONSUMER_BIDS_ENDPOINT}/get-winning-agent`;

// Admin
export const ADMIN_SITE_BANNERS_ENDPOINT = `${API_ROOT}/admin/site-banners`;
export const ADMIN_SITE_BANNER_BY_ID_ENDPOINT = (id: number) =>
  `${ADMIN_SITE_BANNERS_ENDPOINT}/${id}`;
export const ADMIN_CITIES_ENDPOINT = `${API_ROOT}/admin/cities`;
export const ADMIN_CITY_BY_ID_ENDPOINT = (id: number) => `${ADMIN_CITIES_ENDPOINT}/${id}`;
export const ADMIN_COUNTIES_ENDPOINT = `${API_ROOT}/admin/counties`;
export const ADMIN_COUNTY_BY_ID_ENDPOINT = (id: number) => `${ADMIN_COUNTIES_ENDPOINT}/${id}`;
export const ADMIN_EMAIL_TEMPLATE_ENDPOINT = `${API_ROOT}/admin/email-templates`;
export const ADMIN_EMAIL_TEMPLATE_BY_NAME_ENDPOINT = (templateName: string) =>
  `${ADMIN_EMAIL_TEMPLATE_ENDPOINT}/${templateName}`;

// User (generic)
const USER_ENDPOINT = `${API_ROOT}/user`;
const USER_DROPDOWN_LISTS_ENDPOINT = `${USER_ENDPOINT}/dropdown`;
const USER_SECURED_ENDPOINT = `${API_ROOT}/user/secured`;
export const USER_SITE_BANNERS_ENDPOINT = `${USER_SECURED_ENDPOINT}/site-banners`;
export const USER_CITIES_ENDPOINT = `${USER_ENDPOINT}/cities`;
export const DROPDOWN_LIST_GENDERS_ENDPOINT = `${USER_DROPDOWN_LISTS_ENDPOINT}/genders`;
export const DROPDOWN_LIST_GENDER_PREFERENCES_ENDPOINT = `${USER_DROPDOWN_LISTS_ENDPOINT}/genderpreferences`;
export const DROPDOWN_LIST_AGE_PREFERENCES_ENDPOINT = `${USER_DROPDOWN_LISTS_ENDPOINT}/age-preferences`;
export const DROPDOWN_LIST_LANGUAGES_ENDPOINT = `${USER_DROPDOWN_LISTS_ENDPOINT}/languages`;
export const DROPDOWN_LIST_STATES_ENDPOINT = `${USER_DROPDOWN_LISTS_ENDPOINT}/states`;
export const DROPDOWN_LIST_PRICE_RANGES_ENDPOINT = `${USER_DROPDOWN_LISTS_ENDPOINT}/priceranges`;
export const DROPDOWN_LIST_HOME_TYPES_ENDPOINT = `${USER_DROPDOWN_LISTS_ENDPOINT}/home-types`;
export const USER_NOTIFICATION_TYPES_ENDPOINT = `${USER_SECURED_ENDPOINT}/notifications`;
export const USER_NOTIFICATIONS_ENDPOINT = `${USER_SECURED_ENDPOINT}/user-notifications`;
export const USER_NOTIFICATION_SETTINGS_ENDPOINT = `${USER_SECURED_ENDPOINT}/notification-settings`;
export const USER_NOTIFICATION_SETTINGS_CONFIRM_ENDPOINT = `${USER_NOTIFICATION_SETTINGS_ENDPOINT}/confirm-device`;
export const S3_PROXY_ENDPOINT = `${USER_SECURED_ENDPOINT}/s3-proxy`;
export const S3_PROXY_BY_KEY_ENDPOINT = (key: string) => `${S3_PROXY_ENDPOINT}/${key}`;
export const PROFILE_PICTURE_BY_USERNAME_ENDPOINT = (userName: string) =>
  `${S3_PROXY_ENDPOINT}/get-profile-picture/${userName}`;

// FortisPay
export const FORTISPAY_ENDPOINT = `${API_ROOT}/fortis`;

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
