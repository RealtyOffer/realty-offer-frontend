import {
  GET_GENDERS_LIST_REQUEST,
  GET_GENDERS_LIST_SUCCESS,
  GET_GENDERS_LIST_FAILURE,
  GET_GENDER_PREFERENCES_LIST_REQUEST,
  GET_GENDER_PREFERENCES_LIST_SUCCESS,
  GET_GENDER_PREFERENCES_LIST_FAILURE,
  GET_LANGUAGES_LIST_REQUEST,
  GET_LANGUAGES_LIST_SUCCESS,
  GET_LANGUAGES_LIST_FAILURE,
  GET_STATES_LIST_REQUEST,
  GET_STATES_LIST_SUCCESS,
  GET_STATES_LIST_FAILURE,
  GET_PRICE_RANGES_LIST_REQUEST,
  GET_PRICE_RANGES_LIST_SUCCESS,
  GET_PRICE_RANGES_LIST_FAILURE,
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
  languages: ListType;
  states: ListType;
  priceRanges: Omit<ListType, 'list'> & { list: PriceRangePayloadType };
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
  payload: ListPayloadType;
};
export type GetPriceRangesListFailureAction = {
  type: typeof GET_PRICE_RANGES_LIST_FAILURE;
};

export type DropdownActionTypes =
  | GetGendersListRequestAction
  | GetGendersListSuccessAction
  | GetGendersListFailureAction
  | GetGenderPreferencesListRequestAction
  | GetGenderPreferencesListSuccessAction
  | GetGenderPreferencesListFailureAction
  | GetLanguagesListRequestAction
  | GetLanguagesListSuccessAction
  | GetLanguagesListFailureAction
  | GetStatesListRequestAction
  | GetStatesListSuccessAction
  | GetStatesListFailureAction
  | GetPriceRangesListRequestAction
  | GetPriceRangesListSuccessAction
  | GetPriceRangesListFailureAction;
