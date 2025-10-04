// src/redux/actions/rolesActions.js
import axios from "axios";
import { ADD_ROLE, DELETE_ROLE, ROLES_LIST } from "./RoleType";
import { addRolesUrl, deleteRoleUrl, rolesUrl } from "../utils";

export const rolesStart = () => ({
  type: ROLES_LIST.ROLES_LIST_START,
});

export const rolesSuccess = (data) => ({
  type: ROLES_LIST.ROLES_LIST_SUCCESS,
  payload: data,
});

export const rolesFail = (payload) => ({
  type: ROLES_LIST.ROLES_LIST_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const fetchRolesApi = () => async (dispatch) => {
  dispatch(rolesStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(rolesUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(rolesSuccess(response.data));
    console.log(response.data, "roles response");
    return response.data;
  } catch (error) {
    dispatch(rolesFail(error.message));
  }
};



// New Add Role Actions
export const addRoleStart = () => ({
  type: ADD_ROLE.ADD_ROLE_START,
});

export const addRoleSuccess = (data) => ({
  type: ADD_ROLE.ADD_ROLE_SUCCESS,
  payload: data,
});

export const addRoleFail = (payload) => ({
  type: ADD_ROLE.ADD_ROLE_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "Failed to add role",
});

// Add Role API
export const addRoleApi = (roleData) => async (dispatch) => {
  dispatch(addRoleStart());
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(addRolesUrl, roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addRoleSuccess(response.data));
    console.log(response.data, "add role response");
    return response.data;
  } catch (error) {
    dispatch(addRoleFail(error.message));
    throw error;
  }
};


// Delete Role Actions
// ========================
export const deleteRoleStart = () => ({
  type: DELETE_ROLE.DELETE_ROLE_START,
});

export const deleteRoleSuccess = (data) => ({
  type: DELETE_ROLE.DELETE_ROLE_SUCCESS,
  payload: data,
});

export const deleteRoleFail = (payload) => ({
  type: DELETE_ROLE.DELETE_ROLE_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "Failed to delete role",
});

export const deleteRoleApi = (roleId) => async (dispatch) => {
  dispatch(deleteRoleStart());
  try {
    const token = localStorage.getItem("authToken");

    // DELETE request using roleId
    const response = await axios.delete(deleteRoleUrl(roleId), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(deleteRoleSuccess(response.data));
    console.log("Deleted role:", response.data);
    return response.data;
  } catch (error) {
    dispatch(deleteRoleFail(error.message));
    throw error;
  }
};