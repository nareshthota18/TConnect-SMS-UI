// src/redux/reducers/activityReducer.js
import { produce } from "immer";
import { ACTIVITY_LIST, ADD_ACTIVITY, DELETE_ACTIVITY } from "./ActivitiesType";

const initialState = {
  activityData: [],
  activityDataLoading: false,
  activityDataError: false,

  addActivityData: [],
  addActivityLoading: false,
  addActivityError: false,

  deleteActivityData: [],
  deleteActivityLoading: false,
  deleteActivityError: false,
};

export const activityReducer = produce((draft, action) => {
  switch (action.type) {

    // 🔹 GET Activities
    case ACTIVITY_LIST.ACTIVITY_LIST_START:
      draft.activityDataLoading = true;
      draft.activityDataError = false;
      break;

    case ACTIVITY_LIST.ACTIVITY_LIST_SUCCESS:
      draft.activityDataLoading = false;
      draft.activityData = action.payload;
      draft.activityDataError = false;
      break;

    case ACTIVITY_LIST.ACTIVITY_LIST_FAIL:
      draft.activityDataLoading = false;
      draft.activityData = [];
      draft.activityDataError = action.payload;
      break;


    // 🔹 ADD Activity
    case ADD_ACTIVITY.ADD_ACTIVITY_START:
      draft.addActivityLoading = true;
      draft.addActivityError = false;
      break;

    case ADD_ACTIVITY.ADD_ACTIVITY_SUCCESS:
      draft.addActivityLoading = false;
      draft.addActivityData = action.payload;
      draft.addActivityError = false;
      break;

    case ADD_ACTIVITY.ADD_ACTIVITY_FAIL:
      draft.addActivityLoading = false;
      draft.addActivityData = null;
      draft.addActivityError = action.payload;
      break;


    // 🔹 DELETE Activity
    case DELETE_ACTIVITY.DELETE_ACTIVITY_START:
      draft.deleteActivityLoading = true;
      draft.deleteActivityError = false;
      break;

    case DELETE_ACTIVITY.DELETE_ACTIVITY_SUCCESS:
      draft.deleteActivityLoading = false;
      draft.deleteActivityData = action.payload;
      draft.deleteActivityError = false;
      break;

    case DELETE_ACTIVITY.DELETE_ACTIVITY_FAIL:
      draft.deleteActivityLoading = false;
      draft.deleteActivityData = null;
      draft.deleteActivityError = action.payload;
      break;


    default:
      return draft;
  }
}, initialState);
