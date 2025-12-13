// src/redux/reducers/notificationReducer.js
import { produce } from "immer";
import { NOTIFICATIONS_LIST } from "./NotificationsType";

const initialState = {
  notificationsData: [],
  notificationsDataLoading: false,
  notificationsDataError: false,
};

export const notificationReducer = produce((draft, action) => {
  switch (action.type) {

    // 🔹 GET Notifications
    case NOTIFICATIONS_LIST.NOTIFICATIONS_LIST_START:
      draft.notificationsDataLoading = true;
      draft.notificationsDataError = false;
      break;

    case NOTIFICATIONS_LIST.NOTIFICATIONS_LIST_SUCCESS:
      draft.notificationsDataLoading = false;
      draft.notificationsData = action.payload;
      draft.notificationsDataError = false;
      break;

    case NOTIFICATIONS_LIST.NOTIFICATIONS_LIST_FAIL:
      draft.notificationsDataLoading = false;
      draft.notificationsData = [];
      draft.notificationsDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
