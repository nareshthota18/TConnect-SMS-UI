// src/redux/actions/staffActions.js
import axios from "axios";
import { STAFF_LIST } from "./StaffType";
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
