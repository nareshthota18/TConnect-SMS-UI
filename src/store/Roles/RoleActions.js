// src/redux/actions/rolesActions.js
import axios from "axios";
import { ROLES_LIST } from "./RoleType";
import { rolesUrl } from "../utils";

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
