// src/redux/reducers/userReducer.js
import { produce } from "immer";
import { ADD_USER, DELETE_USER, USER_LIST } from "./UserType";

const initialState = {
  userData: [],
  userDataLoading: false,
  userDataError: false,

  addUserData: [],
  addUserLoading: false,
  addUserError: false,

  deleteUserData: [],
  deleteUserLoading: false,
  deleteUserError: false,
};

export const userReducer = produce((draft, action) => {
  switch (action.type) {
    case USER_LIST.USER_LIST_START:
      draft.userDataLoading = true;
      draft.userDataError = false;
      break;

    case USER_LIST.USER_LIST_SUCCESS:
      draft.userDataLoading = false;
      draft.userData = action.payload;
      draft.userDataError = false;
      break;

    case USER_LIST.USER_LIST_FAIL:
      draft.userDataLoading = false;
      draft.userData = [];
      draft.userDataError = action.payload;
      break;

    // ================= ADD USER =================
    case ADD_USER.ADD_USER_START:
      draft.addUserLoading = true;
      draft.addUserError = false;
      break;

    case ADD_USER.ADD_USER_SUCCESS:
      draft.addUserLoading = false;
      draft.addUserData = action.payload;
      draft.addUserError = false;
      break;

    case ADD_USER.ADD_USER_FAIL:
      draft.addUserLoading = false;
      draft.addUserError = action.payload;
      break;

    // ================= DELETE USER =================
    case DELETE_USER.DELETE_USER_START:
      draft.deleteUserLoading = true;
      draft.deleteUserError = false;
      break;

    case DELETE_USER.DELETE_USER_SUCCESS:
      draft.deleteUserLoading = false;
      draft.deleteUserData = action.payload;
      draft.deleteUserError = false;
      break;

    case DELETE_USER.DELETE_USER_FAIL:
      draft.deleteUserLoading = false;
      draft.deleteUserError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
