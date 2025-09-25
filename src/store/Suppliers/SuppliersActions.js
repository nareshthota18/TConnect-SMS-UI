// src/redux/actions/supplierActions.js
import axios from "axios";
import { SUPPLIER_LIST } from "./SuppliersType";
import { supplierUrl } from "../utils";

export const supplierStart = () => ({
  type: SUPPLIER_LIST.SUPPLIER_LIST_START,
});

export const supplierSuccess = (data) => ({
  type: SUPPLIER_LIST.SUPPLIER_LIST_SUCCESS,
  payload: data,
});

export const supplierFail = (payload) => ({
  type: SUPPLIER_LIST.SUPPLIER_LIST_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const fetchSupplierApi = () => async (dispatch) => {
  dispatch(supplierStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(supplierUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(supplierSuccess(response.data));
    console.log(response.data, "supplier response");
    return response.data;
  } catch (error) {
    dispatch(supplierFail(error.message));
  }
};
