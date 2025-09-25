// src/redux/reducers/supplierReducer.js
import { produce } from "immer";
import { SUPPLIER_LIST } from "./SuppliersType";

const initialState = {
  supplierData: [],
  supplierDataLoading: false,
  supplierDataError: false,
};

export const supplierReducer = produce((draft, action) => {
  switch (action.type) {
    case SUPPLIER_LIST.SUPPLIER_LIST_START:
      draft.supplierDataLoading = true;
      draft.supplierDataError = false;
      break;

    case SUPPLIER_LIST.SUPPLIER_LIST_SUCCESS:
      draft.supplierDataLoading = false;
      draft.supplierData = action.payload;
      draft.supplierDataError = false;
      break;

    case SUPPLIER_LIST.SUPPLIER_LIST_FAIL:
      draft.supplierDataLoading = false;
      draft.supplierData = [];
      draft.supplierDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
