// src/redux/reducers/groceryConsumptionReducer.js
import { produce } from "immer";
import { ADD_GROCERY_CONSUMPTION, DELETE_GROCERY_CONSUMPTION, GROCERY_CONSUMPTION_LIST, GROCERY_LIST } from "./GroceryType";

const initialState = {
  groceryConsumptionListData: [],
  groceryConsumptionListLoading: false,
  groceryConsumptionListError: false,

  addGroceryConsumptionData: [],
  addGroceryConsumptionLoading: false,
  addGroceryConsumptionError: false,

  deleteGroceryConsumptionData: [],
  deleteGroceryConsumptionLoading: false,
  deleteGroceryConsumptionError: false,

  groceryListData: [],
groceryListLoading: false,
groceryListError: false,

};

export const groceryConsumptionReducer = produce((draft, action) => {
  switch (action.type) {
    
    // 🔹 GET Grocery Consumption List
    case GROCERY_CONSUMPTION_LIST.GROCERY_CONSUMPTION_LIST_START:
      draft.groceryConsumptionListLoading = true;
      draft.groceryConsumptionListError = false;
      break;

    case GROCERY_CONSUMPTION_LIST.GROCERY_CONSUMPTION_LIST_SUCCESS:
      draft.groceryConsumptionListLoading = false;
      draft.groceryConsumptionListData = action.payload;
      draft.groceryConsumptionListError = false;
      break;

    case GROCERY_CONSUMPTION_LIST.GROCERY_CONSUMPTION_LIST_FAIL:
      draft.groceryConsumptionListLoading = false;
      draft.groceryConsumptionListData = [];
      draft.groceryConsumptionListError = action.payload;
      break;


    // 🔹 ADD Grocery Consumption
    case ADD_GROCERY_CONSUMPTION.ADD_GROCERY_CONSUMPTION_START:
      draft.addGroceryConsumptionLoading = true;
      draft.addGroceryConsumptionError = false;
      break;

    case ADD_GROCERY_CONSUMPTION.ADD_GROCERY_CONSUMPTION_SUCCESS:
      draft.addGroceryConsumptionLoading = false;
      draft.addGroceryConsumptionData = action.payload;
      draft.addGroceryConsumptionError = false;
      break;

    case ADD_GROCERY_CONSUMPTION.ADD_GROCERY_CONSUMPTION_FAIL:
      draft.addGroceryConsumptionLoading = false;
      draft.addGroceryConsumptionData = null;
      draft.addGroceryConsumptionError = action.payload;
      break;


    // 🔹 DELETE Grocery Consumption
    case DELETE_GROCERY_CONSUMPTION.DELETE_GROCERY_CONSUMPTION_START:
      draft.deleteGroceryConsumptionLoading = true;
      draft.deleteGroceryConsumptionError = false;
      break;

    case DELETE_GROCERY_CONSUMPTION.DELETE_GROCERY_CONSUMPTION_SUCCESS:
      draft.deleteGroceryConsumptionLoading = false;
      draft.deleteGroceryConsumptionData = action.payload;
      draft.deleteGroceryConsumptionError = false;
      break;

    case DELETE_GROCERY_CONSUMPTION.DELETE_GROCERY_CONSUMPTION_FAIL:
      draft.deleteGroceryConsumptionLoading = false;
      draft.deleteGroceryConsumptionData = null;
      draft.deleteGroceryConsumptionError = action.payload;
      break;


      // 🔹 GET Grocery List
case GROCERY_LIST.GROCERY_LIST_START:
    draft.groceryListLoading = true;
    draft.groceryListError = false;
    break;
  
  case GROCERY_LIST.GROCERY_LIST_SUCCESS:
    draft.groceryListLoading = false;
    draft.groceryListData = action.payload;
    draft.groceryListError = false;
    break;
  
  case GROCERY_LIST.GROCERY_LIST_FAIL:
    draft.groceryListLoading = false;
    draft.groceryListData = [];
    draft.groceryListError = action.payload;
    break;
  


    default:
      return draft;
  }
}, initialState);
