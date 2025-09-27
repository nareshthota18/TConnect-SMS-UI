// src/redux/actions/inventoryActions.js
import axios from "axios";
import { ADD_INVENTORY_ITEM, INVENTORY_LIST, ITEM_TYPE_LIST } from "./InventoryType";
import { addInventoryItemUrl, inventoryUrl, itemTypeUrl } from "../utils";

export const inventoryStart = () => ({
  type: INVENTORY_LIST.INVENTORY_LIST_START,
});

export const inventorySuccess = (data) => ({
  type: INVENTORY_LIST.INVENTORY_LIST_SUCCESS,
  payload: data,
});

export const inventoryFail = (payload) => ({
  type: INVENTORY_LIST.INVENTORY_LIST_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const fetchInventoryApi = () => async (dispatch) => {
  dispatch(inventoryStart());
  try {
    // ✅ include token like staff API
    const token = localStorage.getItem("authToken");
    const response = await axios.get(inventoryUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(inventorySuccess(response.data));
    console.log(response.data, "✅ inventory response");
    return response.data;
  } catch (error) {
    console.error("❌ Inventory API error:", error.response?.data || error.message);
    dispatch(inventoryFail(error.message));
  }
};



// ================= ITEM TYPE LIST =================
export const itemTypeStart = () => ({
    type: ITEM_TYPE_LIST.ITEM_TYPE_LIST_START,
  });
  
  export const itemTypeSuccess = (data) => ({
    type: ITEM_TYPE_LIST.ITEM_TYPE_LIST_SUCCESS,
    payload: data,
  });
  
  export const itemTypeFail = (payload) => ({
    type: ITEM_TYPE_LIST.ITEM_TYPE_LIST_FAIL,
    payload:
      typeof payload === "string"
        ? payload
        : payload.message || "An error occurred",
  });
  
  export const fetchItemTypeApi = () => async (dispatch) => {
    dispatch(itemTypeStart());
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(itemTypeUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      dispatch(itemTypeSuccess(response.data));
      console.log(response.data, "✅ item type response");
      return response.data;
    } catch (error) {
      console.error("❌ Item Type API error:", error.response?.data || error.message);
      dispatch(itemTypeFail(error.message));
    }
  };


// ================= ADD INVENTORY ITEM =================
export const addInventoryItemStart = () => ({
    type: ADD_INVENTORY_ITEM.ADD_INVENTORY_ITEM_START,
  });
  
  export const addInventoryItemSuccess = (data) => ({
    type: ADD_INVENTORY_ITEM.ADD_INVENTORY_ITEM_SUCCESS,
    payload: data,
  });
  
  export const addInventoryItemFail = (payload) => ({
    type: ADD_INVENTORY_ITEM.ADD_INVENTORY_ITEM_FAIL,
    payload:
      typeof payload === "string"
        ? payload
        : payload.message || "An error occurred",
  });
  
  export const addInventoryItemApi = (itemData) => async (dispatch) => {
    dispatch(addInventoryItemStart());
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(addInventoryItemUrl, itemData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      dispatch(addInventoryItemSuccess(response.data));
      console.log(response.data, "✅ add inventory item response");
      return response.data;
    } catch (error) {
      console.error("❌ Add Inventory Item API error:", error.response?.data || error.message);
      dispatch(addInventoryItemFail(error.message));
    }
  };