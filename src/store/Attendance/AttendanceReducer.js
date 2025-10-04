// src/redux/reducers/attendanceReducer.js
import { produce } from "immer";
import {
  ADD_STAFF_ATTENDANCE,
  ATTENDANCE_STAFF_LIST,
  ATTENDANCE_STUDENT_LIST,
} from "./AttendanceType";

const initialState = {
  attendanceStudentData: [],
  attendanceStudentDataLoading: false,
  attendanceStudentDataError: false,

  attendanceStaffData: [],
  attendanceStaffDataLoading: false,
  attendanceStaffDataError: false,

  addStaffAttendanceData: [],
  addStaffAttendanceDataLoading: false,
  addStaffAttendanceDataError: false,
};

export const attendanceStudentReducer = produce((draft, action) => {
  switch (action.type) {
    case ATTENDANCE_STUDENT_LIST.ATTENDANCE_STUDENT_LIST_START:
      draft.attendanceStudentDataLoading = true;
      draft.attendanceStudentDataError = false;
      break;

    case ATTENDANCE_STUDENT_LIST.ATTENDANCE_STUDENT_LIST_SUCCESS:
      draft.attendanceStudentDataLoading = false;
      draft.attendanceStudentData = action.payload;
      draft.attendanceStudentDataError = false;
      break;

    case ATTENDANCE_STUDENT_LIST.ATTENDANCE_STUDENT_LIST_FAIL:
      draft.attendanceStudentDataLoading = false;
      draft.attendanceStudentData = [];
      draft.attendanceStudentDataError = action.payload;
      break;

    case ATTENDANCE_STAFF_LIST.ATTENDANCE_STAFF_LIST_START:
      draft.attendanceStaffDataLoading = true;
      draft.attendanceStaffDataError = false;
      break;

    case ATTENDANCE_STAFF_LIST.ATTENDANCE_STAFF_LIST_SUCCESS:
      draft.attendanceStaffDataLoading = false;
      draft.attendanceStaffData = action.payload;
      draft.attendanceStaffDataError = false;
      break;

    case ATTENDANCE_STAFF_LIST.ATTENDANCE_STAFF_LIST_FAIL:
      draft.attendanceStaffDataLoading = false;
      draft.attendanceStaffData = [];
      draft.attendanceStaffDataError = action.payload;
      break;

    case ADD_STAFF_ATTENDANCE.ADD_STAFF_ATTENDANCE_START:
      draft.addStaffAttendanceDataLoading = true;
      draft.addStaffAttendanceDataError = false;
      break;

    case ADD_STAFF_ATTENDANCE.ADD_STAFF_ATTENDANCE_SUCCESS:
      draft.addStaffAttendanceDataLoading = false;
      draft.addStaffAttendanceData = action.payload;
      draft.addStaffAttendanceDataError = false;
      break;

    case ADD_STAFF_ATTENDANCE.ADD_STAFF_ATTENDANCE_FAIL:
      draft.addStaffAttendanceDataLoading = false;
      draft.addStaffAttendanceData = [];
      draft.addStaffAttendanceDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
