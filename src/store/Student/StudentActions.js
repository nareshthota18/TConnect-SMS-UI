// src/redux/actions/studentActions.js
import axios from "axios";
import { studenturl } from "../utils";
import { ADD_STUDENT, STUDENT_LIST } from "./StudentTypes";

export const studentStart = () => ({
  type: STUDENT_LIST.STUDENT_LIST_START,
});

export const studentSuccess = (data) => ({
  type: STUDENT_LIST.STUDENT_LIST_SUCCESS,
  payload: data,
});

export const studentFail = (payload) => ({
  type: STUDENT_LIST.STUDENT_LIST_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const fetchStudentsApi = () => async (dispatch) => {
  dispatch(studentStart());
  try {
    // const response = await axios.get(studenturl);
    const token = localStorage.getItem("authToken");
    const response = await axios.get(studenturl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(studentSuccess(response.data));
    console.log(response.data, "response");
    return response.data;
  } catch (error) {
    dispatch(studentFail(error.message));
  }
};



// ----- Add Student -----
export const addStudentStart = () => ({
  type: ADD_STUDENT.ADD_STUDENT_START,
});

export const addStudentSuccess = (data) => ({
  type: ADD_STUDENT.ADD_STUDENT_SUCCESS,
  payload: data,
});

export const addStudentFail = (payload) => ({
  type: ADD_STUDENT.ADD_STUDENT_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const addStudentApi = (studentData) => async (dispatch) => {
  dispatch(addStudentStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(studenturl, studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addStudentSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(addStudentFail(error.message));
  }
};