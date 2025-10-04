// src/redux/reducers/rolesReducer.js
import { produce } from "immer";
import { ADD_ROLE, ROLES_LIST } from "./RoleType";

const initialState = {
  rolesData: [],
  rolesDataLoading: false,
  rolesDataError: false,

  addRoleData: [],
  addRoleLoading: false,
  addRoleError: false,
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

    
    // Add Role
    case ADD_ROLE.ADD_ROLE_START:
      draft.addRoleLoading = true;
      draft.addRoleError = false;
      break;

    case ADD_ROLE.ADD_ROLE_SUCCESS:
      draft.addRoleLoading = false;
      draft.addRoleData = action.payload;
      draft.addRoleError = false;
      break;

    case ADD_ROLE.ADD_ROLE_FAIL:
      draft.addRoleLoading = false;
      draft.addRoleData = null;
      draft.addRoleError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
