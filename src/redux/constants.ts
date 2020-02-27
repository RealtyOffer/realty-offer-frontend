export const BASE_ROOT = process.env.GATSBY_API_LOCATION;
export const API_VERSION = 'v1';
export const API_ROOT = BASE_ROOT ? `${BASE_ROOT}/api/${API_VERSION}` : '';

// Auth
export const AUTH_SIGNUP_ENDPOINT = `${API_ROOT}/Auth/signup`;
export const AUTH_CONFIRM_ENDPOINT = `${API_ROOT}/Auth/confirm`;
