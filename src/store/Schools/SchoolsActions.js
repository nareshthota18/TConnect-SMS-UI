import axios from "axios";
import { ADD_SCHOOLS, DELETE_SCHOOLS, SCHOOLS_LIST } from "./SchoolsType";
import { addSchoolsUrl, deleteSchoolUrl, schoolsUrl } from "../utils";

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

    // dispatch(schoolsSuccess(response.data));
    // console.log(response.data, "schools list response");
    const schoolsData = response.data;
    dispatch(schoolsSuccess(schoolsData));
    console.log(schoolsData, "schools list response");

    // ✅ Store the first school's schoolId in localStorage
    if (Array.isArray(schoolsData) && schoolsData.length > 0) {
      const firstSchoolId = schoolsData[0].schoolId;
      const firstSchoolName = schoolsData[0].schoolName;
      localStorage.setItem("schoolId", firstSchoolId);
      localStorage.setItem("schoolName", firstSchoolName);
      console.log("Saved schoolId to localStorage:", firstSchoolId);
    }
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


/*  DELETE SCHOOLS ACTIONS */
export const deleteSchoolStart = () => ({
  type: DELETE_SCHOOLS.DELETE_SCHOOLS_START,
});

export const deleteSchoolSuccess = (data) => ({
  type: DELETE_SCHOOLS.DELETE_SCHOOLS_SUCCESS,
  payload: data,
});

export const deleteSchoolFail = (payload) => ({
  type: DELETE_SCHOOLS.DELETE_SCHOOLS_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

/** 🗑️ Delete School API */
export const deleteSchoolApi = (schoolId) => async (dispatch) => {
  dispatch(deleteSchoolStart());

  try {
    const token = localStorage.getItem("authToken");

    // 🔥 FIXED: use schoolId passed from component (do NOT override)
    const response = await axios.delete(
      deleteSchoolUrl(schoolId),  // Correct ID is used here
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(deleteSchoolSuccess(response.data));
    console.log("School deleted successfully:", response.data);

    return response.data; // allow awaiting
  } catch (error) {
    dispatch(deleteSchoolFail(error.response?.data?.message || error.message));
    throw error; // so UI catches failure
  }
};
