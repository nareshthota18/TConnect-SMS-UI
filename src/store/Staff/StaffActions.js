// src/redux/actions/staffActions.js
import axios from "axios";
import { ADD_STAFF, STAFF_LIST } from "./StaffType";
import { staffUrl } from "../utils";

export const staffStart = () => ({
  type: STAFF_LIST.STAFF_LIST_START,
});

export const staffSuccess = (data) => ({
  type: STAFF_LIST.STAFF_LIST_SUCCESS,
  payload: data,
});

export const staffFail = (payload) => ({
  type: STAFF_LIST.STAFF_LIST_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const fetchStaffApi = () => async (dispatch) => {
  dispatch(staffStart());
  try {
    // ✅ either use token from localStorage
    const token = localStorage.getItem("authToken");
    const response = await axios.get(staffUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(staffSuccess(response.data));
    console.log(response.data, "✅ staff response");
    return response.data;
  } catch (error) {
    console.error("❌ Staff API error:", error.response?.data || error.message);
    dispatch(staffFail(error.message));
  }
};



// Add Staff Actions
export const addStaffStart = () => ({
  type: ADD_STAFF.ADD_STAFF_START,
});

export const addStaffSuccess = (data) => ({
  type: ADD_STAFF.ADD_STAFF_SUCCESS,
  payload: data,
});

export const addStaffFail = (payload) => ({
  type: ADD_STAFF.ADD_STAFF_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const addStaffApi = (staffData) => async (dispatch) => {
  dispatch(addStaffStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(staffUrl, staffData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addStaffSuccess(response.data));
    console.log("✅ Add staff response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Add Staff API error:", error.response?.data || error.message);
    dispatch(addStaffFail(error.message));
  }
};