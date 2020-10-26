import {
  GET_USER_SITE_BANNERS_REQUEST,
  GET_USER_SITE_BANNERS_SUCCESS,
  GET_USER_SITE_BANNERS_FAILURE,
  GET_USER_CITIES_REQUEST,
  GET_USER_CITIES_SUCCESS,
  GET_USER_CITIES_FAILURE,
  GET_USER_NOTIFICATION_SETTINGS_REQUEST,
  GET_USER_NOTIFICATION_SETTINGS_SUCCESS,
  GET_USER_NOTIFICATION_SETTINGS_FAILURE,
  UPDATE_USER_NOTIFICATION_SETTINGS_REQUEST,
  UPDATE_USER_NOTIFICATION_SETTINGS_SUCCESS,
  UPDATE_USER_NOTIFICATION_SETTINGS_FAILURE,
  CONFIRM_DEVICE_REQUEST,
  CONFIRM_DEVICE_SUCCESS,
  CONFIRM_DEVICE_FAILURE,
  GET_NOTIFICATION_TYPES_REQUEST,
  GET_NOTIFICATION_TYPES_SUCCESS,
  GET_NOTIFICATION_TYPES_FAILURE,
  GET_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST,
  GET_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS,
  GET_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE,
  UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST,
  UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS,
  UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE,
  GET_USER_AVATAR_REQUEST,
  GET_USER_AVATAR_SUCCESS,
  GET_USER_AVATAR_FAILURE,
  UPDATE_USER_AVATAR,
  ADD_ATTEMPTED_PRIVATE_PAGE,
  REMOVE_ATTEMPTED_PRIVATE_PAGE,
} from './user';
import { LogoutRequestAction } from './auth.d';

import { BannerType, CityType } from './admin.d';

export type NotificationSettingsType = {
  enableNotifications: boolean;
  emailAddress: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  forceResendPhoneCode: boolean;
  forceResendEmailCode: boolean;
};

export type ConfirmDeviceType = {
  confirmationCode: string;
  deviceType: 'phone' | 'email';
};

export type NotificationTypesType = {
  id: number;
  notificationName: string;
  description: string;
  type: 'listingAlerts' | 'myAccount' | 'productUpdates' | 'consumerAlerts';
};

export type UserNotificationSubscriptionType = {
  notificationId: number;
  email: boolean;
  inAppPush: boolean;
  sms: boolean;
  notificationFrequency: 'realTime' | 'hourly' | 'oncePerDay';
};

export type UserStoreType = {
  isLoading: boolean;
  hasError: boolean;
  banners?: Array<BannerType>;
  cities?: Array<CityType>;
  notificationSettings: NotificationSettingsType;
  notificationTypes: Array<NotificationTypesType>;
  userNotificationSubscriptions: Array<UserNotificationSubscriptionType>;
  avatar?: string;
  location?: string;
};

export type GetUserSiteBannersRequestAction = {
  type: typeof GET_USER_SITE_BANNERS_REQUEST;
};

export type GetUserSiteBannersSuccessAction = {
  type: typeof GET_USER_SITE_BANNERS_SUCCESS;
  payload: Array<BannerType>;
};

export type GetUserSiteBannersFailureAction = {
  type: typeof GET_USER_SITE_BANNERS_FAILURE;
};

export type GetUserCitiesRequestAction = {
  type: typeof GET_USER_CITIES_REQUEST;
};

export type GetUserCitiesSuccessAction = {
  type: typeof GET_USER_CITIES_SUCCESS;
  payload: Array<CityType>;
};

export type GetUserCitiesFailureAction = {
  type: typeof GET_USER_CITIES_FAILURE;
};

export type GetUserNotificationSettingsRequestAction = {
  type: typeof GET_USER_NOTIFICATION_SETTINGS_REQUEST;
};

export type GetUserNotificationSettingsSuccessAction = {
  type: typeof GET_USER_NOTIFICATION_SETTINGS_SUCCESS;
  payload: NotificationSettingsType;
};

export type GetUserNotificationSettingsFailureAction = {
  type: typeof GET_USER_NOTIFICATION_SETTINGS_FAILURE;
};

export type UpdateUserNotificationSettingsRequestAction = {
  type: typeof UPDATE_USER_NOTIFICATION_SETTINGS_REQUEST;
  payload: NotificationSettingsType;
};

export type UpdateUserNotificationSettingsSuccessAction = {
  type: typeof UPDATE_USER_NOTIFICATION_SETTINGS_SUCCESS;
  payload: NotificationSettingsType;
};

export type UpdateUserNotificationSettingsFailureAction = {
  type: typeof UPDATE_USER_NOTIFICATION_SETTINGS_FAILURE;
};

export type ConfirmDeviceRequestAction = {
  type: typeof CONFIRM_DEVICE_REQUEST;
  payload: ConfirmDeviceType;
};

export type ConfirmDeviceSuccessAction = {
  type: typeof CONFIRM_DEVICE_SUCCESS;
  payload: NotificationSettingsType;
};

export type ConfirmDeviceFailureAction = {
  type: typeof CONFIRM_DEVICE_FAILURE;
};

export type GetNotificationTypesRequestAction = {
  type: typeof GET_NOTIFICATION_TYPES_REQUEST;
};

export type GetNotificationTypesSuccessAction = {
  type: typeof GET_NOTIFICATION_TYPES_SUCCESS;
  payload: Array<NotificationTypesType>;
};

export type GetNotificationTypesFailureAction = {
  type: typeof GET_NOTIFICATION_TYPES_FAILURE;
};

export type GetUserNotificationSubscriptionsRequestAction = {
  type: typeof GET_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST;
};

export type GetUserNotificationSubscriptionsSuccessAction = {
  type: typeof GET_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS;
  payload: Array<UserNotificationSubscriptionType>;
};

export type GetUserNotificationSubscriptionsFailureAction = {
  type: typeof GET_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE;
};

export type UpdateUserNotificationSubscriptionsRequestAction = {
  type: typeof UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_REQUEST;
  payload: UserNotificationSubscriptionType;
};

export type UpdateUserNotificationSubscriptionsSuccessAction = {
  type: typeof UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_SUCCESS;
  payload: UserNotificationSubscriptionType;
};

export type UpdateUserNotificationSubscriptionsFailureAction = {
  type: typeof UPDATE_USER_NOTIFICATION_SUBSCRIPTIONS_FAILURE;
};

export type GetUserAvatarRequestAction = {
  type: typeof GET_USER_AVATAR_REQUEST;
};

export type GetUserAvatarSuccessAction = {
  type: typeof GET_USER_AVATAR_SUCCESS;
  payload: { url: string };
};

export type GetUserAvatarFailureAction = {
  type: typeof GET_USER_AVATAR_FAILURE;
};

export type UpdateUserAvatarAction = {
  type: typeof UPDATE_USER_AVATAR;
  payload: { url: string };
};

export type AddAttemptedPrivatePageAction = {
  type: typeof ADD_ATTEMPTED_PRIVATE_PAGE;
  payload: string;
};

export type RemoveAttemptedPrivatePageAction = {
  type: typeof REMOVE_ATTEMPTED_PRIVATE_PAGE;
};

export type UserActionTypes =
  | GetUserSiteBannersRequestAction
  | GetUserSiteBannersSuccessAction
  | GetUserSiteBannersFailureAction
  | GetUserCitiesRequestAction
  | GetUserCitiesSuccessAction
  | GetUserCitiesFailureAction
  | GetUserNotificationSettingsRequestAction
  | GetUserNotificationSettingsSuccessAction
  | GetUserNotificationSettingsFailureAction
  | UpdateUserNotificationSettingsRequestAction
  | UpdateUserNotificationSettingsSuccessAction
  | UpdateUserNotificationSettingsFailureAction
  | ConfirmDeviceRequestAction
  | ConfirmDeviceSuccessAction
  | ConfirmDeviceFailureAction
  | GetNotificationTypesRequestAction
  | GetNotificationTypesSuccessAction
  | GetNotificationTypesFailureAction
  | GetUserNotificationSubscriptionsRequestAction
  | GetUserNotificationSubscriptionsSuccessAction
  | GetUserNotificationSubscriptionsFailureAction
  | UpdateUserNotificationSubscriptionsRequestAction
  | UpdateUserNotificationSubscriptionsSuccessAction
  | UpdateUserNotificationSubscriptionsFailureAction
  | GetUserAvatarRequestAction
  | GetUserAvatarSuccessAction
  | GetUserAvatarFailureAction
  | UpdateUserAvatarAction
  | AddAttemptedPrivatePageAction
  | RemoveAttemptedPrivatePageAction
  | LogoutRequestAction;
