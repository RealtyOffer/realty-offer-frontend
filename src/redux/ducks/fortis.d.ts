import {
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_SUCCESS,
    CREATE_CONTACT_FAILURE,
    CREATE_ACCOUNTVAULT_REQUEST,
    CREATE_ACCOUNTVAULT_SUCCESS,
    CREATE_ACCOUNTVAULT_FAILURE,
    CREATE_RECURRING_REQUEST,
    CREATE_RECURRING_SUCCESS,
    CREATE_RECURRING_FAILURE,
  } from './fortis';
  
  import { LogoutRequestAction } from './auth.d';
  
  export type FortispayStoreType = {
    isLoading: boolean;
    hasError: boolean;
  };
  
  export type CreateContactRequestAction = {
    type: typeof CREATE_CONTACT_REQUEST;
  };
  
  export type CreateContactSuccessAction = {
    type: typeof CREATE_CONTACT_SUCCESS;
    payload: any;
  };
  
  export type CreateContactFailureAction = {
    type: typeof CREATE_CONTACT_FAILURE;
  };
  
  export type CreateAccountvaultRequestAction = {
    type: typeof CREATE_ACCOUNTVAULT_REQUEST;
  };
  
  export type CreateAccountvaultSuccessAction = {
    type: typeof CREATE_ACCOUNTVAULT_SUCCESS;
    payload: any;
  };
  
  export type CreateAccountvaultFailureAction = {
    type: typeof CREATE_ACCOUNTVAULT_FAILURE;
  };
  
  export type CreateRecurringRequestAction = {
    type: typeof CREATE_RECURRING_REQUEST;
  };
  export type CreateRecurringSuccessAction = {
    type: typeof CREATE_RECURRING_SUCCESS;
    payload: any;
  };
  export type CreateRecurringFailureAction = {
    type: typeof CREATE_RECURRING_FAILURE;
  };
  
  export type FortispayStoreActions =
    | CreateContactRequestAction
    | CreateContactSuccessAction
    | CreateContactFailureAction
    | CreateAccountvaultRequestAction
    | CreateAccountvaultSuccessAction
    | CreateAccountvaultFailureAction
    | CreateRecurringRequestAction
    | CreateRecurringSuccessAction
    | CreateRecurringFailureAction
    | LogoutRequestAction;
  