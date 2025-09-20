// src/redux/reducers/staffReducer.js
import { produce } from "immer";
import { STAFF_LIST } from "./StaffType";

const initialState = {
  staffData: [],
  staffDataLoading: false,
  staffDataError: false,
};

export const staffReducer = produce((draft, action) => {
  switch (action.type) {
    case STAFF_LIST.STAFF_LIST_START:
      draft.staffDataLoading = true;
      draft.staffDataError = false;
      break;

    case STAFF_LIST.STAFF_LIST_SUCCESS:
      draft.staffDataLoading = false;
      draft.staffData = action.payload;
      draft.staffDataError = false;
      break;

    case STAFF_LIST.STAFF_LIST_FAIL:
      draft.staffDataLoading = false;
      draft.staffData = [];
      draft.staffDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
