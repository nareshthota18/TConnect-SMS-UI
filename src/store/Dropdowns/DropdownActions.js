// src/redux/actions/departmentsActions.js
import axios from "axios";
import { departmentsUrl, designationsUrl, gradesUrl } from "../utils";
import { DEPARTMENTS_LIST, DESIGNATIONS_LIST, GRADES_LIST } from "./DropdownType";

// Action creators
export const departmentsStart = () => ({
  type: DEPARTMENTS_LIST.DEPARTMENTS_LIST_START,
});

export const departmentsSuccess = (data) => ({
  type: DEPARTMENTS_LIST.DEPARTMENTS_LIST_SUCCESS,
  payload: data,
});

export const departmentsFail = (payload) => ({
  type: DEPARTMENTS_LIST.DEPARTMENTS_LIST_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

// Thunk to fetch departments
export const fetchDepartmentsApi = () => async (dispatch) => {
  dispatch(departmentsStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(departmentsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(departmentsSuccess(response.data));
    console.log(response.data, "departments response");
    return response.data;
  } catch (error) {
    dispatch(departmentsFail(error.message));
  }
};



// src/redux/actions/designationsActions.js
export const designationsStart = () => ({
    type: DESIGNATIONS_LIST.DESIGNATIONS_LIST_START,
  });
  
  export const designationsSuccess = (data) => ({
    type: DESIGNATIONS_LIST.DESIGNATIONS_LIST_SUCCESS,
    payload: data,
  });
  
  export const designationsFail = (payload) => ({
    type: DESIGNATIONS_LIST.DESIGNATIONS_LIST_FAIL,
    payload:
      typeof payload === "string"
        ? payload
        : payload.message || "An error occurred",
  });
  

  export const fetchDesignationsApi = () => async (dispatch) => {
    dispatch(designationsStart());
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(designationsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      dispatch(designationsSuccess(response.data));
      console.log(response.data, "designations response");
      return response.data;
    } catch (error) {
      dispatch(designationsFail(error.message));
    }
  };


// Action creators
export const gradesStart = () => ({
    type: GRADES_LIST.GRADES_LIST_START,
  });
  
  export const gradesSuccess = (data) => ({
    type: GRADES_LIST.GRADES_LIST_SUCCESS,
    payload: data,
  });
  
  export const gradesFail = (payload) => ({
    type: GRADES_LIST.GRADES_LIST_FAIL,
    payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
  });
  
  // Thunk to fetch grades
  export const fetchGradesApi = () => async (dispatch) => {
    dispatch(gradesStart());
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(gradesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      dispatch(gradesSuccess(response.data));
      console.log(response.data, "grades response");
      return response.data;
    } catch (error) {
      dispatch(gradesFail(error.message));
    }
  };