// src/redux/actions/attendanceActions.js
import axios from "axios";
import { ATTENDANCE_STAFF_LIST, ATTENDANCE_STUDENT_LIST } from "./AttendanceType";
import { attendanceStaffUrl, attendanceStudentUrl } from "../utils";

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
      const response = await axios.get(attendanceStaffUrl, {
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