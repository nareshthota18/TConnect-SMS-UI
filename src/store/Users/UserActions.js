// src/redux/actions/userActions.js
import axios from "axios";
import { ADD_USER, USER_LIST } from "./UserType";
import { addUsersUrl, usersUrl } from "../utils";

export const userStart = () => ({
  type: USER_LIST.USER_LIST_START,
});

export const userSuccess = (data) => ({
  type: USER_LIST.USER_LIST_SUCCESS,
  payload: data,
});

export const userFail = (payload) => ({
  type: USER_LIST.USER_LIST_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const fetchUserApi = () => async (dispatch) => {
  dispatch(userStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(usersUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(userSuccess(response.data));
    console.log(response.data, "✅ user list response");
    return response.data;
  } catch (error) {
    console.error("❌ User List API error:", error.response?.data || error.message);
    dispatch(userFail(error.message));
  }
};



// ================= ADD USER =================
export const addUserStart = () => ({
    type: ADD_USER.ADD_USER_START,
  });
  
  export const addUserSuccess = (data) => ({
    type: ADD_USER.ADD_USER_SUCCESS,
    payload: data,
  });
  
  export const addUserFail = (payload) => ({
    type: ADD_USER.ADD_USER_FAIL,
    payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
  });
  
  export const addUserApi = (userData) => async (dispatch) => {
    dispatch(addUserStart());
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(addUsersUrl, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      dispatch(addUserSuccess(response.data));
      console.log(response.data, "✅ user added successfully");
      return response.data;
    } catch (error) {
      console.error("❌ Add User API error:", error.response?.data || error.message);
      dispatch(addUserFail(error.message));
    }
  };