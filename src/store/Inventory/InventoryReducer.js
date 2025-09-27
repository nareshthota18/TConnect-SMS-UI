// src/redux/reducers/inventoryReducer.js
import { produce } from "immer";
import { ADD_INVENTORY_ITEM, INVENTORY_LIST, ITEM_TYPE_LIST } from "./InventoryType";

const initialState = {
  inventoryData: [],
  inventoryDataLoading: false,
  inventoryDataError: false,

  itemTypeData: [],
  itemTypeDataLoading: false,
  itemTypeDataError: false,

  addInventoryItemData: [],
  addInventoryItemLoading: false,
  addInventoryItemError: false,
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

    // ================= ITEM TYPE LIST =================
    case ITEM_TYPE_LIST.ITEM_TYPE_LIST_START:
      draft.itemTypeDataLoading = true;
      draft.itemTypeDataError = false;
      break;

    case ITEM_TYPE_LIST.ITEM_TYPE_LIST_SUCCESS:
      draft.itemTypeDataLoading = false;
      draft.itemTypeData = action.payload;
      draft.itemTypeDataError = false;
      break;

    case ITEM_TYPE_LIST.ITEM_TYPE_LIST_FAIL:
      draft.itemTypeDataLoading = false;
      draft.itemTypeData = [];
      draft.itemTypeDataError = action.payload;
      break;

     // ================= ADD INVENTORY ITEM =================
     case ADD_INVENTORY_ITEM.ADD_INVENTORY_ITEM_START:
        draft.addInventoryItemLoading = true;
        draft.addInventoryItemError = false;
        break;
  
      case ADD_INVENTORY_ITEM.ADD_INVENTORY_ITEM_SUCCESS:
        draft.addInventoryItemLoading = false;
        draft.addInventoryItemData = action.payload;
        draft.addInventoryItemError = false;
        break;
  
      case ADD_INVENTORY_ITEM.ADD_INVENTORY_ITEM_FAIL:
        draft.addInventoryItemLoading = false;
        draft.addInventoryItemData = null;
        draft.addInventoryItemError = action.payload;
        break;

    default:
      return draft;
  }
}, initialState);
