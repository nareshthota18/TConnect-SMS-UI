// src/redux/reducers/inventoryReducer.js
import { produce } from "immer";
import { INVENTORY_LIST } from "./InventoryType";

const initialState = {
  inventoryData: [],
  inventoryDataLoading: false,
  inventoryDataError: false,
};

export const inventoryReducer = produce((draft, action) => {
  switch (action.type) {
    case INVENTORY_LIST.INVENTORY_LIST_START:
      draft.inventoryDataLoading = true;
      draft.inventoryDataError = false;
      break;

    case INVENTORY_LIST.INVENTORY_LIST_SUCCESS:
      draft.inventoryDataLoading = false;
      draft.inventoryData = action.payload;
      draft.inventoryDataError = false;
      break;

    case INVENTORY_LIST.INVENTORY_LIST_FAIL:
      draft.inventoryDataLoading = false;
      draft.inventoryData = [];
      draft.inventoryDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
