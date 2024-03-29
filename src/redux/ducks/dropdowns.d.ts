import {
  GET_GENDERS_LIST_REQUEST,
  GET_GENDERS_LIST_SUCCESS,
  GET_GENDERS_LIST_FAILURE,
  GET_GENDER_PREFERENCES_LIST_REQUEST,
  GET_GENDER_PREFERENCES_LIST_SUCCESS,
  GET_GENDER_PREFERENCES_LIST_FAILURE,
  GET_AGE_PREFERENCES_LIST_REQUEST,
  GET_AGE_PREFERENCES_LIST_SUCCESS,
  GET_AGE_PREFERENCES_LIST_FAILURE,
  GET_LANGUAGES_LIST_REQUEST,
  GET_LANGUAGES_LIST_SUCCESS,
  GET_LANGUAGES_LIST_FAILURE,
  GET_STATES_LIST_REQUEST,
  GET_STATES_LIST_SUCCESS,
  GET_STATES_LIST_FAILURE,
  GET_PRICE_RANGES_LIST_REQUEST,
  GET_PRICE_RANGES_LIST_SUCCESS,
  GET_PRICE_RANGES_LIST_FAILURE,
  GET_HOME_TYPES_LIST_REQUEST,
  GET_HOME_TYPES_LIST_SUCCESS,
  GET_HOME_TYPES_LIST_FAILURE,
} from './dropdowns';

export type ListPayloadType = Array<{
  value: string;
  text: string;
}>;

export type PriceRangePayloadType = Array<{
  min: number | null;
  max: number | null;
  value: string;
  text: string;
}>;

export type ListType = {
  isLoading: boolean;
  hasError: boolean;
  list: ListPayloadType;
};

export type DropdownStoreType = {
  genders: ListType;
  genderPreferences: ListType;
  agePreferences: ListType;
  languages: ListType;
  states: ListType;
  homeTypes: ListType;
  priceRanges: {
    isLoading: boolean;
    hasError: boolean;
    list: PriceRangePayloadType;
  };
};

export type GetGendersListRequestAction = {
  type: typeof GET_GENDERS_LIST_REQUEST;
};
export type GetGendersListSuccessAction = {
  type: typeof GET_GENDERS_LIST_SUCCESS;
  payload: ListPayloadType;
};
export type GetGendersListFailureAction = {
  type: typeof GET_GENDERS_LIST_FAILURE;
};

export type GetGenderPreferencesListRequestAction = {
  type: typeof GET_GENDER_PREFERENCES_LIST_REQUEST;
};
export type GetGenderPreferencesListSuccessAction = {
  type: typeof GET_GENDER_PREFERENCES_LIST_SUCCESS;
  payload: ListPayloadType;
};
export type GetGenderPreferencesListFailureAction = {
  type: typeof GET_GENDER_PREFERENCES_LIST_FAILURE;
};

export type GetAgePreferencesListRequestAction = {
  type: typeof GET_AGE_PREFERENCES_LIST_REQUEST;
};
export type GetAgePreferencesListSuccessAction = {
  type: typeof GET_AGE_PREFERENCES_LIST_SUCCESS;
  payload: ListPayloadType;
};
export type GetAgePreferencesListFailureAction = {
  type: typeof GET_AGE_PREFERENCES_LIST_FAILURE;
};

export type GetLanguagesListRequestAction = {
  type: typeof GET_LANGUAGES_LIST_REQUEST;
};
export type GetLanguagesListSuccessAction = {
  type: typeof GET_LANGUAGES_LIST_SUCCESS;
  payload: ListPayloadType;
};
export type GetLanguagesListFailureAction = {
  type: typeof GET_LANGUAGES_LIST_FAILURE;
};

export type GetStatesListRequestAction = {
  type: typeof GET_STATES_LIST_REQUEST;
};
export type GetStatesListSuccessAction = {
  type: typeof GET_STATES_LIST_SUCCESS;
  payload: ListPayloadType;
};
export type GetStatesListFailureAction = {
  type: typeof GET_STATES_LIST_FAILURE;
};

export type GetPriceRangesListRequestAction = {
  type: typeof GET_PRICE_RANGES_LIST_REQUEST;
};
export type GetPriceRangesListSuccessAction = {
  type: typeof GET_PRICE_RANGES_LIST_SUCCESS;
  payload: DropdownStoreType['priceRanges']['list'];
};
export type GetPriceRangesListFailureAction = {
  type: typeof GET_PRICE_RANGES_LIST_FAILURE;
};

export type GetHomeTypesListRequestAction = {
  type: typeof GET_HOME_TYPES_LIST_REQUEST;
};
export type GetHomeTypesListSuccessAction = {
  type: typeof GET_HOME_TYPES_LIST_SUCCESS;
  payload: ListPayloadType;
};
export type GetHomeTypesListFailureAction = {
  type: typeof GET_HOME_TYPES_LIST_FAILURE;
};

export type DropdownActionTypes =
  | GetGendersListRequestAction
  | GetGendersListSuccessAction
  | GetGendersListFailureAction
  | GetGenderPreferencesListRequestAction
  | GetGenderPreferencesListSuccessAction
  | GetGenderPreferencesListFailureAction
  | GetAgePreferencesListRequestAction
  | GetAgePreferencesListSuccessAction
  | GetAgePreferencesListFailureAction
  | GetLanguagesListRequestAction
  | GetLanguagesListSuccessAction
  | GetLanguagesListFailureAction
  | GetStatesListRequestAction
  | GetStatesListSuccessAction
  | GetStatesListFailureAction
  | GetPriceRangesListRequestAction
  | GetPriceRangesListSuccessAction
  | GetPriceRangesListFailureAction
  | GetHomeTypesListRequestAction
  | GetHomeTypesListSuccessAction
  | GetHomeTypesListFailureAction;
