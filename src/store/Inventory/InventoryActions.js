// src/redux/actions/inventoryActions.js
import axios from "axios";
import { INVENTORY_LIST } from "./InventoryType";
import { inventoryUrl } from "../utils";

export const inventoryStart = () => ({
  type: INVENTORY_LIST.INVENTORY_LIST_START,
});

export const inventorySuccess = (data) => ({
  type: INVENTORY_LIST.INVENTORY_LIST_SUCCESS,
  payload: data,
});

export const inventoryFail = (payload) => ({
  type: INVENTORY_LIST.INVENTORY_LIST_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const fetchInventoryApi = () => async (dispatch) => {
  dispatch(inventoryStart());
  try {
    const response = await axios.get(inventoryUrl);
    dispatch(inventorySuccess(response.data));
    console.log(response.data, "inventory response");
    return response.data;
  } catch (error) {
    dispatch(inventoryFail(error.message));
  }
};
