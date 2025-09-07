// src/redux/reducers/studentReducer.js
import { produce } from "immer";
import { STUDENT_LIST } from "./StudentTypes";

const initialState = {
  studentData: [],
  studentDataLoading: false,
  studentDataError: false,
};

export const studentReducer = produce((draft, action) => {
  switch (action.type) {
    case STUDENT_LIST.STUDENT_LIST_START:
      draft.studentDataLoading = true;
      draft.studentDataError = false;
      break;

    case STUDENT_LIST.STUDENT_LIST_SUCCESS:
      draft.studentDataLoading = false;
      draft.studentData = action.payload;
      draft.studentDataError = false;
      break;

    case STUDENT_LIST.STUDENT_LIST_FAIL:
      draft.studentDataLoading = false;
      draft.studentData = [];
      draft.studentDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);