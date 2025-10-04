import axios from "axios";
import { ADD_SCHOOLS, SCHOOLS_LIST } from "./SchoolsType";
import { addSchoolsUrl, schoolsUrl } from "../utils";

/*   SCHOOLS LIST ACTIONS  */
export const schoolsStart = () => ({
  type: SCHOOLS_LIST.SCHOOLS_LIST_START,
});

export const schoolsSuccess = (data) => ({
  type: SCHOOLS_LIST.SCHOOLS_LIST_SUCCESS,
  payload: data,
});

export const schoolsFail = (payload) => ({
  type: SCHOOLS_LIST.SCHOOLS_LIST_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

/**  Fetch Schools List API  */
export const fetchSchoolsApi = () => async (dispatch) => {
  dispatch(schoolsStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(schoolsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(schoolsSuccess(response.data));
    console.log(response.data, "schools list response");
    return response.data;
  } catch (error) {
    dispatch(schoolsFail(error.message));
  }
};


/*  ADD SCHOOLS ACTIONS  */
export const addSchoolStart = () => ({
  type: ADD_SCHOOLS.ADD_SCHOOLS_START,
});

export const addSchoolSuccess = (data) => ({
  type: ADD_SCHOOLS.ADD_SCHOOLS_SUCCESS,
  payload: data,
});

export const addSchoolFail = (payload) => ({
  type: ADD_SCHOOLS.ADD_SCHOOLS_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

/** 📡 Add School API */
export const addSchoolApi = (schoolData) => async (dispatch) => {
  dispatch(addSchoolStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(addSchoolsUrl, schoolData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addSchoolSuccess(response.data));
    console.log(response.data, "add school response");
    return response.data;
  } catch (error) {
    dispatch(addSchoolFail(error.message));
  }
};
