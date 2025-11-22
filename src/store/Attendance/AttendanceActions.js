// src/redux/actions/attendanceActions.js
import axios from "axios";
import { ADD_STAFF_ATTENDANCE, ADD_STUDENT_ATTENDANCE, ATTENDANCE_STAFF_LIST, ATTENDANCE_STUDENT_LIST } from "./AttendanceType";
import { attendanceStaffGetUrl, attendanceStaffUrl, attendanceStudentAddUrl, attendanceStudentUrl } from "../utils";

export const attendanceStudentStart = () => ({
  type: ATTENDANCE_STUDENT_LIST.ATTENDANCE_STUDENT_LIST_START,
});

export const attendanceStudentSuccess = (data) => ({
  type: ATTENDANCE_STUDENT_LIST.ATTENDANCE_STUDENT_LIST_SUCCESS,
  payload: data,
});

export const attendanceStudentFail = (payload) => ({
  type: ATTENDANCE_STUDENT_LIST.ATTENDANCE_STUDENT_LIST_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const fetchAttendanceStudentApi = () => async (dispatch) => {
  dispatch(attendanceStudentStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(attendanceStudentUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(attendanceStudentSuccess(response.data));
    console.log(response.data, "attendance student response");
    return response.data;
  } catch (error) {
    dispatch(attendanceStudentFail(error.message));
  }
};



export const attendanceStaffStart = () => ({
    type: ATTENDANCE_STAFF_LIST.ATTENDANCE_STAFF_LIST_START,
  });
  
  export const attendanceStaffSuccess = (data) => ({
    type: ATTENDANCE_STAFF_LIST.ATTENDANCE_STAFF_LIST_SUCCESS,
    payload: data,
  });
  
  export const attendanceStaffFail = (payload) => ({
    type: ATTENDANCE_STAFF_LIST.ATTENDANCE_STAFF_LIST_FAIL,
    payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
  });
  
  export const fetchAttendanceStaffApi = () => async (dispatch) => {
    dispatch(attendanceStaffStart());
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(attendanceStaffGetUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      dispatch(attendanceStaffSuccess(response.data));
      console.log(response.data, "attendance staff response");
      return response.data;
    } catch (error) {
      dispatch(attendanceStaffFail(error.message));
    }
  };


// ---------- Add Staff Attendance Actions ----------
export const addStaffAttendanceStart = () => ({
  type: ADD_STAFF_ATTENDANCE.ADD_STAFF_ATTENDANCE_START,
});

export const addStaffAttendanceSuccess = (data) => ({
  type: ADD_STAFF_ATTENDANCE.ADD_STAFF_ATTENDANCE_SUCCESS,
  payload: data,
});

export const addStaffAttendanceFail = (payload) => ({
  type: ADD_STAFF_ATTENDANCE.ADD_STAFF_ATTENDANCE_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const addStaffAttendanceApi = (attendanceData) => async (dispatch) => {
  dispatch(addStaffAttendanceStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(attendanceStaffUrl, attendanceData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addStaffAttendanceSuccess(response.data));
    console.log(response.data, "add staff attendance response");
    return response.data;
  } catch (error) {
    dispatch(addStaffAttendanceFail(error.message));
  }
};

// ---------- Add Student Attendance Actions ----------
export const addStudentAttendanceStart = () => ({
  type: ADD_STUDENT_ATTENDANCE.ADD_STUDENT_ATTENDANCE_START,
});

export const addStudentAttendanceSuccess = (data) => ({
  type: ADD_STUDENT_ATTENDANCE.ADD_STUDENT_ATTENDANCE_SUCCESS,
  payload: data,
});

export const addStudentAttendanceFail = (payload) => ({
  type: ADD_STUDENT_ATTENDANCE.ADD_STUDENT_ATTENDANCE_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload?.message || "An error occurred",
});

export const addStudentAttendanceApi = (attendanceData) => async (dispatch) => {
  dispatch(addStudentAttendanceStart());
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(attendanceStudentAddUrl, attendanceData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addStudentAttendanceSuccess(response.data));
    console.log(response.data, "add student attendance response");
    return response.data;

  } catch (error) {
    dispatch(addStudentAttendanceFail(error.message));
  }
};
