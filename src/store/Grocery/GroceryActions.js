// src/redux/actions/groceryConsumptionActions.js
import axios from "axios";
import { ADD_GROCERY_CONSUMPTION, DELETE_GROCERY_CONSUMPTION, GROCERY_CONSUMPTION_LIST } from "./GroceryType";
import { addGroceryConsumptionUrl, deleteGroceryConsumptionUrl, groceryConsumptionListUrl } from "../utils";


// ------------------------------------------------------
// ✅ GET Grocery Consumption List
// ------------------------------------------------------
export const groceryConsumptionListStart = () => ({
  type: GROCERY_CONSUMPTION_LIST.GROCERY_CONSUMPTION_LIST_START,
});

export const groceryConsumptionListSuccess = (data) => ({
  type: GROCERY_CONSUMPTION_LIST.GROCERY_CONSUMPTION_LIST_SUCCESS,
  payload: data,
});

export const groceryConsumptionListFail = (payload) => ({
  type: GROCERY_CONSUMPTION_LIST.GROCERY_CONSUMPTION_LIST_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const fetchGroceryConsumptionListApi = (rsHostelId) => async (dispatch) => {
    dispatch(groceryConsumptionListStart());
  
    try {
      const token = localStorage.getItem("authToken");
  
      const response = await axios.get(groceryConsumptionListUrl(rsHostelId), {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      dispatch(groceryConsumptionListSuccess(response.data));
      console.log("📌 Grocery consumption list:", response.data);
      return response.data;
    } catch (error) {
      dispatch(groceryConsumptionListFail(error.message));
      console.error("❌ Grocery Consumption List API error:", error.response?.data || error.message);
    }
  };
  




// ------------------------------------------------------
// ✅ ADD Grocery Consumption
// ------------------------------------------------------
export const addGroceryConsumptionStart = () => ({
  type: ADD_GROCERY_CONSUMPTION.ADD_GROCERY_CONSUMPTION_START,
});

export const addGroceryConsumptionSuccess = (data) => ({
  type: ADD_GROCERY_CONSUMPTION.ADD_GROCERY_CONSUMPTION_SUCCESS,
  payload: data,
});

export const addGroceryConsumptionFail = (payload) => ({
  type: ADD_GROCERY_CONSUMPTION.ADD_GROCERY_CONSUMPTION_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const addGroceryConsumptionApi = (formData) => async (dispatch) => {
  dispatch(addGroceryConsumptionStart());

  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      addGroceryConsumptionUrl,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(addGroceryConsumptionSuccess(response.data));
    console.log("✅ Grocery consumption added:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Add Grocery Consumption error:", error.response?.data || error.message);
    dispatch(addGroceryConsumptionFail(error.message));
  }
};




// ------------------------------------------------------
// ✅ DELETE Grocery Consumption
// ------------------------------------------------------
export const deleteGroceryConsumptionStart = () => ({
  type: DELETE_GROCERY_CONSUMPTION.DELETE_GROCERY_CONSUMPTION_START,
});

export const deleteGroceryConsumptionSuccess = (data) => ({
  type: DELETE_GROCERY_CONSUMPTION.DELETE_GROCERY_CONSUMPTION_SUCCESS,
  payload: data,
});

export const deleteGroceryConsumptionFail = (payload) => ({
  type: DELETE_GROCERY_CONSUMPTION.DELETE_GROCERY_CONSUMPTION_FAIL,
  payload:
    typeof payload === "string"
      ? payload
      : payload.message || "An error occurred",
});

export const deleteGroceryConsumptionApi = (id) => async (dispatch) => {
  dispatch(deleteGroceryConsumptionStart());

  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.delete(
      deleteGroceryConsumptionUrl(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(deleteGroceryConsumptionSuccess(response.data));
    console.log("🗑️ Grocery consumption deleted:", response.data);
    return true;
  } catch (error) {
    console.error("❌ Delete Grocery Consumption error:", error.response?.data || error.message);
    dispatch(deleteGroceryConsumptionFail(error.message));
  }
};
