// src/redux/actions/inventoryActions.js
import axios from "axios";
import { ADD_INVENTORY_ITEM, DELETE_INVENTORY_ITEM, GET_ITEMS_LIST, INVENTORY_ITEM, INVENTORY_LIST, ITEM_TYPE_LIST } from "./InventoryType";
import { addInventoryItemUrl, deleteInventoryUrl, getItemsUrl, inventoryUrl, itemTypeUrl } from "../utils";

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
    const schoolId = localStorage.getItem("schoolId");
    const response = await axios.get(inventoryUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        RSHostelId: schoolId,
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

// ================= DELETE INVENTORY ITEM =================
export const deleteInventoryItemStart = () => ({
  type: DELETE_INVENTORY_ITEM.DELETE_INVENTORY_ITEM_START,
});

export const deleteInventoryItemSuccess = (data) => ({
  type: DELETE_INVENTORY_ITEM.DELETE_INVENTORY_ITEM_SUCCESS,
  payload: data,
});

export const deleteInventoryItemFail = (payload) => ({
  type: DELETE_INVENTORY_ITEM.DELETE_INVENTORY_ITEM_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const deleteInventoryItemApi = (itemId) => async (dispatch) => {
  dispatch(deleteInventoryItemStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.delete(deleteInventoryUrl(itemId), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(deleteInventoryItemSuccess(response.data));
    console.log(response.data, "✅ delete inventory item response");
    return response.data;
  } catch (error) {
    console.error("❌ Delete Inventory Item API error:", error.response?.data || error.message);
    dispatch(deleteInventoryItemFail(error.message));
  }
};



export const getItemsListStart = () => ({
  type: GET_ITEMS_LIST.GET_ITEMS_LIST_START,
});

export const getItemsListSuccess = (data) => ({
  type: GET_ITEMS_LIST.GET_ITEMS_LIST_SUCCESS,
  payload: data,
});

export const getItemsListFail = (payload) => ({
  type: GET_ITEMS_LIST.GET_ITEMS_LIST_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const fetchItemsListApi = () => async (dispatch) => {
  dispatch(getItemsListStart());
  try {
    const token = localStorage.getItem("authToken");
    const schoolId = localStorage.getItem("schoolId");

    const response = await axios.get(getItemsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        RSHostelId: schoolId,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(getItemsListSuccess(response.data));
    console.log(response.data, "✅ get items list response");
    return response.data;

  } catch (error) {
    console.error("❌ Get Items List API error:", error.response?.data || error.message);
    dispatch(getItemsListFail(error.message));
  }
};


export const inventoryItemStart = () => ({
  type: INVENTORY_ITEM.INVENTORY_ITEM_START,
});

export const inventoryItemSuccess = (data) => ({
  type: INVENTORY_ITEM.INVENTORY_ITEM_SUCCESS,
  payload: data,
});

export const inventoryItemFail = (payload) => ({
  type: INVENTORY_ITEM.INVENTORY_ITEM_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const addInventoryItemDetailsApi = (payloadData) => async (dispatch) => {
  dispatch(inventoryItemStart());
  try {
    const token = localStorage.getItem("authToken");
    const schoolId = localStorage.getItem("schoolId");

    const response = await axios.post(inventoryUrl, payloadData, {
      headers: {
        Authorization: `Bearer ${token}`,
        RSHostelId: schoolId,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(inventoryItemSuccess(response.data));
    console.log(response.data, "✅ INVENTORY_ITEM response");
    return response.data;

  } catch (error) {
    console.error("❌ INVENTORY_ITEM API error:", error.response?.data || error.message);
    dispatch(inventoryItemFail(error.message));
  }
};