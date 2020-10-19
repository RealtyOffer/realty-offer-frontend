import { RSAA } from 'redux-api-middleware';

import {
  USER_SITE_BANNERS_ENDPOINT,
  USER_CITIES_ENDPOINT,
  USER_NOTIFICATION_SETTINGS_ENDPOINT,
  USER_NOTIFICATION_SETTINGS_CONFIRM_ENDPOINT,
  USER_NOTIFICATION_TYPES_ENDPOINT,
  USER_NOTIFICATIONS_ENDPOINT,
  S3_PROXY_BY_KEY_ENDPOINT,
} from '../constants';
import { LOGOUT_REQUEST } from './auth';
import {
  UserStoreType,
  UserActionTypes,
  NotificationSettingsType,
  UserNotificationSubscriptionType,
} from './user.d';
import { BannerType } from './admin.d';

export const GET_USER_SITE_BANNERS_REQUEST = 'GET_USER_SITE_BANNERS_REQUEST';
export const GET_USER_SITE_BANNERS_SUCCESS = 'GET_USER_SITE_BANNERS_SUCCESS';
export const GET_USER_SITE_BANNERS_FAILURE = 'GET_USER_SITE_BANNERS_FAILURE';

export const GET_USER_CITIES_REQUEST = 'GET_USER_CITIES_REQUEST';
export const GET_USER_CITIES_SUCCESS = 'GET_USER_CITIES_SUCCESS';
export const GET_USER_CITIES_FAILURE = 'GET_USER_CITIES_FAILURE';

export const GET_USER_NOTIFICATION_SETTINGS_REQUEST = 'GET_USER_NOTIFICATION_SETTINGS_REQUEST';
export const GET_USER_NOTIFICATION_SETTINGS_SUCCESS = 'GET_USER_NOTIFICATION_SETTINGS_SUCCESS';
export const GET_USER_NOTIFICATION_SETTINGS_FAILURE = 'GET_USER_NOTIFICATION_SETTINGS_FAILURE';

export const UPDATE_USER_NOTIFICATION_SETTINGS_REQUEST =
  'UPDATE_USER_NOTIFICATION_SETTINGS_REQUEST';
export const UPDATE_USER_NOTIFICATION_SETTINGS_SUCCESS =
  'UPDATE_USER_NOTIFICATION_SETTINGS_SUCCESS';
export const UPDATE_USER_NOTIFICATION_SETTINGS_FAILURE =
  'UPDATE_USER_NOTIFICATION_SETTINGS_FAILURE';

export const CONFIRM_DEVICE_REQUEST = 'CONFIRM_DEVICE_REQUEST';
export const CONFIRM_DEVICE_SUCCESS = 'CONFIRM_DEVICE_SUCCESS';
export const CONFIRM_DEVICE_FAILURE = 'CONFIRM_DEVICE_FAILURE';

export const GET_NOTIFICATION_TYPES_REQUEST = 'GET_NOTIFICATION_TYPES_REQUEST';
export const GET_NOTIFICATION_TYPES_SUCCESS = 'GET_NOTIFICATION_TYPES_SUCCESS';
export const GET_NOTIFICATION_TYPES_FAILURE = 'GET_NOTIFICATION_TYPES_FAILURE';

export const GET_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST =
  'GET_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST';
export const GET_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS =
  'GET_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS';
export const GET_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE =
  'GET_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE';

export const UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST =
  'UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST';
export const UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS =
  'UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS';
export const UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE =
  'UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE';

export const GET_USER_AVATAR_REQUEST = 'GET_USER_AVATAR_REQUEST';
export const GET_USER_AVATAR_SUCCESS = 'GET_USER_AVATAR_SUCCESS';
export const GET_USER_AVATAR_FAILURE = 'GET_USER_AVATAR_FAILURE';

export const UPDATE_USER_AVATAR = 'UPDATE_USER_AVATAR';

export const initialState: UserStoreType = {
  isLoading: false,
  hasError: false,
  banners: [],
  cities: [],
  notificationSettings: {
    enableNotifications: false,
    emailAddress: '',
    emailConfirmed: false,
    phoneNumber: '',
    phoneNumberConfirmed: false,
    forceResendPhoneCode: false,
    forceResendEmailCode: false,
  },
  notificationTypes: [],
  userNotificationSubscriptions: [],
  avatar: '',
};

export default (state: UserStoreType = initialState, action: UserActionTypes): UserStoreType => {
  switch (action.type) {
    case UPDATE_USER_NOTIFICATION_SETTINGS_REQUEST:
    case GET_USER_SITE_BANNERS_REQUEST:
    case GET_USER_CITIES_REQUEST:
    case GET_USER_NOTIFICATION_SETTINGS_REQUEST:
    case GET_NOTIFICATION_TYPES_REQUEST:
    case GET_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST:
    case GET_USER_AVATAR_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case GET_USER_NOTIFICATION_SETTINGS_SUCCESS:
    case UPDATE_USER_NOTIFICATION_SETTINGS_SUCCESS:
    case CONFIRM_DEVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        notificationSettings: { ...action.payload },
      };
    case GET_NOTIFICATION_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        notificationTypes: [...action.payload],
      };
    case GET_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        userNotificationSubscriptions: [...action.payload],
      };
    case UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        userNotificationSubscriptions: [...state.userNotificationSubscriptions, action.payload],
      };
    case GET_USER_SITE_BANNERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        banners: [...action.payload],
      };
    case GET_USER_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        cities: [...action.payload],
      };
    case GET_USER_AVATAR_SUCCESS:
    case UPDATE_USER_AVATAR:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        avatar: action.payload.url,
      };
    case GET_USER_SITE_BANNERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        banners: [],
      };
    case GET_USER_CITIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        cities: [],
      };
    case UPDATE_USER_NOTIFICATION_SETTINGS_FAILURE:
    case CONFIRM_DEVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case GET_USER_NOTIFICATION_SETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        notificationSettings: {
          ...initialState.notificationSettings,
        },
      };
    case GET_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        userNotificationSubscriptions: {
          ...initialState.userNotificationSubscriptions,
        },
      };
    case UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        userNotificationSubscriptions: {
          ...state.userNotificationSubscriptions,
        },
      };
    case GET_NOTIFICATION_TYPES_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        notificationTypes: {
          ...initialState.notificationTypes,
        },
      };
    case GET_USER_AVATAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        avatar: initialState.avatar,
      };
    case LOGOUT_REQUEST:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const getUserSiteBanners = (payload: BannerType['audience']) => ({
  [RSAA]: {
    endpoint: `${USER_SITE_BANNERS_ENDPOINT}?bannerAudience=${payload}`,
    method: 'GET',
    types: [
      GET_USER_SITE_BANNERS_REQUEST,
      GET_USER_SITE_BANNERS_SUCCESS,
      GET_USER_SITE_BANNERS_FAILURE,
    ],
  },
});

export const getUserCities = () => ({
  [RSAA]: {
    endpoint: USER_CITIES_ENDPOINT,
    method: 'GET',
    skipOauth: true,
    types: [GET_USER_CITIES_REQUEST, GET_USER_CITIES_SUCCESS, GET_USER_CITIES_FAILURE],
  },
});

export const getUserNotificationSettings = () => ({
  [RSAA]: {
    endpoint: USER_NOTIFICATION_SETTINGS_ENDPOINT,
    method: 'GET',
    types: [
      GET_USER_NOTIFICATION_SETTINGS_REQUEST,
      GET_USER_NOTIFICATION_SETTINGS_SUCCESS,
      GET_USER_NOTIFICATION_SETTINGS_FAILURE,
    ],
  },
});

export const updateUserNotificationSettings = (payload: NotificationSettingsType) => ({
  [RSAA]: {
    endpoint: USER_NOTIFICATION_SETTINGS_ENDPOINT,
    method: 'PUT',
    body: JSON.stringify(payload),
    types: [
      UPDATE_USER_NOTIFICATION_SETTINGS_REQUEST,
      UPDATE_USER_NOTIFICATION_SETTINGS_SUCCESS,
      UPDATE_USER_NOTIFICATION_SETTINGS_FAILURE,
    ],
  },
});

export const getUserNotificationSubscriptions = () => ({
  [RSAA]: {
    endpoint: USER_NOTIFICATIONS_ENDPOINT,
    method: 'GET',
    types: [
      GET_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST,
      GET_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS,
      GET_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE,
    ],
  },
});

export const updateUserNotificationSubscriptions = (payload: UserNotificationSubscriptionType) => ({
  [RSAA]: {
    endpoint: USER_NOTIFICATIONS_ENDPOINT,
    method: 'PUT',
    body: JSON.stringify(payload),
    types: [
      UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST,
      UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS,
      UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE,
    ],
  },
});

export const confirmDevice = (payload: {
  confirmationCode: string;
  deviceType: 'phone' | 'email';
}) => ({
  [RSAA]: {
    endpoint: USER_NOTIFICATION_SETTINGS_CONFIRM_ENDPOINT,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [CONFIRM_DEVICE_REQUEST, CONFIRM_DEVICE_SUCCESS, CONFIRM_DEVICE_FAILURE],
  },
});

export const getNotificationTypes = () => ({
  [RSAA]: {
    endpoint: USER_NOTIFICATION_TYPES_ENDPOINT,
    method: 'GET',
    types: [
      GET_NOTIFICATION_TYPES_REQUEST,
      GET_NOTIFICATION_TYPES_SUCCESS,
      GET_NOTIFICATION_TYPES_FAILURE,
    ],
  },
});

export const getUserAvatar = () => ({
  [RSAA]: {
    endpoint: S3_PROXY_BY_KEY_ENDPOINT('avatar.jpg'),
    method: 'GET',
    // bailout: (state: RootState) => state.user.avatar,
    types: [GET_USER_AVATAR_REQUEST, GET_USER_AVATAR_SUCCESS, GET_USER_AVATAR_FAILURE],
  },
});

export const updateUserAvatar = (url: string) => ({
  type: UPDATE_USER_AVATAR,
  payload: { url },
});
