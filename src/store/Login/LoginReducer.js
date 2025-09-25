// src/redux/reducers/loginReducer.js
import { produce } from "immer";
import { LOGIN } from "./LoginType";

const initialState = {
  user: null,            // Will store { token, expires, role }
  loginLoading: false,   // true when login request is in progress
  loginError: null,      // error message if login fails
  isAuthenticated: false // track if user is logged in
};

export const loginReducer = produce((draft, action) => {
  switch (action.type) {
    case LOGIN.LOGIN_START:
      draft.loginLoading = true;
      draft.loginError = null;
      draft.isAuthenticated = false;
      break;

    case LOGIN.LOGIN_SUCCESS:
      draft.loginLoading = false;
      draft.user = action.payload; // This will be { token, expires, role }
      draft.isAuthenticated = true;
      draft.loginError = null;
      break;

    case LOGIN.LOGIN_FAIL:
      draft.loginLoading = false;
      draft.user = null;
      draft.isAuthenticated = false;
      draft.loginError = action.payload;
      break;

    case LOGIN.LOGOUT:
      draft.user = null;
      draft.isAuthenticated = false;
      draft.loginLoading = false;
      draft.loginError = null;
      break;

    // Optional: Add token refresh case if needed
    case LOGIN.REFRESH_TOKEN:
      if (draft.user) {
        draft.user.token = action.payload.token;
        draft.user.expires = action.payload.expires;
      }
      break;

    default:
      return draft;
  }
}, initialState);