import {
  ALL_USERS,
  ALL_USERS_LIST,
  ALL_PERMISSIONS,
  ALL_GROUPS,
  MANAGE_GROUPS,
  INIT_USER_ACTION,
  SUCCESS_USER_ACTION,
  ERROR_USER_ACTION,
} from "../actions/types";

const initialState = {
  all_users: null,
  all_users_list: null,
  all_permissions: null,
  all_groups: null,
  groups: null,
  isSaving: false,
  isSuccess: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_USERS:
      return {
        ...state,
        all_users: action.payload,
      };
    case ALL_USERS_LIST:
      return {
        ...state,
        all_users_list: action.payload,
      };
    case ALL_PERMISSIONS:
      return {
        ...state,
        all_permissions: action.payload,
      };
    case ALL_GROUPS:
      return {
        ...state,
        all_groups: action.payload,
      };
    case MANAGE_GROUPS:
      return {
        ...state,
        groups: action.payload,
      };
    case INIT_USER_ACTION:
      return {
        ...state,
        isSaving: true,
        isSuccess: false,
      };
    case SUCCESS_USER_ACTION:
      return {
        ...state,
        isSaving: false,
        isSuccess: true,
      };
    case ERROR_USER_ACTION:
      return {
        ...state,
        isSaving: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
