import axios from "axios";
import { NOTIFICATIONS_LIST } from "./NotificationsType";
import { notificationsUrl } from "../utils"; // ✅ make sure this is imported

// ------------------------------------------------------
// ✅ GET Notifications
// ------------------------------------------------------
export const notificationsStart = () => ({
  type: NOTIFICATIONS_LIST.NOTIFICATIONS_LIST_START,
});

export const notificationsSuccess = (data) => ({
  type: NOTIFICATIONS_LIST.NOTIFICATIONS_LIST_SUCCESS,
  payload: data,
});

export const notificationsFail = (payload) => ({
  type: NOTIFICATIONS_LIST.NOTIFICATIONS_LIST_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

// ❌ REMOVE hostelId parameter
export const fetchNotificationsApi = () => async (dispatch) => {
  dispatch(notificationsStart());

  try {
    const token = localStorage.getItem("authToken");

    // ✅ notificationsUrl is a STRING
    const response = await axios.get(notificationsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(notificationsSuccess(response.data));
    console.log("🔔 Notifications response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Notifications API error:",
      error.response?.data || error.message
    );
    dispatch(notificationsFail(error.message));
  }
};
