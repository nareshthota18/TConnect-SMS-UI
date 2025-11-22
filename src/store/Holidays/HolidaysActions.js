// src/redux/actions/holidayActions.js
import axios from "axios";
import { ADD_HOLIDAY, DELETE_HOLIDAY, HOLIDAY_LIST } from "./HolidaysType";
import { addHolidayUrl, holidayUrl } from "../utils";


// ------------------------------------------------------
// ✅ GET Holidays
// ------------------------------------------------------
export const holidayStart = () => ({
  type: HOLIDAY_LIST.HOLIDAY_LIST_START,
});

export const holidaySuccess = (data) => ({
  type: HOLIDAY_LIST.HOLIDAY_LIST_SUCCESS,
  payload: data,
});

export const holidayFail = (payload) => ({
  type: HOLIDAY_LIST.HOLIDAY_LIST_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const fetchHolidayApi = (hostelId) => async (dispatch) => {
  dispatch(holidayStart());

  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(holidayUrl(hostelId), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(holidaySuccess(response.data));
    console.log(response.data, "holidays response");
    return response.data;
  } catch (error) {
    dispatch(holidayFail(error.message));
  }
};




// ------------------------------------------------------
// ✅ ADD Holiday (POST)
// ------------------------------------------------------
export const addHolidayStart = () => ({
  type: ADD_HOLIDAY.ADD_HOLIDAY_START,
});

export const addHolidaySuccess = (data) => ({
  type: ADD_HOLIDAY.ADD_HOLIDAY_SUCCESS,
  payload: data,
});

export const addHolidayFail = (payload) => ({
  type: ADD_HOLIDAY.ADD_HOLIDAY_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const addHolidayApi = (holidayData) => async (dispatch) => {
  dispatch(addHolidayStart());

  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(addHolidayUrl, holidayData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addHolidaySuccess(response.data));
    console.log(response.data, "✅ Holiday added successfully");
    return response.data;
  } catch (error) {
    console.error("❌ Add Holiday API error:", error.response?.data || error.message);
    dispatch(addHolidayFail(error.message));
  }
};



// ------------------------------------------------------
// ✅ DELETE Holiday
// ------------------------------------------------------
export const deleteHolidayStart = () => ({
  type: DELETE_HOLIDAY.DELETE_HOLIDAY_START,
});

export const deleteHolidaySuccess = (data) => ({
  type: DELETE_HOLIDAY.DELETE_HOLIDAY_SUCCESS,
  payload: data,
});

export const deleteHolidayFail = (payload) => ({
  type: DELETE_HOLIDAY.DELETE_HOLIDAY_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const deleteHolidayApi = (holidayId) => async (dispatch) => {
  dispatch(deleteHolidayStart());

  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.delete(deleteHolidayUrl(holidayId), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(deleteHolidaySuccess(response.data));
    console.log("✅ Holiday deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete Holiday API error:", error.response?.data || error.message);
    dispatch(deleteHolidayFail(error.message));
  }
};
