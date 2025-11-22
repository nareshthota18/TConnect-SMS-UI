// src/redux/actions/studentActions.js
import axios from "axios";
import { deleteStudentUrl, getStudentByGrade, studenturl } from "../utils";
import { ADD_STUDENT, DELETE_STUDENT, GET_STUDENT_BY_GRADE, STUDENT_LIST } from "./StudentTypes";

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
    const schoolId = localStorage.getItem("schoolId");
    const response = await axios.get(studenturl, {
      headers: {
        Authorization: `Bearer ${token}`,
        RSHostelId: schoolId,
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
    const schoolId = localStorage.getItem("schoolId");
    const response = await axios.post(studenturl, studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        RSHostelId: schoolId,
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


// Delete Student
// ========================
export const deleteStudentStart = () => ({
  type: DELETE_STUDENT.DELETE_STUDENT_START,
});

export const deleteStudentSuccess = (data) => ({
  type: DELETE_STUDENT.DELETE_STUDENT_SUCCESS,
  payload: data,
});

export const deleteStudentFail = (payload) => ({
  type: DELETE_STUDENT.DELETE_STUDENT_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "Failed to delete student",
});

export const deleteStudentApi = (studentId) => async (dispatch) => {
  dispatch(deleteStudentStart());
  try {
    const token = localStorage.getItem("authToken");
    const schoolId = localStorage.getItem("schoolId");
    const response = await axios.delete(deleteStudentUrl(studentId), {
      headers: {
        Authorization: `Bearer ${token}`,
        RSHostelId: schoolId,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(deleteStudentSuccess(response.data));
    console.log("Deleted student:", response.data);
    return response.data;
  } catch (error) {
    dispatch(deleteStudentFail(error.message));
    throw error;
  }
};


export const studentByGradeStart = () => ({
  type: GET_STUDENT_BY_GRADE.GET_STUDENT_BY_GRADE_START,
});

export const studentByGradeSuccess = (data) => ({
  type: GET_STUDENT_BY_GRADE.GET_STUDENT_BY_GRADE_SUCCESS,
  payload: data,
});

export const studentByGradeFail = (payload) => ({
  type: GET_STUDENT_BY_GRADE.GET_STUDENT_BY_GRADE_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const fetchStudentByGradeApi = (id) => async (dispatch) => {
  dispatch(studentByGradeStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(getStudentByGrade(id), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(studentByGradeSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(studentByGradeFail(error.message));
  }
};
