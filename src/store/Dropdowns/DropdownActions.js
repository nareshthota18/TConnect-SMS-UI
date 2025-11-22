// src/redux/actions/departmentsActions.js
import axios from "axios";
import { attendanceTypesUrl, categoriesUrl, departmentsUrl, designationsUrl, gradesUrl } from "../utils";
import { ADD_ATTENDANCE_TYPES, ADD_CATEGORIES, ADD_DEPARTMENTS, ADD_DESIGNATIONS, ADD_GRADES, ATTENDANCE_TYPES_LIST, CATEGORIES_LIST, DEPARTMENTS_LIST, DESIGNATIONS_LIST, GRADES_LIST } from "./DropdownType";

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


  // ======================
// ✅ Categories Actions
// ======================
export const categoriesStart = () => ({
  type: CATEGORIES_LIST.CATEGORIES_LIST_START,
});

export const categoriesSuccess = (data) => ({
  type: CATEGORIES_LIST.CATEGORIES_LIST_SUCCESS,
  payload: data,
});

export const categoriesFail = (payload) => ({
  type: CATEGORIES_LIST.CATEGORIES_LIST_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const fetchCategoriesApi = () => async (dispatch) => {
  dispatch(categoriesStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(categoriesUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(categoriesSuccess(response.data));
    console.log(response.data, "categories response");
    return response.data;
  } catch (error) {
    dispatch(categoriesFail(error.message));
    return null;
  }
};



export const attendanceTypesStart = () => ({
  type: ATTENDANCE_TYPES_LIST.ATTENDANCE_TYPES_LIST_START,
});

export const attendanceTypesSuccess = (data) => ({
  type: ATTENDANCE_TYPES_LIST.ATTENDANCE_TYPES_LIST_SUCCESS,
  payload: data,
});

export const attendanceTypesFail = (payload) => ({
  type: ATTENDANCE_TYPES_LIST.ATTENDANCE_TYPES_LIST_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});


export const fetchAttendanceTypesApi = () => async (dispatch) => {
  dispatch(attendanceTypesStart());
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(attendanceTypesUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(attendanceTypesSuccess(response.data));
    console.log(response.data, "attendance types response");
    return response.data;
  } catch (error) {
    dispatch(attendanceTypesFail(error.message));
  }
};


// ======================
// ✅ Add Departments
// ======================
export const addDepartmentsStart = () => ({
  type: ADD_DEPARTMENTS.ADD_DEPARTMENTS_START,
});

export const addDepartmentsSuccess = (data) => ({
  type: ADD_DEPARTMENTS.ADD_DEPARTMENTS_SUCCESS,
  payload: data,
});

export const addDepartmentsFail = (payload) => ({
  type: ADD_DEPARTMENTS.ADD_DEPARTMENTS_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const addDepartmentsApi = (postData) => async (dispatch) => {
  dispatch(addDepartmentsStart());
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(departmentsUrl, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addDepartmentsSuccess(response.data));
    console.log(response.data, "add departments response");
    return response.data;
  } catch (error) {
    dispatch(addDepartmentsFail(error.message));
  }
};


// ======================
// ✅ Add Designations
// ======================
export const addDesignationsStart = () => ({
  type: ADD_DESIGNATIONS.ADD_DESIGNATIONS_START,
});

export const addDesignationsSuccess = (data) => ({
  type: ADD_DESIGNATIONS.ADD_DESIGNATIONS_SUCCESS,
  payload: data,
});

export const addDesignationsFail = (payload) => ({
  type: ADD_DESIGNATIONS.ADD_DESIGNATIONS_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const addDesignationsApi = (postData) => async (dispatch) => {
  dispatch(addDesignationsStart());
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(designationsUrl, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addDesignationsSuccess(response.data));
    console.log(response.data, "add designations response");
    return response.data;
  } catch (error) {
    dispatch(addDesignationsFail(error.message));
  }
};



// ======================
// ✅ Add Grades
// ======================
export const addGradesStart = () => ({
  type: ADD_GRADES.ADD_GRADES_START,
});

export const addGradesSuccess = (data) => ({
  type: ADD_GRADES.ADD_GRADES_SUCCESS,
  payload: data,
});

export const addGradesFail = (payload) => ({
  type: ADD_GRADES.ADD_GRADES_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const addGradesApi = (postData) => async (dispatch) => {
  dispatch(addGradesStart());
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(gradesUrl, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addGradesSuccess(response.data));
    console.log(response.data, "add grades response");
    return response.data;
  } catch (error) {
    dispatch(addGradesFail(error.message));
  }
};



// ======================
// ✅ Add Categories
// ======================
export const addCategoriesStart = () => ({
  type: ADD_CATEGORIES.ADD_CATEGORIES_START,
});

export const addCategoriesSuccess = (data) => ({
  type: ADD_CATEGORIES.ADD_CATEGORIES_SUCCESS,
  payload: data,
});

export const addCategoriesFail = (payload) => ({
  type: ADD_CATEGORIES.ADD_CATEGORIES_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const addCategoriesApi = (postData) => async (dispatch) => {
  dispatch(addCategoriesStart());
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(categoriesUrl, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addCategoriesSuccess(response.data));
    console.log(response.data, "add categories response");
    return response.data;
  } catch (error) {
    dispatch(addCategoriesFail(error.message));
  }
};



// ======================
// ✅ Add Attendance Types
// ======================
export const addAttendanceTypesStart = () => ({
  type: ADD_ATTENDANCE_TYPES.ADD_ATTENDANCE_TYPES_START,
});

export const addAttendanceTypesSuccess = (data) => ({
  type: ADD_ATTENDANCE_TYPES.ADD_ATTENDANCE_TYPES_SUCCESS,
  payload: data,
});

export const addAttendanceTypesFail = (payload) => ({
  type: ADD_ATTENDANCE_TYPES.ADD_ATTENDANCE_TYPES_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const addAttendanceTypesApi = (postData) => async (dispatch) => {
  dispatch(addAttendanceTypesStart());
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(attendanceTypesUrl, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addAttendanceTypesSuccess(response.data));
    console.log(response.data, "add attendance types response");
    return response.data;
  } catch (error) {
    dispatch(addAttendanceTypesFail(error.message));
  }
};
