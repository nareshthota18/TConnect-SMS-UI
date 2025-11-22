// src/redux/actions/activityActions.js
import axios from "axios";
import { ACTIVITY_LIST, ADD_ACTIVITY, DELETE_ACTIVITY } from "./ActivitiesType";
import { activityUrl, addActivityUrl } from "../utils";


// ------------------------------------------------------
// ✅ GET Activities
// ------------------------------------------------------
export const activityStart = () => ({
  type: ACTIVITY_LIST.ACTIVITY_LIST_START,
});

export const activitySuccess = (data) => ({
  type: ACTIVITY_LIST.ACTIVITY_LIST_SUCCESS,
  payload: data,
});

export const activityFail = (payload) => ({
  type: ACTIVITY_LIST.ACTIVITY_LIST_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const fetchActivityApi = (hostelId) => async (dispatch) => {
  dispatch(activityStart());

  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(activityUrl(hostelId), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(activitySuccess(response.data));
    console.log(response.data, "activities response");
    return response.data;
  } catch (error) {
    dispatch(activityFail(error.message));
  }
};




// ------------------------------------------------------
// ✅ ADD Activity (POST)
// ------------------------------------------------------
export const addActivityStart = () => ({
  type: ADD_ACTIVITY.ADD_ACTIVITY_START,
});

export const addActivitySuccess = (data) => ({
  type: ADD_ACTIVITY.ADD_ACTIVITY_SUCCESS,
  payload: data,
});

export const addActivityFail = (payload) => ({
  type: ADD_ACTIVITY.ADD_ACTIVITY_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const addActivityApi = (activityData) => async (dispatch) => {
    dispatch(addActivityStart());
  
    try {
      const token = localStorage.getItem("authToken");
  
      const response = await axios.post(
        addActivityUrl,    // ✅ correct, no parameters
        activityData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch(addActivitySuccess(response.data));
      console.log("✅ Activity added:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Add Activity API error:", error.response?.data || error.message);
      dispatch(addActivityFail(error.message));
    }
  };
  

// ------------------------------------------------------
// ✅ DELETE Activity
// ------------------------------------------------------
export const deleteActivityStart = () => ({
  type: DELETE_ACTIVITY.DELETE_ACTIVITY_START,
});

export const deleteActivitySuccess = (data) => ({
  type: DELETE_ACTIVITY.DELETE_ACTIVITY_SUCCESS,
  payload: data,
});

export const deleteActivityFail = (payload) => ({
  type: DELETE_ACTIVITY.DELETE_ACTIVITY_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const deleteActivityApi = (activityId) => async (dispatch) => {
  dispatch(deleteActivityStart());

  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.delete(deleteActivityUrl(activityId), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(deleteActivitySuccess(response.data));
    console.log("✅ Activity deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete Activity API error:", error.response?.data || error.message);
    dispatch(deleteActivityFail(error.message));
  }
};
