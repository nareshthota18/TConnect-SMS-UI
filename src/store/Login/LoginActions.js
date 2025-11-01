// src/redux/actions/loginActions.js
import axios from "axios";
import { LOGIN } from "./LoginType";
import { loginUrl } from "../utils";

export const loginStart = () => ({
  type: LOGIN.LOGIN_START,
});

export const loginSuccess = (data) => ({
  type: LOGIN.LOGIN_SUCCESS,
  payload: data,
});

export const loginFail = (payload) => ({
  type: LOGIN.LOGIN_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

// ✅ NEW LOGOUT ACTION
export const logout = () => (dispatch) => {
    // Clear everything from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("tokenExpires");
    localStorage.removeItem("schoolId");
  
    // Dispatch reducer action
    dispatch({ type: LOGIN.LOGOUT });
  };

export const loginApi = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(loginUrl, credentials, {
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
      },
    });
    
    // The response data structure matches the Swagger response
    const responseData = {
      token: response.data.token,
      expires: response.data.expires,
      role: response.data.role
    };

    localStorage.setItem('authToken', responseData.token);
    localStorage.setItem('userRole', responseData.role);
    localStorage.setItem('tokenExpires', responseData.expires);
    
    dispatch(loginSuccess(responseData));
    return responseData;
  } catch (error) {
    // Handle different error response formats
    const errorPayload = error.response?.data || error.message;
    dispatch(loginFail(errorPayload));
    return null;
  }
};