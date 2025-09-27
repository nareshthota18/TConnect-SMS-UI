// src/redux/reducers/userReducer.js
import { produce } from "immer";
import { ADD_USER, USER_LIST } from "./UserType";

const initialState = {
  userData: [],
  userDataLoading: false,
  userDataError: false,

  addUserData: [],
  addUserLoading: false,
  addUserError: false,
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


    default:
      return draft;
  }
}, initialState);
