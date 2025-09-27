// src/redux/reducers/rolesReducer.js
import { produce } from "immer";
import { ROLES_LIST } from "./RoleType";

const initialState = {
  rolesData: [],
  rolesDataLoading: false,
  rolesDataError: false,
};

export const rolesReducer = produce((draft, action) => {
  switch (action.type) {
    case ROLES_LIST.ROLES_LIST_START:
      draft.rolesDataLoading = true;
      draft.rolesDataError = false;
      break;

    case ROLES_LIST.ROLES_LIST_SUCCESS:
      draft.rolesDataLoading = false;
      draft.rolesData = action.payload;
      draft.rolesDataError = false;
      break;

    case ROLES_LIST.ROLES_LIST_FAIL:
      draft.rolesDataLoading = false;
      draft.rolesData = [];
      draft.rolesDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
