// src/redux/reducers/staffReducer.js
import { produce } from "immer";
import { ADD_STAFF, DELETE_STAFF, STAFF_LIST } from "./StaffType";

const initialState = {
  staffData: [],
  staffDataLoading: false,
  staffDataError: false,

  addStaffData: [],
  addStaffLoading: false,
  addStaffError: false,

  deleteStaffData: [],
  deleteStaffLoading: false,
  deleteStaffError: false,
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

    // Add Staff Cases
    // -----------------------
    case ADD_STAFF.ADD_STAFF_START:
      draft.addStaffLoading = true;
      draft.addStaffError = false;
      break;

    case ADD_STAFF.ADD_STAFF_SUCCESS:
      draft.addStaffLoading = false;
      draft.addStaffData = action.payload;
      draft.addStaffError = false;
      break;

    case ADD_STAFF.ADD_STAFF_FAIL:
      draft.addStaffLoading = false;
      draft.addStaffData = null;
      draft.addStaffError = action.payload;
      break;
    
    // Delete Staff Cases
    case DELETE_STAFF.DELETE_STAFF_START:
      draft.deleteStaffLoading = true;
      draft.deleteStaffError = false;
      break;

    case DELETE_STAFF.DELETE_STAFF_SUCCESS:
      draft.deleteStaffLoading = false;
      draft.deleteStaffData = action.payload;
      draft.deleteStaffError = false;
      break;

    case DELETE_STAFF.DELETE_STAFF_FAIL:
      draft.deleteStaffLoading = false;
      draft.deleteStaffData = null;
      draft.deleteStaffError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
