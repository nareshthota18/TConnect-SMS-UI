// src/redux/reducers/inventoryReducer.js
import { produce } from "immer";
import { ADD_INVENTORY_ITEM, DELETE_INVENTORY_ITEM, GET_ITEMS_LIST, INVENTORY_ITEM, INVENTORY_LIST, ITEM_TYPE_LIST } from "./InventoryType";

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

  deleteInventoryItemData: [],
  deleteInventoryItemLoading: false,
  deleteInventoryItemError: false,

  getItemsListData: [],
  getItemsListLoading: false,
  getItemsListError: false,

  inventoryItemData: [],
  inventoryItemLoading: false,
  inventoryItemError: false,
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

    // ================= DELETE INVENTORY ITEM =================
    case DELETE_INVENTORY_ITEM.DELETE_INVENTORY_ITEM_START:
      draft.deleteInventoryItemLoading = true;
      draft.deleteInventoryItemError = false;
      break;

    case DELETE_INVENTORY_ITEM.DELETE_INVENTORY_ITEM_SUCCESS:
      draft.deleteInventoryItemLoading = false;
      draft.deleteInventoryItemData = action.payload;
      draft.deleteInventoryItemError = false;
      break;

    case DELETE_INVENTORY_ITEM.DELETE_INVENTORY_ITEM_FAIL:
      draft.deleteInventoryItemLoading = false;
      draft.deleteInventoryItemData = null;
      draft.deleteInventoryItemError = action.payload;
      break;


       // ================= ⭐ GET ITEMS LIST =================
    case GET_ITEMS_LIST.GET_ITEMS_LIST_START:
      draft.getItemsListLoading = true;
      draft.getItemsListError = false;
      break;

    case GET_ITEMS_LIST.GET_ITEMS_LIST_SUCCESS:
      draft.getItemsListLoading = false;
      draft.getItemsListData = action.payload;
      draft.getItemsListError = false;
      break;

    case GET_ITEMS_LIST.GET_ITEMS_LIST_FAIL:
      draft.getItemsListLoading = false;
      draft.getItemsListData = [];
      draft.getItemsListError = action.payload;
      break;


      // ================= INVENTORY ITEM =================
case INVENTORY_ITEM.INVENTORY_ITEM_START:
  draft.inventoryItemLoading = true;
  draft.inventoryItemError = false;
  break;

case INVENTORY_ITEM.INVENTORY_ITEM_SUCCESS:
  draft.inventoryItemLoading = false;
  draft.inventoryItemData = action.payload;
  draft.inventoryItemError = false;
  break;

case INVENTORY_ITEM.INVENTORY_ITEM_FAIL:
  draft.inventoryItemLoading = false;
  draft.inventoryItemData = null;
  draft.inventoryItemError = action.payload;
  break;


    default:
      return draft;
  }
}, initialState);
