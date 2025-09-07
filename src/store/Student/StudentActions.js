// src/redux/actions/studentActions.js
import axios from "axios";
import { studentdataurl } from "../utils";
import { STUDENT_LIST } from "./StudentTypes";

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
    const response = await axios.get(studentdataurl);
    dispatch(studentSuccess(response.data));
    console.log(response.data, "response");
    return response.data;
  } catch (error) {
    dispatch(studentFail(error.message));
  }
};
