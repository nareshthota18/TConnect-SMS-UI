// src/redux/reducers/studentReducer.js
import { produce } from "immer";
import { ADD_STUDENT, DELETE_STUDENT, STUDENT_LIST } from "./StudentTypes";

const initialState = {
  studentData: [],
  studentDataLoading: false,
  studentDataError: false,

  addstudentData: [],
  addstudentDataLoading: false,
  addstudentDataError: false,

  deletestudentData: [],
  deletestudentDataLoading: false,
  deletestudentDataError: false,
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

      

      case ADD_STUDENT.ADD_STUDENT_START:
        draft.addstudentDataLoading = true;
        draft.addstudentDataError = false;
        break;
  
      case ADD_STUDENT.ADD_STUDENT_SUCCESS:
        draft.addstudentDataLoading = false;
        draft.addstudentData = action.payload;
        draft.addstudentDataError = false;
        break;
  
      case ADD_STUDENT.ADD_STUDENT_FAIL:
        draft.addstudentDataLoading = false;
        draft.addstudentData = [];
        draft.addstudentDataError = action.payload;
        break;

      // Delete Student
    case DELETE_STUDENT.DELETE_STUDENT_START:
      draft.deletestudentDataLoading = true;
      draft.deletestudentDataError = false;
      break;

    case DELETE_STUDENT.DELETE_STUDENT_SUCCESS:
      draft.deletestudentDataLoading = false;
      draft.deletestudentData = action.payload;
      draft.deletestudentDataError = false;
      break;

    case DELETE_STUDENT.DELETE_STUDENT_FAIL:
      draft.deletestudentDataLoading = false;
      draft.deletestudentData = null;
      draft.deletestudentDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);